import { ImportService } from "@/lib/services/import.service"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    const prompts = await ImportService.parseFile(file)
    const results = await ImportService.processPrompts(prompts, token.id)

    return NextResponse.json({
      message: `Successfully imported ${results.length} prompts`,
      prompts: results,
    })
  } catch (error) {
    console.error("Error importing prompts:", error)
    return NextResponse.json(
      { message: "Failed to import prompts" },
      { status: 500 }
    )
  }
}
