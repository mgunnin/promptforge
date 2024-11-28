"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Version, VersionMetrics } from "@/types/version"
import { VersionType } from "@prisma/client"
import { JsonValue } from "@prisma/client/runtime/library"
import { useEffect, useRef, useState } from "react"
import { VersionCompare } from "./version-compare"
import { VersionHistory } from "./version-history"

interface PromptEditorProps {
  promptId: string
  content: string
  onChange: (content: string) => void
  onAnalyze: (content: string) => void
  isAnalyzing: boolean
  versions: RawVersion[]
  onVersionSelect: (version: Version) => void
  onVersionCompare: (version1: Version, version2: Version) => void
  onVersionDelete: (version: Version) => void
  onVersionActivate: (version: Version) => void
  activeVersionId: string | null
  isComparing: boolean
  compareVersions?: {
    version1: RawVersion
    version2: RawVersion
  }
  onAcceptOptimized: () => void
  onRejectOptimized: () => void
}

interface Suggestion {
  text: string
  description: string
}

interface RawVersion {
  id: string;
  promptId: string;
  content: string;
  description: string | null;
  model: string;
  type: VersionType;
  metrics: JsonValue;
  createdAt: string | Date;
  isActive: boolean;
}

function convertMetrics(metrics: JsonValue): VersionMetrics | null {
  if (!metrics || typeof metrics !== 'object') return null
  const m = metrics as Record<string, number>
  return {
    tokenCount: m.tokenCount ?? 0,
    estimatedCost: m.estimatedCost ?? 0,
    responseTime: m.responseTime ?? 0,
    successRate: m.successRate ?? 0,
    ...m
  }
}

function convertVersion(v: RawVersion): Version {
  return {
    ...v,
    metrics: convertMetrics(v.metrics),
    createdAt: v.createdAt instanceof Date ? v.createdAt : new Date(v.createdAt)
  }
}

export function PromptEditor({
  promptId,
  content,
  onChange,
  onAnalyze,
  isAnalyzing,
  versions,
  onVersionSelect,
  onVersionCompare,
  onVersionDelete,
  onVersionActivate,
  activeVersionId,
  isComparing,
  compareVersions,
  onAcceptOptimized,
  onRejectOptimized
}: PromptEditorProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [cursorPosition, setCursorPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const [editorContent, setEditorContent] = useState(content || '')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "{" && !showSuggestions) {
      e.preventDefault()
      const textarea = e.currentTarget
      const { selectionStart, selectionEnd } = textarea
      const textBeforeCursor = textarea.value.substring(0, selectionStart)
      const textAfterCursor = textarea.value.substring(selectionEnd)

      // Insert the opening brace
      const newText = textBeforeCursor + "{" + textAfterCursor
      onChange(newText)

      // Get cursor position for suggestions
      const rect = textarea.getBoundingClientRect()
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
      const lines = textBeforeCursor.split("\n")
      const currentLine = lines.length
      const left = rect.left +
        (textBeforeCursor.length - lines[lines.length - 1].length) * 8
      const top = rect.top + (currentLine - 1) * lineHeight

      setCursorPosition({ top, left })
      setShowSuggestions(true)

      // Get suggestions from API
      try {
        const response = await fetch("/api/v1/prompts/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: textBeforeCursor }),
        })

        if (!response.ok) throw new Error("Failed to get suggestions")
        const data = await response.json()
        setSuggestions(data.suggestions || [])
      } catch (error) {
        console.error("Failed to get suggestions:", error)
      }
    } else if (e.key === "Tab" && showSuggestions) {
      e.preventDefault()
      if (suggestions.length > 0) {
        const suggestion = suggestions[0]
        insertSuggestion(suggestion.text)
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const insertSuggestion = (text: string) => {
    if (!editorRef.current) return

    const textarea = editorRef.current
    const { selectionStart } = textarea
    const textBeforeCursor = textarea.value.substring(0, selectionStart)
    const textAfterCursor = textarea.value.substring(selectionStart)

    const newText = textBeforeCursor + text + "}" + textAfterCursor
    onChange(newText)
    setShowSuggestions(false)

    // Set cursor position after the inserted suggestion
    const newCursorPosition = selectionStart + text.length + 1
    textarea.setSelectionRange(newCursorPosition, newCursorPosition)
  }

  const handleAnalyze = async () => {
    try {
      onAnalyze(editorContent)
    } catch (error) {
      console.error('Failed to analyze prompt:', error)
    }
  }

  return (
    <div className="flex h-[calc(100vh-12rem)]">
      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Prompt Editor</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-5rem)]">
            {isComparing && compareVersions ? (
              <VersionCompare
                version1={convertVersion(compareVersions.version1)}
                version2={convertVersion(compareVersions.version2)}
                onAccept={onAcceptOptimized!}
                onReject={onRejectOptimized!}
                className="h-full"
              />
            ) : (
              <div className="relative h-full">
                <textarea
                  ref={editorRef}
                  value={content}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-[calc(100%-4rem)] p-4 font-mono text-sm bg-background resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Write your prompt here..."
                />
                {showSuggestions && (
                  <div
                    ref={suggestionsRef}
                    className="absolute z-10 w-64 max-h-48 overflow-y-auto bg-background border rounded-md shadow-lg"
                    style={{
                      top: cursorPosition.top + "px",
                      left: cursorPosition.left + "px",
                    }}
                  >
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-accent cursor-pointer"
                        onClick={() => insertSuggestion(suggestion.text)}
                      >
                        <div className="font-medium">{suggestion.text}</div>
                        <div className="text-sm text-muted-foreground">
                          {suggestion.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {onAnalyze && (
                  <Button
                    onClick={() => onAnalyze(editorContent)}
                    disabled={isAnalyzing || !content}
                    className="w-full mt-4"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze"}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {versions && (
        <VersionHistory
          versions={versions.map(convertVersion)}
          activeVersionId={activeVersionId || undefined}
          onVersionSelect={onVersionSelect}
          onVersionCompare={onVersionCompare}
          onVersionDelete={onVersionDelete}
          onVersionActivate={onVersionActivate}
        />
      )}
    </div>
  )
} 