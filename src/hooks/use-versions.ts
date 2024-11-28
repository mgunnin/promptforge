import { useState, useCallback } from "react"
import { Version, VersionComparison } from "@/types/version"
import { useToast } from "@/components/ui/use-toast"

interface UseVersionsOptions {
  promptId: string
}

export function useVersions({ promptId }: UseVersionsOptions) {
  const [versions, setVersions] = useState<Version[]>([])
  const [activeVersionId, setActiveVersionId] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [isComparing, setIsComparing] = useState(false)
  const [compareVersions, setCompareVersions] = useState<VersionComparison>()
  const { toast } = useToast()

  const fetchVersions = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/v1/prompts/${promptId}/versions`)
      if (!response.ok) throw new Error("Failed to fetch versions")
      const data = await response.json()
      setVersions(data)
      const activeVersion = data.find((v: Version) => v.isActive)
      if (activeVersion) {
        setActiveVersionId(activeVersion.id)
      }
    } catch (error) {
      console.error("Error fetching versions:", error)
      toast({
        title: "Error",
        description: "Failed to fetch versions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [promptId, toast])

  const createVersion = useCallback(async (data: {
    content: string
    description?: string | null
    model: string
    metrics?: Record<string, number>
  }) => {
    try {
      const response = await fetch(`/api/v1/prompts/${promptId}/versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create version")
      const version = await response.json()
      setVersions((prev) => [...prev, version])
      toast({
        title: "Success",
        description: "Version created successfully.",
      })
      return version
    } catch (error) {
      console.error("Error creating version:", error)
      toast({
        title: "Error",
        description: "Failed to create version. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }, [promptId, toast])

  const updateVersion = useCallback(async (versionId: string, data: {
    content?: string
    description?: string | null
    model?: string
    metrics?: Record<string, number>
  }) => {
    try {
      const response = await fetch(`/api/v1/prompts/${promptId}/versions/${versionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update version")
      const updatedVersion = await response.json()
      setVersions((prev) =>
        prev.map((v) => (v.id === versionId ? updatedVersion : v))
      )
      toast({
        title: "Success",
        description: "Version updated successfully.",
      })
      return updatedVersion
    } catch (error) {
      console.error("Error updating version:", error)
      toast({
        title: "Error",
        description: "Failed to update version. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }, [promptId, toast])

  const deleteVersion = useCallback(async (versionId: string) => {
    try {
      const response = await fetch(
        `/api/v1/prompts/${promptId}/versions/${versionId}`,
        { method: "DELETE" }
      )
      if (!response.ok) throw new Error("Failed to delete version")
      setVersions((prev) => prev.filter((v) => v.id !== versionId))
      if (activeVersionId === versionId) {
        setActiveVersionId(undefined)
      }
      toast({
        title: "Success",
        description: "Version deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting version:", error)
      toast({
        title: "Error",
        description: "Failed to delete version. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }, [promptId, activeVersionId, toast])

  const activateVersion = useCallback(async (versionId: string) => {
    try {
      const response = await fetch(
        `/api/v1/prompts/${promptId}/versions/${versionId}/activate`,
        { method: "POST" }
      )
      if (!response.ok) throw new Error("Failed to activate version")
      const activatedVersion = await response.json()
      setVersions((prev) =>
        prev.map((v) => ({
          ...v,
          isActive: v.id === versionId,
        }))
      )
      setActiveVersionId(versionId)
      toast({
        title: "Success",
        description: "Version activated successfully.",
      })
      return activatedVersion
    } catch (error) {
      console.error("Error activating version:", error)
      toast({
        title: "Error",
        description: "Failed to activate version. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }, [promptId, toast])

  const compareVersion = useCallback(async (version1Id: string, version2Id: string) => {
    try {
      const version1 = versions.find((v) => v.id === version1Id)
      const version2 = versions.find((v) => v.id === version2Id)
      if (!version1 || !version2) throw new Error("Version not found")

      setCompareVersions({
        version1,
        version2,
        metrics: {
          tokenDiff:
            (version2.metrics?.tokenCount || 0) - (version1.metrics?.tokenCount || 0),
          costDiff:
            (version2.metrics?.estimatedCost || 0) - (version1.metrics?.estimatedCost || 0),
        },
      })
      setIsComparing(true)
    } catch (error) {
      console.error("Error comparing versions:", error)
      toast({
        title: "Error",
        description: "Failed to compare versions. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }, [versions, toast])

  return {
    versions,
    activeVersionId,
    isLoading,
    isComparing,
    compareVersions,
    fetchVersions,
    createVersion,
    updateVersion,
    deleteVersion,
    activateVersion,
    compareVersion,
    setIsComparing,
  }
} 