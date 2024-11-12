import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { z } from "zod"
import { AuthService } from "@/lib/services/auth.service"
import { UserService } from "@/lib/services/user.service"

const createKeySchema = z.object({
  name: z.string().min(1, "Name is required"),
})

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const keys = await AuthService.listApiKeys(token.id)
    return NextResponse.json({ keys })
  } catch (error) {
    console.error("Error fetching API keys:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name } = createKeySchema.parse(body)

    const apiKey = await UserService.createApiKey(token.id, name)
    return NextResponse.json({ apiKey }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating API key:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const keyId = searchParams.get("id")

    if (!keyId) {
      return NextResponse.json(
        { message: "API key ID is required" },
        { status: 400 }
      )
    }

    await AuthService.deleteApiKey(token.id, keyId)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting API key:", error)
    if (error instanceof Error && error.message === "API key not found") {
      return NextResponse.json({ message: error.message }, { status: 404 })
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const keyId = searchParams.get("id")

    if (!keyId) {
      return NextResponse.json(
        { message: "API key ID is required" },
        { status: 400 }
      )
    }

    const newKey = await AuthService.rotateApiKey(token.id, keyId)
    return NextResponse.json({ apiKey: newKey })
  } catch (error) {
    console.error("Error rotating API key:", error)
    if (error instanceof Error && error.message === "API key not found") {
      return NextResponse.json({ message: error.message }, { status: 404 })
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
