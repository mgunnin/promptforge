import { prisma } from "@/lib/prisma"
import { Prisma, PromptCategory } from "@prisma/client"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface SearchResult {
  id: string
  name: string
  content: string
  description: string | null
  model: string
  tags: string[]
  category: string | null
  score: number
  metrics: Prisma.JsonValue
  createdAt: Date
  updatedAt: Date
}

interface SearchOptions {
  userId: string
  query: string
  filters?: {
    tags?: string[]
    category?: string
    model?: string
    dateRange?: {
      start: Date
      end: Date
    }
  }
  sort?: {
    field: "relevance" | "createdAt" | "updatedAt"
    direction: "asc" | "desc"
  }
  page?: number
  limit?: number
}

export class SearchService {
  static async semanticSearch({
    userId,
    query,
    filters,
    sort = { field: "relevance", direction: "desc" },
    page = 1,
    limit = 10,
  }: SearchOptions): Promise<{
    results: SearchResult[]
    total: number
    page: number
    totalPages: number
  }> {
    try {
      // Generate embedding for the search query
      const embedding = await this.generateEmbedding(query)

      // Build the base query
      const whereClause: Prisma.PromptWhereInput = { userId }

      // Apply filters
      if (filters) {
        if (filters.tags?.length) {
          whereClause.tags = { hasEvery: filters.tags }
        }
        if (filters.category) {
          whereClause.category = filters.category as PromptCategory
        }
        if (filters.model) {
          whereClause.model = filters.model
        }
        if (filters.dateRange) {
          whereClause.createdAt = {
            gte: filters.dateRange.start,
            lte: filters.dateRange.end,
          }
        }
      }

      // Get total count for pagination
      const total = await prisma.prompt.count({ where: whereClause })
      const totalPages = Math.ceil(total / limit)

      // Get prompts with vector similarity search
      const prompts = await prisma.$queryRaw<SearchResult[]>`
        WITH prompt_matches AS (
          SELECT 
            p.*,
            1 - (p.embedding <=> ${embedding}::vector) as similarity_score
          FROM "Prompt" p
          WHERE p."userId" = ${userId}
          ${
            filters?.category
              ? Prisma.sql`AND p.category = ${filters.category}`
              : Prisma.sql``
          }
          ${
            filters?.model
              ? Prisma.sql`AND p.model = ${filters.model}`
              : Prisma.sql``
          }
          ${
            filters?.tags?.length
              ? Prisma.sql`AND p.tags @> ${filters.tags}::text[]`
              : Prisma.sql``
          }
          ${
            filters?.dateRange
              ? Prisma.sql`AND p."createdAt" BETWEEN ${filters.dateRange.start} AND ${filters.dateRange.end}`
              : Prisma.sql``
          }
        )
        SELECT 
          id,
          name,
          content,
          description,
          model,
          tags,
          category,
          similarity_score as score,
          metrics,
          "createdAt",
          "updatedAt"
        FROM prompt_matches
        ORDER BY 
          ${
            sort.field === "relevance"
              ? Prisma.sql`similarity_score ${
                  sort.direction === "desc" ? Prisma.sql`DESC` : Prisma.sql`ASC`
                }`
              : sort.field === "createdAt"
              ? Prisma.sql`"createdAt" ${
                  sort.direction === "desc" ? Prisma.sql`DESC` : Prisma.sql`ASC`
                }`
              : Prisma.sql`"updatedAt" ${
                  sort.direction === "desc" ? Prisma.sql`DESC` : Prisma.sql`ASC`
                }`
          }
        LIMIT ${limit}
        OFFSET ${(page - 1) * limit}
      `

      return {
        results: prompts,
        total,
        page,
        totalPages,
      }
    } catch (error) {
      console.error("Error in semantic search:", error)
      throw new Error("Failed to perform semantic search")
    }
  }

  static async textSearch({
    userId,
    query,
    filters,
    sort = { field: "relevance", direction: "desc" },
    page = 1,
    limit = 10,
  }: SearchOptions): Promise<{
    results: SearchResult[]
    total: number
    page: number
    totalPages: number
  }> {
    try {
      // Build the base query
      const whereClause: Prisma.PromptWhereInput = {
        userId,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      }

      // Apply filters
      if (filters) {
        if (filters.tags?.length) {
          whereClause.tags = { hasEvery: filters.tags }
        }
        if (filters.category) {
          whereClause.category = filters.category as PromptCategory
        }
        if (filters.model) {
          whereClause.model = filters.model
        }
        if (filters.dateRange) {
          whereClause.createdAt = {
            gte: filters.dateRange.start,
            lte: filters.dateRange.end,
          }
        }
      }

      // Get total count for pagination
      const total = await prisma.prompt.count({ where: whereClause })
      const totalPages = Math.ceil(total / limit)

      // Get prompts with text search
      const prompts = await prisma.prompt.findMany({
        where: whereClause,
        orderBy: {
          [sort.field === "relevance" ? "updatedAt" : sort.field]:
            sort.direction,
        },
        take: limit,
        skip: (page - 1) * limit,
      })

      return {
        results: prompts.map((prompt) => ({
          ...prompt,
          score: 1, // Default score for text search
        })),
        total,
        page,
        totalPages,
      }
    } catch (error) {
      console.error("Error in text search:", error)
      throw new Error("Failed to perform text search")
    }
  }

  private static async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
      })

      return response.data[0].embedding
    } catch (error) {
      console.error("Error generating embedding:", error)
      throw new Error("Failed to generate embedding")
    }
  }
}
