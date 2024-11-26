"use client"

import { PromptEditor } from "@/components/prompt-editor"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

const AVAILABLE_MODELS = [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    { id: "claude-3-opus", name: "Claude 3 Opus" },
    { id: "claude-3-sonnet-20241022", name: "Claude 3.5 Sonnet" },
    { id: "gemini-pro", name: "Gemini Pro" },
    { id: "mixtral-8x7b", name: "Mixtral 8x7B" },
    { id: "llama-2-70b", name: "Llama 2 70B" },
] as const

export default function NewPromptPage() {
    const [content, setContent] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [model, setModel] = useState<string>(AVAILABLE_MODELS[0].id)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [isOptimizing, setIsOptimizing] = useState(false)
    const { toast } = useToast()

    const handleAnalyze = async () => {
        if (!content) {
            toast({
                title: "No Content",
                description: "Please write your prompt first.",
                variant: "destructive",
            })
            return
        }

        setIsAnalyzing(true)
        try {
            const response = await fetch("/api/v1/prompts/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            })

            if (!response.ok) throw new Error("Failed to analyze prompt")
            const analysis = await response.json()

            setName(analysis.suggestedName || "")
            setDescription(analysis.description || "")

            toast({
                title: "Prompt Analyzed",
                description: "We've analyzed your prompt and suggested metadata.",
            })
        } catch (error) {
            console.error("Error analyzing prompt:", error)
            toast({
                title: "Analysis Failed",
                description: "Failed to analyze the prompt. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleOptimize = async () => {
        if (!content) {
            toast({
                title: "No Content",
                description: "Please write your prompt first.",
                variant: "destructive",
            })
            return
        }

        setIsOptimizing(true)
        try {
            const response = await fetch("/api/v1/prompts/optimize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, model }),
            })

            if (!response.ok) throw new Error("Failed to optimize prompt")
            const { optimizedContent } = await response.json()

            setContent(optimizedContent)
            toast({
                title: "Prompt Optimized",
                description: "Your prompt has been optimized for better results.",
            })
        } catch (error) {
            console.error("Error optimizing prompt:", error)
            toast({
                title: "Optimization Failed",
                description: "Failed to optimize the prompt. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsOptimizing(false)
        }
    }

    const handleSave = async () => {
        if (!content) {
            toast({
                title: "No Content",
                description: "Please write your prompt first.",
                variant: "destructive",
            })
            return
        }

        // Auto-analyze if name or description is empty
        if (!name || !description) {
            await handleAnalyze()
        }

        try {
            const response = await fetch("/api/v1/prompts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    content,
                    description,
                    model,
                }),
            })

            if (!response.ok) throw new Error("Failed to save prompt")

            toast({
                title: "Prompt Saved",
                description: "Your prompt has been saved successfully.",
            })
        } catch (error) {
            console.error("Error saving prompt:", error)
            toast({
                title: "Save Failed",
                description: "Failed to save the prompt. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="container py-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Create New Prompt</h2>
                <p className="text-muted-foreground">
                    Write your prompt and let AI handle the rest
                </p>
            </div>

            <div className="grid gap-6">
                <PromptEditor
                    content={content}
                    onChange={setContent}
                    onAnalyze={handleAnalyze}
                    isAnalyzing={isAnalyzing}
                />

                <div className="flex gap-2">
                    <Button
                        onClick={handleAnalyze}
                        variant="secondary"
                        disabled={isAnalyzing || !content}
                    >
                        {isAnalyzing ? "Analyzing..." : "Analyze & Generate Metadata"}
                    </Button>
                    <Button
                        onClick={handleOptimize}
                        variant="secondary"
                        disabled={isOptimizing || !content}
                    >
                        {isOptimizing ? "Optimizing..." : "Optimize Prompt"}
                    </Button>
                </div>

                <Card className="p-6">
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setName(e.target.value)
                                }
                                placeholder="Click 'Analyze' to generate a name"
                                readOnly
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setDescription(e.target.value)
                                }
                                placeholder="Click 'Analyze' to generate a description"
                                readOnly
                            />
                        </div>

                        <div>
                            <Label htmlFor="model">Model</Label>
                            <Select value={model} onValueChange={setModel}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a model" />
                                </SelectTrigger>
                                <SelectContent>
                                    {AVAILABLE_MODELS.map((m) => (
                                        <SelectItem key={m.id} value={m.id}>
                                            {m.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button onClick={handleSave} disabled={!content}>
                            Save Prompt
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
