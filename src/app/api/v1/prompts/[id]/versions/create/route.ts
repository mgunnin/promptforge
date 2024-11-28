import { VersionService } from "@/lib/services/version.service"
import { NextResponse } from "next/server"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { content, model } = body

    const version = await VersionService.createVersion({
      promptId: params.id,
      content,
      model,
      type: "original",
    })

    return NextResponse.json(version)
  } catch (error) {
    console.error("Error creating version:", error)
    return NextResponse.json(
      { error: "Failed to create version" },
      { status: 500 }
    )
  }
}
