import { PromptTester } from "@/components/prompt-tester"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { authOptions } from "@/lib/auth"
import { AIService } from "@/lib/services/ai.service"
import { PromptService } from "@/lib/services/prompt.service"
import { formatDate } from "@/lib/utils"
import { GitFork, Heart, History, MessageSquare, Share2, Star, Zap } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

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
    likes: number
    saves: number
    forks: number
    comments: number
    runs: number
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
        likes: metrics?.likes || 0,
        saves: metrics?.saves || 0,
        forks: metrics?.forks || 0,
        comments: metrics?.comments || 0,
        runs: metrics?.runs || 0,
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

    // Get related prompts (placeholder)
    const relatedPrompts = await PromptService.listPrompts(session.user.id, {
        category: prompt.category || undefined,
        limit: 3,
        excludeId: prompt.id,
    })

    return (
        <div className="container py-6">
            {/* Header Section */}
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
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src="/placeholder-avatar.jpg" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                                Created by {session.user.name || "Anonymous"}
                            </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {formatDate(prompt.createdAt)}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Heart className="h-4 w-4" />
                        <span>{prompt.metrics.likes}</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Star className="h-4 w-4" />
                        <span>{prompt.metrics.saves}</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <GitFork className="h-4 w-4" />
                        <span>{prompt.metrics.forks}</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                    <Button>Edit Prompt</Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList>
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="versions">
                                <History className="h-4 w-4 mr-2" />
                                Versions ({prompt.versions.length})
                            </TabsTrigger>
                            <TabsTrigger value="test">
                                <Zap className="h-4 w-4 mr-2" />
                                Test
                            </TabsTrigger>
                            <TabsTrigger value="comments">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Comments ({prompt.metrics.comments})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="content" className="space-y-6">
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

                            {variables.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Variables</CardTitle>
                                        <CardDescription>
                                            Variables that can be customized in this prompt
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {variables.map((variable) => (
                                                <div key={variable.name} className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium">{variable.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {variable.description || "No description"}
                                                        </div>
                                                    </div>
                                                    {variable.required && (
                                                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                                            Required
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="versions">
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
                                                        {formatDate(version.createdAt)}
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
                        </TabsContent>

                        <TabsContent value="test">
                            <PromptTester
                                promptId={prompt.id}
                                content={prompt.content}
                                model={prompt.model}
                                variables={variables}
                            />
                        </TabsContent>

                        <TabsContent value="comments">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Comments</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Placeholder for comments */}
                                        <div className="text-center text-muted-foreground py-8">
                                            No comments yet. Be the first to comment!
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
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
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Total Runs
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">
                                        {prompt.metrics.runs}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

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

                    {relatedPrompts.prompts.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Related Prompts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {relatedPrompts.prompts.map((relatedPrompt) => (
                                        <Link
                                            key={relatedPrompt.id}
                                            href={`/prompts/${relatedPrompt.id}`}
                                            className="block p-4 rounded-lg border hover:border-primary/50 transition-colors"
                                        >
                                            <div className="font-medium">{relatedPrompt.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {relatedPrompt.description || "No description"}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
