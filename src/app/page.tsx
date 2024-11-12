"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePrompt } from "@/contexts/prompt-context"

export default function Home() {
  const { prompts } = usePrompt()

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    if (minutes > 0) return `${minutes} min ago`
    return "just now"
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage and optimize your AI prompts
          </p>
        </div>
        <Link href="/prompts/new">
          <Button>New Prompt</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link href="/prompts/new" className="block">
              <Button variant="outline" className="w-full justify-start">
                Create New Prompt
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start">
              Import Prompts
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Test Environment
            </Button>
          </div>
        </div>

        {/* Recent Prompts */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Recent Prompts</h3>
          <div className="space-y-2">
            {prompts.length > 0 ? (
              prompts
                .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                .slice(0, 3)
                .map((prompt) => (
                  <div
                    key={prompt.id}
                    className="flex items-center justify-between p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <span>{prompt.name}</span>
                    <span className="text-muted-foreground text-sm">
                      {formatTimeAgo(prompt.updatedAt)}
                    </span>
                  </div>
                ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No prompts created yet
              </p>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Response Time
                </span>
                <span className="text-sm font-medium">1.2s avg</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full w-3/4"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Success Rate
                </span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full w-[92%]"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Token Usage
                </span>
                <span className="text-sm font-medium">45.2k/100k</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
