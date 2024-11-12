import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { z } from "zod"
import OpenAI from "openai"
import { prisma } from "@/lib/prisma"
import { PromptService } from "@/lib/services/prompt.service"
import { Prisma } from "@prisma/client"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const testPromptSchema = z.object({
  promptId: z.string(),
  content: z.string(),
  model: z.enum(["gpt-4", "gpt-3.5-turbo", "claude-2"] as const),
})

type JsonMetrics = {
  responseTime: number
  tokenUsage: number
  success: boolean
  error: string | null
  cost: number
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { promptId, content, model } = testPromptSchema.parse(body)

    // Verify prompt ownership
    const prompt = await PromptService.getPromptById(promptId, token.id)
    if (!prompt) {
      return NextResponse.json({ message: "Prompt not found" }, { status: 404 })
    }

    const startTime = Date.now()
    let result: string
    let tokenUsage = 0
    let success = true
    let error: string | null = null

    try {
      switch (model) {
        case "gpt-4":
        case "gpt-3.5-turbo": {
          const response = await openai.chat.completions.create({
            model,
            messages: [{ role: "user", content }],
          })
          result =
            response.choices[0]?.message?.content || "No response generated"
          tokenUsage = response.usage?.total_tokens || 0
          break
        }
        case "claude-2": {
          // TODO: Implement Claude integration
          throw new Error("Claude integration not implemented yet")
        }
        default: {
          throw new Error(`Unsupported model: ${model}`)
        }
      }
    } catch (err) {
      success = false
      error = err instanceof Error ? err.message : "Unknown error occurred"
      result = "Error: " + error
    }

    const endTime = Date.now()
    const responseTime = endTime - startTime

    // Calculate cost based on token usage and model
    const costPerToken = model === "gpt-4" ? 0.00003 : 0.000002
    const cost = tokenUsage * costPerToken

    const testMetrics: JsonMetrics = {
      responseTime,
      tokenUsage,
      success,
      error,
      cost,
    }

    // Create test record
    await prisma.promptTest.create({
      data: {
        promptId,
        input: { content } as Prisma.JsonObject,
        output: result,
        metrics: testMetrics as Prisma.JsonObject,
      },
    })

    // Update prompt metrics
    const tests = await prisma.promptTest.findMany({
      where: { promptId },
      select: { metrics: true },
    })

    const totalTests = tests.length
    const avgResponseTime =
      tests.reduce(
        (sum: number, test) =>
          sum + (test.metrics as unknown as JsonMetrics).responseTime,
        0
      ) / totalTests
    const avgTokenUsage =
      tests.reduce(
        (sum: number, test) =>
          sum + (test.metrics as unknown as JsonMetrics).tokenUsage,
        0
      ) / totalTests
    const successCount = tests.filter(
      (test) => (test.metrics as unknown as JsonMetrics).success
    ).length
    const successRate = (successCount / totalTests) * 100
    const totalCost = tests.reduce(
      (sum: number, test) =>
        sum + ((test.metrics as unknown as JsonMetrics).cost || 0),
      0
    )

    const promptMetrics = {
      responseTime: avgResponseTime,
      tokenUsage: avgTokenUsage,
      success: successRate >= 50,
      error: null,
      cost: totalCost,
    } satisfies JsonMetrics

    await prisma.$executeRaw`
      UPDATE "Prompt"
      SET metrics = ${promptMetrics as unknown as Prisma.JsonObject}
      WHERE id = ${promptId}
    `

    return NextResponse.json({
      result,
      metrics: testMetrics,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Error testing prompt:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
