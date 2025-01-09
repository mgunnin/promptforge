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
import { PromptCategory, Version } from "@prisma/client"
import { X } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
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
    { id: "Business", name: "Business" },
    { id: "CodeGeneration", name: "Code Generation" },
    { id: "ContentCreation", name: "Content Creation" },
    { id: "CreativeWriting", name: "Creative Writing" },
    { id: "DataAnalysis", name: "Data Analysis" },
    { id: "Debugging", name: "Debugging" },
    { id: "Documentation", name: "Documentation" },
    { id: "Education", name: "Education" },
    { id: "General", name: "General" },
    { id: "QuestionAnswering", name: "Question Answering" },
    { id: "Research", name: "Research" },
    { id: "Roleplay", name: "Roleplay" },
    { id: "Summarization", name: "Summarization" },
    { id: "SystemDesign", name: "System Design" },
    { id: "TaskPlanning", name: "Task Planning" },
    { id: "Testing", name: "Testing" },
    { id: "Translation", name: "Translation" },
] as const

export default function NewPromptPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [content, setContent] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [model, setModel] = useState<string>(AVAILABLE_MODELS[0].id)
    const [category, setCategory] = useState<PromptCategory>("General")
    const [tags, setTags] = useState<string[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [isOptimizing, setIsOptimizing] = useState(false)
    const [versions, setVersions] = useState<Version[]>([])
    const [activeVersionId, setActiveVersionId] = useState<string | null>(null)
    const [isComparing, setIsComparing] = useState(false)
    const [compareVersions, setCompareVersions] = useState<{
        version1: Version
        version2: Version
    }>()
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
        if (!content || !activeVersionId) {
            toast({
                title: "Cannot Optimize",
                description: "Please save the prompt first.",
                variant: "destructive",
            })
            return
        }

        setIsOptimizing(true)
        try {
            // First, get the optimized content
            const optimizeResponse = await fetch("/api/v1/prompts/optimize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, model }),
            })

            if (!optimizeResponse.ok) throw new Error("Failed to optimize prompt")
            const { optimizedContent, metrics } = await optimizeResponse.json()

            // Then, create a new version through the API
            const versionResponse = await fetch(`/api/v1/prompts/${activeVersionId}/versions/optimize`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: optimizedContent,
                    model,
                    metrics,
                }),
            })

            if (!versionResponse.ok) throw new Error("Failed to create version")
            const version = await versionResponse.json()

            setVersions([...versions, version])
            setCompareVersions({
                version1: versions.find((v) => v.type === "original")!,
                version2: version,
            })
            setIsComparing(true)

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
        if (!session) {
            toast({
                title: "Authentication Required",
                description: "Please sign in to save your prompt.",
                variant: "destructive",
            })
            return
        }

        if (!content) {
            toast({
                title: "No Content",
                description: "Please write your prompt first.",
                variant: "destructive",
            })
            return
        }

        try {
            // Auto-analyze if metadata is empty
            if (!name || !description || !category || tags.length === 0) {
                setIsAnalyzing(true)
                const analysisResponse = await fetch("/api/v1/prompts/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content }),
                })

                if (!analysisResponse.ok) throw new Error("Failed to analyze prompt")
                const analysis = await analysisResponse.json()

                // Update state with analysis results
                const analyzedName = analysis.suggestedName || name
                const analyzedDescription = analysis.description || description
                const analyzedCategory = analysis.category || category
                const analyzedTags = analysis.tags || tags

                // Create the prompt with analyzed data
                const response = await fetch("/api/v1/prompts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: analyzedName,
                        content,
                        description: analyzedDescription,
                        model,
                        category: analyzedCategory,
                        tags: analyzedTags,
                    }),
                })

                if (!response.ok) throw new Error("Failed to create prompt")
                const prompt = await response.json()

                // Update state with the created prompt
                setName(analyzedName)
                setDescription(analyzedDescription)
                setCategory(analyzedCategory)
                setTags(analyzedTags)
                setActiveVersionId(prompt.id)
                setVersions(prompt.versions || [])

            } else {
                // Create the prompt with existing data
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

                if (!response.ok) throw new Error("Failed to create prompt")
                const prompt = await response.json()

                // Update state with the created prompt
                setActiveVersionId(prompt.id)
                setVersions(prompt.versions || [])
            }

            toast({
                title: "Prompt Saved",
                description: "Your prompt has been saved successfully.",
            })

            // Navigate back to prompts page after successful save
            router.push("/prompts")
        } catch (error) {
            console.error("Error saving prompt:", error)
            toast({
                title: "Save Failed",
                description: "Failed to save the prompt. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleVersionSelect = (version: Version) => {
        setContent(version.content)
        setIsComparing(false)
    }

    const handleVersionCompare = (version1: Version, version2: Version) => {
        setCompareVersions({ version1, version2 })
        setIsComparing(true)
    }

    const handleVersionDelete = async (version: Version) => {
        try {
            const response = await fetch(`/api/v1/prompts/${version.promptId}/versions/${version.id}/delete`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete version")
            setVersions(versions.filter((v) => v.id !== version.id))
            toast({
                title: "Version Deleted",
                description: "The version has been deleted successfully.",
            })
        } catch (error) {
            console.error("Error deleting version:", error)
            toast({
                title: "Delete Failed",
                description: "Failed to delete the version. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleVersionActivate = async (version: Version) => {
        try {
            const response = await fetch(`/api/v1/prompts/${version.promptId}/versions/${version.id}/activate`, {
                method: "POST",
            })

            if (!response.ok) throw new Error("Failed to activate version")
            setVersions(
                versions.map((v) => ({
                    ...v,
                    isActive: v.id === version.id,
                }))
            )
            setActiveVersionId(version.id)
            setContent(version.content)
            toast({
                title: "Version Activated",
                description: "The version has been set as active.",
            })
        } catch (error) {
            console.error("Error activating version:", error)
            toast({
                title: "Activation Failed",
                description: "Failed to activate the version. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleAcceptOptimized = () => {
        if (!compareVersions) return
        handleVersionActivate(compareVersions.version2)
        setIsComparing(false)
    }

    const handleRejectOptimized = () => {
        if (!compareVersions) return
        handleVersionDelete(compareVersions.version2)
        setIsComparing(false)
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
                    promptId={activeVersionId || ""}
                    content={content}
                    onChange={setContent}
                    onAnalyze={handleAnalyze}
                    isAnalyzing={isAnalyzing}
                    versions={versions}
                    onVersionSelect={handleVersionSelect}
                    onVersionCompare={handleVersionCompare}
                    onVersionDelete={handleVersionDelete}
                    onVersionActivate={handleVersionActivate}
                    activeVersionId={activeVersionId}
                    isComparing={isComparing}
                    compareVersions={compareVersions}
                    onAcceptOptimized={handleAcceptOptimized}
                    onRejectOptimized={handleRejectOptimized}
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
                            <Select value={category} onValueChange={(value: PromptCategory) => setCategory(value)}>
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
