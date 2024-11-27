"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

interface PromptEditorProps {
  content: string
  onChange: (content: string) => void
  onAnalyze?: () => void
  isAnalyzing?: boolean
}

interface Suggestion {
  text: string
  description: string
}

export function PromptEditor({
  content,
  onChange,
  onAnalyze,
  isAnalyzing,
}: PromptEditorProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [cursorPosition, setCursorPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prompt Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <textarea
            ref={editorRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full min-h-[300px] p-4 font-mono text-sm bg-background resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
        </div>
        {onAnalyze && (
          <Button
            onClick={onAnalyze}
            disabled={isAnalyzing || !content}
            className="w-full mt-4"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 