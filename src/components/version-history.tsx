"use client"

import { cn } from "@/lib/utils"
import { Version } from "@/types/version"
import { formatDistanceToNow } from "date-fns"
import { Check, Clock, GitCompare, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"

interface VersionHistoryProps {
    versions: Version[]
    activeVersionId?: string
    onVersionSelect: (version: Version) => void
    onVersionCompare: (version1: Version, version2: Version) => void
    onVersionDelete: (version: Version) => void
    onVersionActivate: (version: Version) => void
    className?: string
}

export function VersionHistory({
    versions,
    activeVersionId,
    onVersionSelect,
    onVersionCompare,
    onVersionDelete,
    onVersionActivate,
    className,
}: VersionHistoryProps) {
    const sortedVersions = [...versions].sort((a, b) => {
        if (a.type === "original" && b.type !== "original") return -1
        if (a.type !== "original" && b.type === "original") return 1
        return b.createdAt.getTime() - a.createdAt.getTime()
    })

    const originalVersion = versions.find((v) => v.type === "original")

    return (
        <div className={cn("w-80 border-l", className)}>
            <div className="p-4 border-b">
                <h3 className="font-semibold">Version History</h3>
            </div>
            <ScrollArea className="h-[calc(100vh-10rem)]">
                <div className="p-4 space-y-4">
                    {sortedVersions.map((version) => {
                        const isActive = version.id === activeVersionId
                        const isOriginal = version.type === "original"
                        const timeAgo = formatDistanceToNow(version.createdAt, { addSuffix: true })

                        return (
                            <div
                                key={version.id}
                                className={cn(
                                    "p-3 rounded-lg border transition-colors",
                                    isActive && "border-primary bg-muted",
                                    "hover:bg-muted/50 cursor-pointer"
                                )}
                                onClick={() => onVersionSelect(version)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">
                                            {isOriginal ? "Original" : `Optimized (${version.model})`}
                                        </span>
                                        {version.isActive && (
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {!isOriginal && originalVersion && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onVersionCompare(originalVersion, version)
                                                }}
                                            >
                                                <GitCompare className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {!version.isActive && (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onVersionActivate(version)
                                                    }}
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onVersionDelete(version)
                                                    }}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{timeAgo}</span>
                                </div>
                                {version.metrics && (
                                    <div className="mt-2 text-xs text-muted-foreground">
                                        <div>Tokens: {version.metrics.tokenCount}</div>
                                        <div>Cost: ${version.metrics.estimatedCost?.toFixed(4)}</div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
} 