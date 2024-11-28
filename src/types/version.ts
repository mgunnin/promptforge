import { VersionType } from "@prisma/client"

export interface VersionMetrics {
  tokenCount?: number
  estimatedCost?: number
  responseTime?: number
  successRate?: number
  [key: string]: number | undefined
}

export interface CreateVersionMetrics extends VersionMetrics {}

export interface Version {
  id: string
  content: string
  description: string | null
  model: string
  type: VersionType
  metrics: VersionMetrics | null
  createdAt: Date
  promptId: string
  isActive: boolean
}

export interface VersionComparison {
  version1: Version
  version2: Version
  metrics: {
    tokenDiff: number
    costDiff: number
  }
}
