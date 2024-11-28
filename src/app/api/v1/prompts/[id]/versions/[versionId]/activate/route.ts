import { authOptions } from "@/lib/auth"
import { PromptService } from "@/lib/services/prompt.service"
import { VersionService } from "@/lib/services/version.service"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; versionId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // Check if user has access to this prompt
    const prompt = await PromptService.getPromptById(params.id, session.user.id)
    if (!prompt) {
      return new NextResponse("Not found", { status: 404 })
    }

    const version = await VersionService.setActiveVersion(params.versionId)
    return NextResponse.json(version)
  } catch (error) {
    console.error("Error activating version:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 