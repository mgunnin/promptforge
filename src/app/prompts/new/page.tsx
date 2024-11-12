"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AIService } from "@/lib/services/ai.service"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface AIAnalysis {
    category: string
    tags: string[]
    suggestedName: string
    description: string
}

export default function NewPrompt() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [aiSuggestions, setAiSuggestions] = useState<string | null>(null)
    const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        content: "",
        description: "",
        tags: "",
        model: "gpt-4" as const,
    })

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const analyzePrompt = async () => {
        if (!formData.content) return

        setIsAnalyzing(true)
        setError(null)

        try {
            const analysis = await AIService.analyzePrompt(formData.content)
            setAiAnalysis(analysis)
            setFormData(prev => ({
                ...prev,
                name: analysis.suggestedName,
                description: analysis.description,
                tags: analysis.tags.join(", "),
            }))

            const suggestions = await AIService.suggestImprovements(formData.content)
            setAiSuggestions(suggestions)
        } catch (err) {
            setError("Failed to analyze prompt")
            console.error(err)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleSave = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("/api/v1/prompts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(",").map(tag => tag.trim()),
                    category: aiAnalysis?.category || "Uncategorized",
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to save prompt")
            }

            router.push("/prompts")
        } catch (err) {
            setError("Failed to save prompt")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Create New Prompt</h2>
                    <p className="text-muted-foreground">
                        Design and test your AI prompt
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href="/">
                        <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Prompt"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Editor Section */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Prompt Editor</CardTitle>
                            <CardDescription>
                                Write your prompt and let AI help you optimize it
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className="w-full min-h-[300px] p-4 bg-background resize-none border rounded-md"
                                    placeholder="Write your prompt here..."
                                />
                                <Button
                                    onClick={analyzePrompt}
                                    disabled={isAnalyzing || !formData.content}
                                    className="w-full"
                                >
                                    {isAnalyzing ? "Analyzing..." : "Analyze & Improve"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Prompt Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter prompt name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-background border rounded-md"
                                    rows={3}
                                    placeholder="Enter prompt description"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tags</label>
                                <Input
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    placeholder="Add tags (comma separated)"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Model</label>
                                <select
                                    name="model"
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-background border rounded-md"
                                >
                                    <option value="gpt-4">GPT-4</option>
                                    <option value="gpt-4o">GPT-4o</option>
                                    <option value="claude-3-5-sonnet-20241022">Claude</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* AI Analysis Section */}
                <div className="space-y-4">
                    {error && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {aiAnalysis && (
                        <Card>
                            <CardHeader>
                                <CardTitle>AI Analysis</CardTitle>
                                <CardDescription>
                                    Automatic analysis of your prompt
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Category</label>
                                    <p className="mt-1 text-muted-foreground">
                                        {aiAnalysis.category}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        Suggested Tags
                                    </label>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {aiAnalysis.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {aiSuggestions && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Improvement Suggestions</CardTitle>
                                <CardDescription>
                                    AI-generated suggestions to enhance your prompt
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm dark:prose-invert">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: aiSuggestions.replace(
                                                /\n/g,
                                                "<br />"
                                            ),
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
