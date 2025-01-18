import { prisma } from "@/lib/prisma"
import { CreateVersionMetrics, Version } from "@/types/version"
import { Prisma, VersionType } from "@prisma/client"

interface CreateVersionParams {
  promptId: string
  content: string
  description?: string
  model: string
  type: VersionType
  metrics?: CreateVersionMetrics
}

interface UpdateVersionParams {
  id: string
  content?: string
  description?: string | null
  model?: string
  metrics?: CreateVersionMetrics
}

export class VersionService {
  static async createVersion(params: CreateVersionParams) {
    const { promptId, content, description, model, type, metrics } = params

    // Deactivate all other versions if this is being set as active
    if (type === "original") {
      await prisma.version.updateMany({
        where: { promptId },
        data: { isActive: false },
      })
    }

    // Create the new version
    const version = await prisma.version.create({
      data: {
        content,
        description,
        model,
        type,
        metrics: metrics ? (metrics as Prisma.InputJsonValue) : Prisma.JsonNull,
        promptId,
        isActive: type === "original",
      },
    })

    return this.mapVersion(version)
  }

  static async updateVersion(params: UpdateVersionParams) {
    const { id, content, description, model, metrics } = params

    const version = await prisma.version.update({
      where: { id },
      data: {
        content,
        description,
        model,
        metrics: metrics ? (metrics as Prisma.InputJsonValue) : undefined,
      },
    })

    return this.mapVersion(version)
  }

  static async getVersions(promptId: string) {
    const versions = await prisma.version.findMany({
      where: { promptId },
      orderBy: { createdAt: "desc" },
    })

    return versions.map(this.mapVersion)
  }

  static async getActiveVersion(promptId: string) {
    const version = await prisma.version.findFirst({
      where: { promptId, isActive: true },
    })

    return version ? this.mapVersion(version) : null
  }

  static async setActiveVersion(versionId: string) {
    const version = await prisma.version.findUnique({
      where: { id: versionId },
      include: { prompt: true },
    })

    if (!version) {
      throw new Error("Version not found")
    }

    // Deactivate all versions for this prompt
    await prisma.version.updateMany({
      where: { promptId: version.promptId },
      data: { isActive: false },
    })

    // Activate the selected version
    const updatedVersion = await prisma.version.update({
      where: { id: versionId },
      data: { isActive: true },
    })

    return this.mapVersion(updatedVersion)
  }

  static async compareVersions(versionId1: string, versionId2: string) {
    const [version1, version2] = await Promise.all([
      prisma.version.findUnique({ where: { id: versionId1 } }),
      prisma.version.findUnique({ where: { id: versionId2 } }),
    ])

    if (!version1 || !version2) {
      throw new Error("One or both versions not found")
    }

    const v1 = this.mapVersion(version1)
    const v2 = this.mapVersion(version2)

    return {
      version1: v1,
      version2: v2,
      metrics: {
        tokenDiff:
          (v2.metrics?.tokenCount || 0) - (v1.metrics?.tokenCount || 0),
        costDiff:
          (v2.metrics?.estimatedCost || 0) - (v1.metrics?.estimatedCost || 0),
      },
    }
  }

  static async deleteVersion(id: string) {
    const version = await prisma.version.delete({
      where: { id },
    })

    return this.mapVersion(version)
  }

  static async revertToVersion(versionId: string) {
    const version = await prisma.version.findUnique({
      where: { id: versionId },
      include: { prompt: true },
    })

    if (!version) {
      throw new Error("Version not found")
    }

    // Deactivate all versions for this prompt
    await prisma.version.updateMany({
      where: { promptId: version.promptId },
      data: { isActive: false },
    })

    // Activate the selected version
    const updatedVersion = await prisma.version.update({
      where: { id: versionId },
      data: { isActive: true },
    })

    return this.mapVersion(updatedVersion)
  }

  private static mapVersion(
    version: Prisma.VersionGetPayload<Record<string, never>>
  ): Version {
    const metrics = version.metrics as Record<string, number> | null
    return {
      id: version.id,
      content: version.content,
      description: version.description,
      model: version.model,
      type: version.type,
      metrics: metrics
        ? {
            tokenCount: metrics.tokenCount,
            estimatedCost: metrics.estimatedCost,
            responseTime: metrics.responseTime,
            successRate: metrics.successRate,
            ...metrics,
          }
        : null,
      createdAt: new Date(version.createdAt),
      promptId: version.promptId,
      isActive: version.isActive,
    }
  }
}
