import { VersionService } from "@/lib/services/version.service";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the reversion of a prompt to a specific version.
 *
 * @remarks
 * This endpoint allows authenticated users to set a specific version as the active version for a prompt.
 *
 * @param req - The incoming Next.js request object
 * @returns A JSON response with the updated prompt or an error status
 *
 * @throws {NextResponse} 401 Unauthorized if no valid token is present
 * @throws {NextResponse} 400 Bad Request if no version ID is provided
 * @throws {NextResponse} 500 Internal Server Error if version reversion fails
 *
 * @beta
 */
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { versionId } = await req.json();
    if (!versionId) {
      return NextResponse.json(
        { message: "Version ID is required" },
        { status: 400 }
      );
    }

    const updatedPrompt = await VersionService.setActiveVersion(versionId);
    return NextResponse.json(updatedPrompt);
  } catch (error) {
    console.error("Error reverting to version:", error);
    return NextResponse.json(
      { message: "Failed to revert to version" },
      { status: 500 }
    );
  }
}
