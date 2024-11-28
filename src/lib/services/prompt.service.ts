import { prisma } from "@/lib/prisma"
import { LLMModel } from "@/types/prompt"
import { Prisma, PromptCategory } from "@prisma/client"

export interface ListPromptsOptions {
  category?: string
  tag?: string
  search?: string
  page?: number
  limit?: number
  excludeId?: string
}

export class PromptService {
  static async createPrompt(data: {
    name: string
    content: string
    description?: string | null
    model: LLMModel
    tags: string[]
    category?: PromptCategory | null
    userId: string
    teamId?: string | null
  }) {
    // Verify user exists first
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    })

    if (!user) {
      throw new Error(`User not found with ID: ${data.userId}`)
    }

    const { category, ...restData } = data

    const prompt = await prisma.prompt.create({
      data: {
        ...restData,
        // Convert null to undefined for category
        ...(category && { category }),
        versions: {
          create: {
            content: data.content,
            description: data.description,
            model: data.model,
          },
        },
      },
      include: {
        versions: true,
      },
    })

    return prompt
  }

  static async getPromptById(id: string, userId: string) {
    const prompt = await prisma.prompt.findFirst({
      where: {
        id,
        OR: [
          { userId },
          {
            team: {
              members: {
                some: {
                  id: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        versions: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })

    return prompt
  }

  static async getPrompts(userId: string) {
    const prompts = await prisma.prompt.findMany({
      where: {
        OR: [
          { userId },
          {
            team: {
              members: {
                some: {
                  id: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        versions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return prompts
  }

  static async listPrompts(userId: string, options: ListPromptsOptions = {}) {
    const { category, tag, search, page = 1, limit = 10 } = options
    const skip = (page - 1) * limit

    const baseWhere: Prisma.PromptWhereInput = {
      OR: [
        { userId },
        {
          team: {
            members: {
              some: {
                id: userId,
              },
            },
          },
        },
      ],
    }

    if (category) {
      baseWhere.category = category as PromptCategory
    }

    if (tag) {
      baseWhere.tags = { has: tag }
    }

    if (search) {
      baseWhere.OR = [
        ...(baseWhere.OR || []),
        {
          name: { contains: search, mode: "insensitive" as Prisma.QueryMode },
        },
        {
          description: {
            contains: search,
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
      ]
    }

    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where: baseWhere,
        include: {
          versions: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.prompt.count({ where: baseWhere }),
    ])

    return {
      prompts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  static async getPromptsByCategory(userId: string, category: string) {
    return this.listPrompts(userId, { category })
  }

  static async getPromptsByTag(userId: string, tag: string) {
    return this.listPrompts(userId, { tag })
  }

  static async updatePrompt(
    id: string,
    userId: string,
    data: {
      name?: string
      content?: string
      description?: string | null
      model?: LLMModel
      tags?: string[]
      category?: PromptCategory | null
      teamId?: string | null
    }
  ) {
    const { category, teamId, ...restData } = data

    const existingPrompt = await prisma.prompt.findFirst({
      where: {
        id,
        OR: [
          { userId },
          {
            team: {
              members: {
                some: {
                  id: userId,
                },
              },
            },
          },
        ],
      },
    })

    if (!existingPrompt) {
      throw new Error("Prompt not found")
    }

    const updatedPrompt = await prisma.prompt.update({
      where: { id },
      data: {
        ...restData,
        ...(category && { category }),
        ...(teamId && { teamId }),
        ...(data.content && {
          versions: {
            create: {
              content: data.content,
              description: data.description,
              model: data.model || existingPrompt.model,
            },
          },
        }),
      },
      include: {
        versions: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })

    return updatedPrompt
  }

  static async deletePrompt(id: string, userId: string) {
    const prompt = await prisma.prompt.findFirst({
      where: {
        id,
        OR: [
          { userId },
          {
            team: {
              members: {
                some: {
                  id: userId,
                },
              },
            },
          },
        ],
      },
    })

    if (!prompt) {
      throw new Error("Prompt not found")
    }

    await prisma.prompt.delete({
      where: { id },
    })
  }
}
