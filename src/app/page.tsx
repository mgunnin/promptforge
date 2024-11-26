"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePrompt } from "@/contexts/prompt-context"
import { Activity, Brain, Code, FileText, Plus, Sparkles, Upload } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { prompts } = usePrompt()

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "just now"
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to PromptForge</h1>
          <p className="text-muted-foreground text-lg">
            Create, test, and optimize your AI prompts
          </p>
        </div>
        <Link href="/prompts/new">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            New Prompt
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/prompts/new">
              <Button variant="outline" className="w-full justify-start gap-2 h-12">
                <Plus className="h-5 w-5" />
                Create New Prompt
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start gap-2 h-12">
              <Upload className="h-5 w-5" />
              Import Prompts
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 h-12">
              <Code className="h-5 w-5" />
              Test Environment
            </Button>
          </CardContent>
        </Card>

        {/* Recent Prompts */}
        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Prompts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prompts.length > 0 ? (
                prompts
                  .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                  .slice(0, 3)
                  .map((prompt) => (
                    <Link key={prompt.id} href={`/prompts/${prompt.id}`}>
                      <div className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors cursor-pointer">
                        <div>
                          <div className="font-medium">{prompt.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {prompt.model}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatTimeAgo(prompt.updatedAt)}
                        </div>
                      </div>
                    </Link>
                  ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-4">
                    No prompts created yet
                  </div>
                  <Link href="/prompts/new">
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create Your First Prompt
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Response Time</span>
                </div>
                <span className="text-sm font-medium">1.2s avg</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full w-3/4 transition-all" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Success Rate</span>
                </div>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full w-[92%] transition-all" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Token Usage</span>
                </div>
                <span className="text-sm font-medium">45.2k/100k</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full w-1/2 transition-all" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
