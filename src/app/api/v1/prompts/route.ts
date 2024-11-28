import { PromptService } from "@/lib/services/prompt.service"
import { LLMModel } from "@/types/prompt"
import { PromptCategory } from "@prisma/client"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const createPromptSchema = z.object({
  name: z.string().min(1, "Name is required"),
  content: z.string().min(1, "Content is required"),
  description: z.string().optional(),
  tags: z.array(z.string()),
  model: z.custom<LLMModel>((val) => {
    return (
      typeof val === "string" &&
      [
        "gpt-4o",
        "gpt-4-turbo",
        "gpt-3.5-turbo",
        "claude-3-opus",
        "claude-3-sonnet-20241022",
        "gemini-pro",
        "mixtral-8x7b",
        "llama-2-70b",
      ].includes(val as string)
    )
  }, "Invalid model"),
  category: z.nativeEnum(PromptCategory).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      )
    }

    if (!token.id) {
      return NextResponse.json(
        { message: "Invalid authentication token" },
        { status: 401 }
      )
    }

    const body = await req.json()
    console.log("Request body:", body)
    console.log("User ID from token:", token.id)

    const validatedData = createPromptSchema.parse(body)

    const prompt = await PromptService.createPrompt({
      ...validatedData,
      userId: token.id,
    })

    return NextResponse.json(prompt, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      )
    }

    const errorDetails = {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    }

    console.error("Error creating prompt:", errorDetails)

    if (
      error instanceof Error &&
      error.message.includes("Foreign key constraint")
    ) {
      return NextResponse.json(
        {
          message: "User not found in database",
          error: "Invalid user ID",
          userId: error.message.includes("Prompt_userId_fkey")
            ? "User ID constraint violation"
            : "Other constraint violation",
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Internal server error", error: errorDetails },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")

    let prompts
    if (category) {
      prompts = await PromptService.getPromptsByCategory(token.id, category)
    } else if (tag) {
      prompts = await PromptService.getPromptsByTag(token.id, tag)
    } else {
      prompts = await PromptService.listPrompts(token.id)
    }

    return NextResponse.json(prompts)
  } catch (error) {
    console.error("Error fetching prompts:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

const updatePromptSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  model: z
    .custom<LLMModel>((val) => {
      return (
        typeof val === "string" &&
        [
          "gpt-4o",
          "gpt-4-turbo",
          "gpt-3.5-turbo",
          "claude-3-opus",
          "claude-3-sonnet-20241022",
          "gemini-pro",
          "mixtral-8x7b",
          "llama-2-70b",
        ].includes(val as string)
      )
    }, "Invalid model")
    .optional(),
  category: z.nativeEnum(PromptCategory).optional(),
})

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const promptId = searchParams.get("id")

    if (!promptId) {
      return NextResponse.json(
        { message: "Prompt ID is required" },
        { status: 400 }
      )
    }

    const body = await req.json()
    const validatedData = updatePromptSchema.parse(body)

    const prompt = await PromptService.updatePrompt(
      promptId,
      token.id,
      validatedData
    )

    return NextResponse.json(prompt)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Error updating prompt:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const promptId = searchParams.get("id")

    if (!promptId) {
      return NextResponse.json(
        { message: "Prompt ID is required" },
        { status: 400 }
      )
    }

    await PromptService.deletePrompt(promptId, token.id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting prompt:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
