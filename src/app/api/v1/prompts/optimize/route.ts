import { AIService } from "@/lib/services/ai.service"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { content, model } = await req.json()
    if (!content) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      )
    }

    const optimizedContent = await AIService.suggestImprovements(content, model)

    // Calculate metrics
    const metrics = {
      tokenCount: Math.ceil(optimizedContent.length / 4), // Rough estimate
      estimatedCost: calculateCost(optimizedContent.length, model),
    }

    return NextResponse.json({ optimizedContent, metrics })
  } catch (error) {
    console.error("Error optimizing prompt:", error)
    return NextResponse.json(
      { message: "Failed to optimize prompt" },
      { status: 500 }
    )
  }
}

function calculateCost(length: number, model: string): number {
  // Cost per 1K tokens (in USD)
  const costPer1K: Record<string, number> = {
    "gpt-4o": 0.01,
    "gpt-4-turbo": 0.01,
    "gpt-3.5-turbo": 0.0005,
    "claude-3-opus": 0.015,
    "claude-3-sonnet-20241022": 0.003,
    "gemini-pro": 0.0005,
    "mixtral-8x7b": 0.0002,
    "llama-2-70b": 0.0001,
  }

  const tokens = Math.ceil(length / 4)
  return (tokens / 1000) * (costPer1K[model] || 0.01)
}
