"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Sparkles, TestTube } from "lucide-react"
import { useState } from "react"

interface AIAnalyticsProps {
    promptId: string
    content: string
}

export function AIAnalytics({ promptId, content }: AIAnalyticsProps) {
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
    const [isLoadingTestCases, setIsLoadingTestCases] = useState(false)
    const [suggestions, setSuggestions] = useState<string | null>(null)
    const [testCases, setTestCases] = useState<string | null>(null)
    const { toast } = useToast()

    const generateSuggestions = async () => {
        setIsLoadingSuggestions(true)
        toast({
            title: "Generating Suggestions",
            description: "AI is analyzing your prompt...",
        })

        try {
            const response = await fetch("/api/v1/prompts/suggest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ promptId, content }),
            })

            if (!response.ok) throw new Error("Failed to generate suggestions")
            const data = await response.json()
            setSuggestions(data.suggestions)

            toast({
                title: "Suggestions Ready",
                description: "AI has analyzed your prompt and generated suggestions.",
            })
        } catch (error) {
            console.error("Error generating suggestions:", error)
            toast({
                title: "Generation Failed",
                description: "Failed to generate suggestions. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoadingSuggestions(false)
        }
    }

    const generateTestCases = async () => {
        setIsLoadingTestCases(true)
        toast({
            title: "Generating Test Cases",
            description: "AI is creating test cases...",
        })

        try {
            const response = await fetch("/api/v1/prompts/test-cases", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ promptId, content }),
            })

            if (!response.ok) throw new Error("Failed to generate test cases")
            const data = await response.json()
            setTestCases(data.testCases)

            toast({
                title: "Test Cases Ready",
                description: "AI has generated test cases for your prompt.",
            })
        } catch (error) {
            console.error("Error generating test cases:", error)
            toast({
                title: "Generation Failed",
                description: "Failed to generate test cases. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoadingTestCases(false)
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        AI Suggestions
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={generateSuggestions}
                            disabled={isLoadingSuggestions}
                        >
                            {isLoadingSuggestions ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate
                                </>
                            )}
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {suggestions ? (
                        <div className="prose prose-sm dark:prose-invert">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: suggestions.replace(/\n/g, "<br />"),
                                }}
                            />
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            Click generate to get AI suggestions for improving your prompt.
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Test Cases
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={generateTestCases}
                            disabled={isLoadingTestCases}
                        >
                            {isLoadingTestCases ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <TestTube className="mr-2 h-4 w-4" />
                                    Generate
                                </>
                            )}
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {testCases ? (
                        <div className="prose prose-sm dark:prose-invert">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: testCases.replace(/\n/g, "<br />"),
                                }}
                            />
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            Click generate to create AI test cases for your prompt.
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    )
}
