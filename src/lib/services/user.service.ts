import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import bcrypt from "bcryptjs"

export class UserService {
  static async createUser(data: {
    name: string
    email: string
    password: string
  }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new Error("Email already registered")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    })

    // Create default API key
    await prisma.apiKey.create({
      data: {
        name: "Default Key",
        key: `pk_${user.id}_${Math.random().toString(36).substring(2)}`,
        userId: user.id,
      },
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }

  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        apiKeys: {
          select: {
            id: true,
            name: true,
            key: true,
            createdAt: true,
          },
        },
        teams: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    })

    if (!user) {
      throw new Error("User not found")
    }

    return user
  }

  static async updateUser(
    id: string,
    data: Partial<{
      name: string
      email: string
      password: string
    }>
  ) {
    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: { id },
        },
      })

      if (existingUser) {
        throw new Error("Email already in use")
      }
    }

    const updateData: Prisma.UserUpdateInput = { ...data }
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10)
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return user
  }

  static async deleteUser(id: string) {
    await prisma.user.delete({
      where: { id },
    })
  }

  static async createApiKey(userId: string, name: string) {
    const apiKey = await prisma.apiKey.create({
      data: {
        name,
        key: `pk_${userId}_${Math.random().toString(36).substring(2)}`,
        userId,
      },
    })

    return apiKey
  }

  static async deleteApiKey(id: string, userId: string) {
    const apiKey = await prisma.apiKey.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!apiKey) {
      throw new Error("API key not found")
    }

    await prisma.apiKey.delete({
      where: { id },
    })
  }

  static async getApiKeys(userId: string) {
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        key: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return apiKeys
  }
}
