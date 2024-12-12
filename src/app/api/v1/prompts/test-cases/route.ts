import { authOptions } from "@/lib/auth"
import { AIService } from "@/lib/services/ai.service"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { promptId, content } = await req.json()
    if (!content) {
      return new NextResponse("Content is required", { status: 400 })
    }

    const testCases = await AIService.generateTestCases(content)
    return NextResponse.json({ testCases })
  } catch (error) {
    console.error("[PROMPT_TEST_CASES]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
