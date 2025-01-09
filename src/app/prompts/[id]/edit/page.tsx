"use client"

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
import { Loader2, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"

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

interface EditPromptPageProps {
    params: Promise<{ id: string }>
}

export default function EditPromptPage({ params }: EditPromptPageProps) {
    const resolvedParams = use(params)
    const { data: session, status: sessionStatus } = useSession()
    const router = useRouter()
    const { toast } = useToast()

    const [content, setContent] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState<PromptCategory>("General")
    const [tags, setTags] = useState<string[]>([])
    const [newTag, setNewTag] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Redirect if not authenticated
    useEffect(() => {
        if (sessionStatus === 'unauthenticated') {
            router.push('/login')
        }
    }, [sessionStatus, router])

    // Fetch prompt data
    useEffect(() => {
        const fetchPrompt = async () => {
            if (sessionStatus !== 'authenticated') return

            setIsFetching(true)
            setError(null)
            try {
                const response = await fetch(`/api/v1/prompts/${resolvedParams.id}`)
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("Prompt not found")
                    }
                    if (response.status === 401) {
                        throw new Error("You are not authorized to view this prompt")
                    }
                    throw new Error("Failed to load prompt details")
                }
                const prompt = await response.json()

                setContent(prompt.content)
                setName(prompt.name)
                setDescription(prompt.description || "")
                setCategory(prompt.category || "General")
                setTags(prompt.tags || [])
            } catch (error) {
                console.error("Error fetching prompt:", error)
                setError(error instanceof Error ? error.message : "Failed to load prompt details")
                toast({
                    title: "Error",
                    description: error instanceof Error ? error.message : "Failed to load prompt details",
                    variant: "destructive",
                })
            } finally {
                setIsFetching(false)
            }
        }

        fetchPrompt()
    }, [resolvedParams.id, toast, sessionStatus])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTag()
        }
    }

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag])
            setNewTag("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const handleSave = async () => {
        if (!session) {
            toast({
                title: "Authentication Required",
                description: "Please sign in to edit prompts",
                variant: "destructive",
            })
            return
        }

        if (!name.trim()) {
            toast({
                title: "Validation Error",
                description: "Prompt name is required",
                variant: "destructive",
            })
            return
        }

        if (!content.trim()) {
            toast({
                title: "Validation Error",
                description: "Prompt content is required",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch(`/api/v1/prompts/${resolvedParams.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    content: content.trim(),
                    description: description.trim(),
                    category,
                    tags,
                }),
            })

            if (!response.ok) {
                throw new Error(await response.text())
            }

            toast({
                title: "Success",
                description: "Prompt updated successfully",
            })

            // Navigate back to prompt details
            router.push(`/prompts/${resolvedParams.id}`)
        } catch (error) {
            console.error("Error updating prompt:", error)
            toast({
                title: "Update Failed",
                description: "Failed to update the prompt. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (sessionStatus === 'loading' || isFetching) {
        return (
            <div className="container py-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button onClick={() => router.push('/prompts')}>
                        Return to Prompts
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Edit Prompt</h2>
                <p className="text-muted-foreground">
                    Update your prompt details
                </p>
            </div>

            <Card className="p-6">
                <div className="grid gap-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter prompt name"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter prompt content"
                            className="min-h-[200px] font-mono"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter prompt description"
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
                        <div className="flex gap-2 mb-2">
                            <Input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Add a tag"
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleAddTag}
                            >
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-1 hover:text-destructive"
                                        aria-label={`Remove ${tag} tag`}
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <Button
                            variant="outline"
                            onClick={() => router.push(`/prompts/${resolvedParams.id}`)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
} 