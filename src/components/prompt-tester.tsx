"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface PromptVariable {
    name: string
    description: string | null
    required: boolean
    defaultValue: string | null
}

interface PromptTesterProps {
    promptId: string
    content: string
    model: string
    variables: PromptVariable[]
}

export function PromptTester({ promptId, content, model, variables }: PromptTesterProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [result, setResult] = useState<string | null>(null)
    const [variableValues, setVariableValues] = useState<Record<string, string>>(() => {
        const initialValues: Record<string, string> = {}
        variables.forEach((variable) => {
            initialValues[variable.name] = variable.defaultValue || ""
        })
        return initialValues
    })

    const handleInputChange = (name: string, value: string) => {
        setVariableValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleTest = async () => {
        try {
            setIsLoading(true)
            setError(null)
            setResult(null)

            // Validate required variables
            const missingVariables = variables
                .filter((v) => v.required && !variableValues[v.name])
                .map((v) => v.name)

            if (missingVariables.length > 0) {
                setError(`Missing required variables: ${missingVariables.join(", ")}`)
                return
            }

            // Replace variables in prompt content
            let processedContent = content
            Object.entries(variableValues).forEach(([name, value]) => {
                processedContent = processedContent.replace(
                    new RegExp(`{{${name}}}`, "g"),
                    value
                )
            })

            const response = await fetch("/api/v1/prompts/test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    promptId,
                    content: processedContent,
                    model,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to test prompt")
            }

            const data = await response.json()
            setResult(data.result)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Test Prompt</CardTitle>
                <CardDescription>
                    Fill in the variables below to test your prompt
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {variables.length > 0 ? (
                        <div className="grid gap-4">
                            {variables.map((variable) => (
                                <div key={variable.name}>
                                    <label className="text-sm font-medium">
                                        {variable.name}
                                        {variable.required && (
                                            <span className="text-destructive">*</span>
                                        )}
                                    </label>
                                    {variable.description && (
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {variable.description}
                                        </p>
                                    )}
                                    <Input
                                        value={variableValues[variable.name]}
                                        onChange={(e) =>
                                            handleInputChange(variable.name, e.target.value)
                                        }
                                        placeholder={`Enter ${variable.name}`}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            This prompt has no variables to configure.
                        </p>
                    )}

                    <div className="flex justify-end">
                        <Button onClick={handleTest} disabled={isLoading}>
                            {isLoading ? "Testing..." : "Test Prompt"}
                        </Button>
                    </div>

                    {error && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className="space-y-2">
                            <div className="font-medium">Result:</div>
                            <div className="font-mono text-sm whitespace-pre-wrap bg-muted p-4 rounded-md">
                                {result}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
