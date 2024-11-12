"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { usePrompt } from "@/contexts/prompt-context"
import type { LLMModel, PromptMetrics } from "@/types/prompt"

export default function NewPrompt() {
    const router = useRouter()
    const { createPrompt, testPrompt } = usePrompt()
    const [isLoading, setIsLoading] = useState(false)
    const [testResponse, setTestResponse] = useState("")
    const [metrics, setMetrics] = useState<PromptMetrics>({
        responseTime: 0,
        tokenUsage: 0,
        successRate: 0,
        cost: 0,
    })
    const [formData, setFormData] = useState({
        name: "",
        content: "",
        description: "",
        tags: "",
        model: "gpt-4" as LLMModel,
        variables: "",
    })

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleTest = async () => {
        try {
            setIsLoading(true)
            let variables: Record<string, string> | undefined

            try {
                variables = formData.variables ? JSON.parse(formData.variables) : undefined
            } catch (e) {
                alert("Invalid JSON format for variables")
                return
            }

            const result = await testPrompt(formData.content, formData.model, variables)
            setTestResponse(result.response)
            setMetrics(result.metrics)
        } catch (error) {
            console.error("Test failed:", error)
            alert("Failed to test prompt")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setIsLoading(true)
            await createPrompt({
                name: formData.name,
                content: formData.content,
                description: formData.description,
                tags: formData.tags.split(",").map((tag) => tag.trim()),
                model: formData.model,
            })
            router.push("/")
        } catch (error) {
            console.error("Save failed:", error)
            alert("Failed to save prompt")
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
                    <div className="rounded-lg border bg-card">
                        <div className="flex items-center justify-between border-b p-4">
                            <h3 className="font-semibold">Prompt Editor</h3>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                    Version History
                                </Button>
                            </div>
                        </div>
                        <div className="p-4">
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                className="w-full min-h-[400px] bg-background resize-none border-0 focus:ring-0"
                                placeholder="Write your prompt here..."
                            />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-4 space-y-4">
                        <h3 className="font-semibold">Prompt Settings</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-background border rounded-md"
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
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-background border rounded-md"
                                placeholder="Add tags (comma separated)"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="space-y-4">
                    <div className="rounded-lg border bg-card">
                        <div className="flex items-center justify-between border-b p-4">
                            <h3 className="font-semibold">Test Environment</h3>
                            <Button
                                size="sm"
                                onClick={handleTest}
                                disabled={isLoading || !formData.content}
                            >
                                {isLoading ? "Running..." : "Run Test"}
                            </Button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Model</label>
                                <select
                                    name="model"
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-background border rounded-md"
                                >
                                    <option value="gpt-4">GPT-4</option>
                                    <option value="gpt-3.5-turbo">GPT-3.5</option>
                                    <option value="claude-2">Claude</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Variables</label>
                                <textarea
                                    name="variables"
                                    value={formData.variables}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-background border rounded-md"
                                    rows={4}
                                    placeholder="Enter test variables (JSON format)"
                                />
                            </div>
                            <div className="rounded-lg border bg-background p-4 min-h-[200px]">
                                {testResponse ? (
                                    <p className="whitespace-pre-wrap">{testResponse}</p>
                                ) : (
                                    <p className="text-muted-foreground text-sm">
                                        Response will appear here...
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-4 space-y-4">
                        <h3 className="font-semibold">Performance Metrics</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Response Time</p>
                                <p className="text-2xl font-bold">{metrics.responseTime.toFixed(1)}s</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Token Usage</p>
                                <p className="text-2xl font-bold">{metrics.tokenUsage}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Cost</p>
                                <p className="text-2xl font-bold">${metrics.cost.toFixed(3)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
