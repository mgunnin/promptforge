import { AIService } from "@/lib/services/ai.service"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

/**
 * Retrieves analytics for a specific prompt.
 *
 * @remarks
 * This endpoint requires authentication and a valid prompt ID.
 *
 * @param req - The incoming Next.js request object
 * @returns A JSON response containing prompt analytics or an error status
 *
 * @throws {NextResponse} 401 Unauthorized if no valid token is present
 * @throws {NextResponse} 400 Bad Request if no prompt ID is provided
 * @throws {NextResponse} 500 Internal Server Error if analytics fetching fails
 *
 * @beta
 */
export async function GET(req: NextRequest) {
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

    const analytics = await AIService.fetchAnalytics(promptId)
    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json(
      { message: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}
