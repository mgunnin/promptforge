"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface ApiKey {
    id: string
    name: string
    key: string
    createdAt: string
    lastUsed?: string
}

interface ApiKeyListProps {
    initialKeys: ApiKey[]
}

export function ApiKeyList({ initialKeys }: ApiKeyListProps) {
    const [keys, setKeys] = useState<ApiKey[]>(initialKeys)
    const [isLoading, setIsLoading] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleCreateKey = async (name: string) => {
        try {
            setIsLoading("create")
            const response = await fetch("/api/v1/keys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            })

            if (!response.ok) throw new Error("Failed to create API key")

            const { apiKey } = await response.json()
            setKeys((prev) => [apiKey, ...prev])
        } catch {
            setError("Failed to create API key")
        } finally {
            setIsLoading(null)
        }
    }

    const handleRotateKey = async (keyId: string) => {
        try {
            setIsLoading(keyId)
            const response = await fetch(`/api/v1/keys?id=${keyId}`, {
                method: "PUT",
            })

            if (!response.ok) throw new Error("Failed to rotate API key")

            const { apiKey } = await response.json()
            setKeys((prev) =>
                prev.map((key) => (key.id === keyId ? apiKey : key))
            )
        } catch {
            setError("Failed to rotate API key")
        } finally {
            setIsLoading(null)
        }
    }

    const handleDeleteKey = async (keyId: string) => {
        try {
            setIsLoading(keyId)
            const response = await fetch(`/api/v1/keys?id=${keyId}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete API key")

            setKeys((prev) => prev.filter((key) => key.id !== keyId))
        } catch {
            setError("Failed to delete API key")
        } finally {
            setIsLoading(null)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                    Manage your API keys for accessing PromptForge programmatically
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <Button
                            onClick={() => handleCreateKey("Default")}
                            disabled={isLoading === "create"}
                        >
                            {isLoading === "create" ? "Creating..." : "Create API Key"}
                        </Button>
                    </div>

                    {error && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        {keys.map((key) => (
                            <div
                                key={key.id}
                                className="flex items-center justify-between p-4 border rounded-lg bg-card"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium">{key.name}</p>
                                    <p className="text-sm text-muted-foreground font-mono">
                                        {key.key}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Created:{" "}
                                        {new Date(key.createdAt).toLocaleDateString()}
                                        {key.lastUsed &&
                                            ` • Last used: ${new Date(
                                                key.lastUsed
                                            ).toLocaleDateString()}`}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRotateKey(key.id)}
                                        disabled={isLoading === key.id}
                                    >
                                        {isLoading === key.id ? "Rotating..." : "Rotate"}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDeleteKey(key.id)}
                                        disabled={isLoading === key.id}
                                    >
                                        {isLoading === key.id ? "Deleting..." : "Delete"}
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {keys.length === 0 && (
                            <div className="text-center py-6 text-muted-foreground">
                                No API keys found. Create one to get started.
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
