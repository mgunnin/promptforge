"use client"

import { PromptEditor } from "@/components/prompt-editor"
import { Badge } from "@/components/ui/badge"
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
import { PromptCategory } from "@prisma/client"
import { X } from "lucide-react"
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

const PROMPT_CATEGORIES = [
    { id: "General", name: "General" },
    { id: "CodeGeneration", name: "Code Generation" },
    { id: "ContentCreation", name: "Content Creation" },
    { id: "DataAnalysis", name: "Data Analysis" },
    { id: "Translation", name: "Translation" },
    { id: "Summarization", name: "Summarization" },
    { id: "QuestionAnswering", name: "Question Answering" },
    { id: "TaskPlanning", name: "Task Planning" },
    { id: "Roleplay", name: "Roleplay" },
    { id: "SystemDesign", name: "System Design" },
    { id: "Debugging", name: "Debugging" },
    { id: "Testing", name: "Testing" },
    { id: "Documentation", name: "Documentation" },
    { id: "CreativeWriting", name: "Creative Writing" },
    { id: "Business", name: "Business" },
    { id: "Education", name: "Education" },
    { id: "Research", name: "Research" },
] as const

export default function NewPromptPage() {
    const [content, setContent] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [model, setModel] = useState<string>(AVAILABLE_MODELS[0].id)
    const [category, setCategory] = useState<PromptCategory>("General")
    const [tags, setTags] = useState<string[]>([])
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
            setCategory(analysis.category || "General")
            setTags(analysis.tags || [])

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

        // Auto-analyze if metadata is empty
        if (!name || !description || !category || tags.length === 0) {
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
                    category,
                    tags,
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

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
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
                            />
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={category}
                                onValueChange={(value: PromptCategory) => setCategory(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PROMPT_CATEGORIES.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Tags</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                        <button
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 hover:text-destructive"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                                {tags.length === 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        Click &apos;Analyze&apos; to generate tags
                                    </p>
                                )}
                            </div>
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

                        <Button onClick={handleSave} className="w-full">
                            Save Prompt
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
