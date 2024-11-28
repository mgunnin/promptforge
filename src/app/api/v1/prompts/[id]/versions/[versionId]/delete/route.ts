import { VersionService } from "@/lib/services/version.service"
import { NextResponse } from "next/server"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; versionId: string } }
) {
  try {
    await VersionService.deleteVersion(params.versionId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting version:", error)
    return NextResponse.json(
      { error: "Failed to delete version" },
      { status: 500 }
    )
  }
}
