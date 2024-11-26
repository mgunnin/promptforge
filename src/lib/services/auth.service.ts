import { prisma } from "@/lib/prisma"
import { UserService } from "@/lib/services/user.service"
import bcrypt from "bcryptjs"

export interface ApiKeyWithDates {
  id: string
  name: string
  key: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export class AuthService {
  static async validateCredentials(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    })

    if (!user || !user.password) {
      return null
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return null
    }

    const { ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static async register(data: {
    name: string
    email: string
    password: string
  }) {
    try {
      const user = await UserService.createUser(data)
      return user
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Registration failed")
    }
  }

  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        password: true,
      },
    })

    if (!user || !user.password) {
      throw new Error("User not found")
    }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      throw new Error("Current password is incorrect")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    })
  }

  static async resetPassword(userId: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    })
  }

  static async validateApiKey(key: string) {
    const apiKey = await prisma.apiKey.findUnique({
      where: { key },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!apiKey) {
      return null
    }

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: apiKey.id },
      data: {
        updatedAt: new Date(),
      },
    })

    return {
      id: apiKey.id,
      name: apiKey.name,
      user: apiKey.user,
    }
  }

  static async listApiKeys(userId: string): Promise<ApiKeyWithDates[]> {
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        key: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return apiKeys
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

  static async rotateApiKey(id: string, userId: string) {
    const apiKey = await prisma.apiKey.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!apiKey) {
      throw new Error("API key not found")
    }

    const updatedApiKey = await prisma.apiKey.update({
      where: { id },
      data: {
        key: `pk_${userId}_${Math.random().toString(36).substring(2)}`,
        updatedAt: new Date(),
      },
    })

    return updatedApiKey
  }
}
