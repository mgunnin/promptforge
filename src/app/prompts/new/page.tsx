"use client"

import { PromptEditor } from "@/components/prompt-editor"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

export default function NewPromptPage() {
    const [content, setContent] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [model, setModel] = useState("gpt-4")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const { toast } = useToast()

    const handleAnalyze = async () => {
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
                description: "We've analyzed your prompt and suggested some improvements.",
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

    const handleSave = async () => {
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
                    Create and test your prompt before saving
                </p>
            </div>

            <div className="grid gap-6">
                <PromptEditor
                    content={content}
                    onChange={setContent}
                    onAnalyze={handleAnalyze}
                    isAnalyzing={isAnalyzing}
                />

                <Card className="p-6">
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                placeholder="Give your prompt a name"
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                                placeholder="Describe what your prompt does"
                            />
                        </div>

                        <div>
                            <Label htmlFor="model">Model</Label>
                            <Input
                                id="model"
                                value={model}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModel(e.target.value)}
                                placeholder="Specify the model (e.g., gpt-4)"
                            />
                        </div>

                        <Button onClick={handleSave} disabled={!content || !name}>
                            Save Prompt
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
