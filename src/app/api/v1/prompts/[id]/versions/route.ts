import { authOptions } from "@/lib/auth"
import { PromptService } from "@/lib/services/prompt.service"
import { VersionService } from "@/lib/services/version.service"
import { VersionType } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const createVersionSchema = z.object({
  content: z.string(),
  description: z.string().optional().nullable(),
  model: z.string(),
  metrics: z.record(z.number()).optional(),
})

const updateVersionSchema = z.object({
  content: z.string().optional(),
  description: z.string().optional().nullable(),
  model: z.string().optional(),
  metrics: z.record(z.number()).optional(),
})

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
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

    const versions = await VersionService.getVersions(params.id)
    return NextResponse.json(versions)
  } catch (error) {
    console.error("Error fetching versions:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const json = await req.json()
    const body = createVersionSchema.parse(json)

    // Check if user has access to this prompt
    const prompt = await PromptService.getPromptById(params.id, session.user.id)
    if (!prompt) {
      return new NextResponse("Not found", { status: 404 })
    }

    const version = await VersionService.createVersion({
      ...body,
      promptId: params.id,
      type: VersionType.original,
    })

    return NextResponse.json(version)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    console.error("Error creating version:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; versionId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const json = await req.json()
    const body = updateVersionSchema.parse(json)

    // Check if user has access to this prompt
    const prompt = await PromptService.getPromptById(params.id, session.user.id)
    if (!prompt) {
      return new NextResponse("Not found", { status: 404 })
    }

    const version = await VersionService.updateVersion({
      id: params.versionId,
      ...body,
    })

    return NextResponse.json(version)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    console.error("Error updating version:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(
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

    await VersionService.deleteVersion(params.versionId)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting version:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
