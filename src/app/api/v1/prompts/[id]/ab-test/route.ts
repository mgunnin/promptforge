import { AIService } from "@/lib/services/ai.service"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handles A/B testing for prompts via an HTTP POST request.
 *
 * @remarks
 * This endpoint requires authentication and validates the presence of required parameters.
 *
 * @param req - The incoming Next.js request object
 * @returns A JSON response containing A/B test results or an error status
 *
 * @throws {NextResponse} 401 Unauthorized if no valid user token is present
 * @throws {NextResponse} 400 Bad Request if required parameters are missing
 * @throws {NextResponse} 500 Internal Server Error if A/B test execution fails
 *
 * @beta
 */
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const promptId = searchParams.get("id")
    const version1Id = searchParams.get("version1Id")
    const version2Id = searchParams.get("version2Id")

    if (!promptId || !version1Id || !version2Id) {
      return NextResponse.json(
        { message: "Prompt ID, Version1 ID, and Version2 ID are required" },
        { status: 400 }
      )
    }

    const abTestResults = await AIService.runABTest(promptId, version1Id, version2Id)
    return NextResponse.json(abTestResults)
  } catch (error) {
    console.error("Error running A/B test:", error)
    return NextResponse.json(
      { message: "Failed to run A/B test" },
      { status: 500 }
    )
  }
}
