import { AIService } from "@/lib/services/ai.service"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { content } = await req.json()
    if (!content) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      )
    }

    const analysis = await AIService.analyzePrompt(content)
    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error analyzing prompt:", error)
    return NextResponse.json(
      { message: "Failed to analyze prompt" },
      { status: 500 }
    )
  }
}
