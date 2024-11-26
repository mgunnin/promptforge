import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { prompt, model, temperature, maxTokens, input } = await req.json()

    // Parse input variables if provided
    let processedPrompt = prompt
    if (input) {
      try {
        const variables = JSON.parse(input)
        processedPrompt = Object.entries(variables).reduce(
          (acc, [key, value]) => acc.replace(`{${key}}`, String(value)),
          prompt
        )
      } catch {
        return NextResponse.json(
          { message: "Invalid input variables format" },
          { status: 400 }
        )
      }
    }

    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content: processedPrompt,
        },
      ],
      temperature: temperature,
      max_tokens: maxTokens,
    })

    const output = response.choices[0]?.message?.content
    if (!output) {
      throw new Error("No output generated")
    }

    return NextResponse.json({ output })
  } catch (error) {
    console.error("Error testing prompt:", error)
    return NextResponse.json(
      { message: "Failed to test prompt" },
      { status: 500 }
    )
  }
}
