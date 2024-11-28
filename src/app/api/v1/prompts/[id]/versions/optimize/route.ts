import { VersionService } from "@/lib/services/version.service"
import { NextResponse } from "next/server"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params?.id) {
    return NextResponse.json({ error: "Missing prompt ID" }, { status: 400 })
  }

  try {
    const body = await request.json()
    const { content, model, metrics } = body

    const version = await VersionService.createVersion({
      promptId: params.id,
      content,
      model,
      type: "optimized",
      metrics,
    })

    return NextResponse.json(version)
  } catch (error) {
    console.error("Error creating optimized version:", error)
    return NextResponse.json(
      { error: "Failed to create optimized version" },
      { status: 500 }
    )
  }
}
