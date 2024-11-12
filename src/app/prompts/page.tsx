import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/auth"
import { PromptService } from "@/lib/services/prompt.service"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

interface PromptMetrics {
    responseTime: number
    tokenUsage: number
    successRate: number
    cost: number
    [key: string]: number
}

interface PromptWithMetrics {
    id: string
    name: string
    content: string
    description: string | null
    model: string
    tags: string[]
    category: string | null
    metrics: PromptMetrics
    createdAt: string
    updatedAt: string
    versions: Array<{
        id: string
        content: string
        description: string | null
        model: string
        createdAt: string
    }>
}

type RawPromptData = {
    id: string,
    name: string,
    content: string,
    description: string | null,
    model: string,
    tags: string[],
    category: string | null,
    metrics: JsonValue,
    createdAt: Date,
    updatedAt: Date,
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

function formatDate(dateString: string | Date) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

function parseMetrics(metricsJson: JsonValue): PromptMetrics {
    const metrics = (metricsJson as Record<string, number>) || {}
    return {
        responseTime: metrics.responseTime || 0,
        tokenUsage: metrics.tokenUsage || 0,
        successRate: metrics.successRate || 0,
        cost: metrics.cost || 0,
    }
}

export default async function PromptsPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        redirect("/login")
    }

    const rawPrompts = (await PromptService.listPrompts(session.user.id)) as unknown as RawPromptData[]
    const prompts: PromptWithMetrics[] = rawPrompts.map(prompt => ({
        id: prompt.id,
        name: prompt.name,
        content: prompt.content,
        description: prompt.description,
        model: prompt.model,
        tags: prompt.tags,
        category: prompt.category,
        metrics: parseMetrics(prompt.metrics),
        createdAt: prompt.createdAt.toISOString(),
        updatedAt: prompt.updatedAt.toISOString(),
        versions: prompt.versions.map(v => ({
            id: v.id,
            content: v.content,
            description: v.description,
            model: v.model,
            createdAt: v.createdAt.toISOString(),
        })),
    }))

    return (
        <div className="container py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Prompts</h2>
                    <p className="text-muted-foreground">
                        Manage and organize your AI prompts
                    </p>
                </div>
                <Link href="/prompts/new">
                    <Button>Create New Prompt</Button>
                </Link>
            </div>

            <div className="grid gap-6">
                {prompts.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold mb-2">No prompts found</h3>
                        <p className="text-muted-foreground mb-4">
                            Get started by creating your first prompt
                        </p>
                        <Link href="/prompts/new">
                            <Button>Create New Prompt</Button>
                        </Link>
                    </div>
                ) : (
                    prompts.map((prompt) => (
                        <div
                            key={prompt.id}
                            className="border rounded-lg p-6 bg-card hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{prompt.name}</h3>
                                    <p className="text-muted-foreground mb-4">
                                        {prompt.description || "No description"}
                                    </p>
                                </div>
                                <Link href={`/prompts/${prompt.id}`}>
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {prompt.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div>Model: {prompt.model}</div>
                                <div>Category: {prompt.category || "Uncategorized"}</div>
                                <div>Updated: {formatDate(prompt.updatedAt)}</div>
                                <div>
                                    Versions: {prompt.versions ? prompt.versions.length : 0}
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t grid grid-cols-4 gap-4">
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
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
