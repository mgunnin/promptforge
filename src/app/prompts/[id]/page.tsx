import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authOptions } from "@/lib/auth"
import { PromptService } from "@/lib/services/prompt.service"
import { AIService } from "@/lib/services/ai.service"
import { PromptTester } from "@/components/prompt-tester"

interface PromptDetailPageProps {
    params: {
        id: string
    }
}

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

interface PromptMetrics {
    responseTime: number
    tokenUsage: number
    successRate: number
    cost: number
}

interface DatabasePrompt {
    id: string
    name: string
    content: string
    description: string | null
    model: string
    tags: string[]
    category: string | null
    metrics: JsonValue
    createdAt: Date
    updatedAt: Date
    userId: string
    teamId: string | null
    versions: Array<{
        id: string
        content: string
        description: string | null
        model: string
        createdAt: Date
        metrics: JsonValue
        promptId: string
    }>
}

function parseMetrics(metricsJson: JsonValue): PromptMetrics {
    const metrics = metricsJson as Record<string, number>
    return {
        responseTime: metrics?.responseTime || 0,
        tokenUsage: metrics?.tokenUsage || 0,
        successRate: metrics?.successRate || 0,
        cost: metrics?.cost || 0,
    }
}

export default async function PromptDetailPage({ params }: PromptDetailPageProps) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        redirect("/login")
    }

    const rawPrompt = await PromptService.getPromptById(params.id, session.user.id) as unknown as DatabasePrompt
    const prompt = {
        ...rawPrompt,
        metrics: parseMetrics(rawPrompt.metrics),
    }
    const suggestions = await AIService.suggestImprovements(prompt.content)
    const testCases = await AIService.generateTestCases(prompt.content)

    // Extract variables from prompt content
    const variableRegex = /{{([^}]+)}}/g
    const matches = [...prompt.content.matchAll(variableRegex)]
    const variables = matches.map(match => ({
        name: match[1],
        description: null,
        required: true,
        defaultValue: null,
    }))

    return (
        <div className="container py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2">
                        <Link href="/prompts">
                            <Button variant="ghost" size="sm">
                                ← Back
                            </Button>
                        </Link>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {prompt.name}
                        </h2>
                    </div>
                    <p className="text-muted-foreground mt-2">
                        {prompt.description || "No description"}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Delete</Button>
                    <Button>Edit Prompt</Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Prompt Content</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="font-mono text-sm whitespace-pre-wrap bg-muted p-4 rounded-md">
                                {prompt.content}
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {prompt.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Version History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {prompt.versions.map((version, index) => (
                                    <div
                                        key={version.id}
                                        className="border rounded-lg p-4"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium">
                                                Version {prompt.versions.length - index}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {new Date(version.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="font-mono text-sm whitespace-pre-wrap bg-muted p-4 rounded-md">
                                            {version.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <PromptTester
                        promptId={prompt.id}
                        content={prompt.content}
                        model={prompt.model}
                        variables={variables}
                    />

                    <Card>
                        <CardHeader>
                            <CardTitle>AI Suggestions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm dark:prose-invert">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: suggestions.replace(/\n/g, "<br />"),
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Test Cases</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm dark:prose-invert">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: testCases.replace(/\n/g, "<br />"),
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Response Time
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        {prompt.metrics.responseTime}ms
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Token Usage
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        {prompt.metrics.tokenUsage}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Success Rate
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        {prompt.metrics.successRate}%
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Cost
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        ${prompt.metrics.cost.toFixed(4)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
