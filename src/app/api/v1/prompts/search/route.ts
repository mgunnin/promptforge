import { SearchService } from "@/lib/services/search.service"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const searchParamsSchema = z.object({
  query: z.string(),
  type: z.enum(["semantic", "text"]).default("semantic"),
  filters: z
    .object({
      tags: z.array(z.string()).optional(),
      category: z.string().optional(),
      model: z.string().optional(),
      dateRange: z
        .object({
          start: z.string().transform((str) => new Date(str)),
          end: z.string().transform((str) => new Date(str)),
        })
        .optional(),
    })
    .optional(),
  sort: z
    .object({
      field: z
        .enum(["relevance", "createdAt", "updatedAt"])
        .default("relevance"),
      direction: z.enum(["asc", "desc"]).default("desc"),
    })
    .optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
})

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req })
    if (!token?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const validatedParams = searchParamsSchema.parse({
      query: searchParams.get("query") || "",
      type: searchParams.get("type") || "semantic",
      filters: searchParams.get("filters")
        ? JSON.parse(searchParams.get("filters") || "{}")
        : undefined,
      sort: searchParams.get("sort")
        ? JSON.parse(searchParams.get("sort") || "{}")
        : undefined,
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
    })

    const searchFunction =
      validatedParams.type === "semantic"
        ? SearchService.semanticSearch
        : SearchService.textSearch

    const results = await searchFunction({
      userId: token.id,
      ...validatedParams,
    })

    return NextResponse.json(results)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid search parameters", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Search error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
