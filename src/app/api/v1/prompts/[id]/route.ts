import { authOptions } from "@/lib/auth"
import { PromptService } from "@/lib/services/prompt.service"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const prompt = await PromptService.getPromptById(params.id, session.user.id)
    if (!prompt) {
      return new NextResponse("Not Found", { status: 404 })
    }

    return NextResponse.json(prompt)
  } catch (error) {
    console.error("Error fetching prompt:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { name, content, description, category, tags } = body

    // Validate required fields
    if (!name?.trim() || !content?.trim()) {
      return new NextResponse("Name and content are required", { status: 400 })
    }

    const updatedPrompt = await PromptService.updatePrompt(
      params.id,
      session.user.id,
      {
        name: name.trim(),
        content: content.trim(),
        description: description?.trim() || null,
        category,
        tags: tags || [],
      }
    )

    if (!updatedPrompt) {
      return new NextResponse("Not Found", { status: 404 })
    }

    return NextResponse.json(updatedPrompt)
  } catch (error) {
    console.error("Error updating prompt:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
