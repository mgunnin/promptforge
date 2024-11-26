"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDebounce } from "@/hooks/use-debounce"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

interface SearchResult {
    id: string
    name: string
    content: string
    description: string | null
    model: string
    tags: string[]
    category: string | null
    score: number
    metrics: Record<string, unknown>
    createdAt: Date
    updatedAt: Date
}

interface SearchFilters {
    tags?: string[]
    category?: string
    model?: string
    dateRange?: {
        start: Date
        end: Date
    }
}

interface SearchSort {
    field: "relevance" | "createdAt" | "updatedAt"
    direction: "asc" | "desc"
}

export function PromptSearch() {
    const [query, setQuery] = useState("")
    const [searchType, setSearchType] = useState<"semantic" | "text">("semantic")
    const [filters, setFilters] = useState<SearchFilters>({})
    const [sort, setSort] = useState<SearchSort>({
        field: "relevance",
        direction: "desc",
    })
    const [page, setPage] = useState(1)
    const [results, setResults] = useState<SearchResult[]>([])
    const [totalResults, setTotalResults] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const debouncedQuery = useDebounce(query, 300)

    const performSearch = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)

            const searchParams = new URLSearchParams({
                query: debouncedQuery,
                type: searchType,
                page: page.toString(),
                limit: "10",
            })

            if (Object.keys(filters).length > 0) {
                searchParams.append("filters", JSON.stringify(filters))
            }

            if (sort) {
                searchParams.append("sort", JSON.stringify(sort))
            }

            const response = await fetch(`/api/v1/prompts/search?${searchParams}`)
            if (!response.ok) throw new Error("Search failed")

            const data = await response.json()
            setResults(data.results)
            setTotalResults(data.total)
            setTotalPages(data.totalPages)
        } catch (err) {
            setError("Failed to perform search")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }, [debouncedQuery, searchType, filters, sort, page])

    useEffect(() => {
        if (debouncedQuery) {
            performSearch()
        } else {
            setResults([])
            setTotalResults(0)
            setTotalPages(0)
        }
    }, [debouncedQuery, performSearch])

    const handleFilterChange = (
        type: keyof SearchFilters,
        value: string | string[] | { start: Date; end: Date } | null
    ) => {
        setFilters((prev) => ({
            ...prev,
            [type]: value,
        }))
        setPage(1)
    }

    const handleSortChange = (field: SearchSort["field"]) => {
        setSort((prev) => ({
            field,
            direction:
                prev.field === field
                    ? prev.direction === "asc"
                        ? "desc"
                        : "asc"
                    : "desc",
        }))
        setPage(1)
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search prompts..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full"
                    />
                </div>
                <Select
                    value={searchType}
                    onValueChange={(value: string) =>
                        setSearchType(value as "semantic" | "text")
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Search type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="semantic">Semantic Search</SelectItem>
                        <SelectItem value="text">Text Search</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-4">
                <Select
                    value={filters.category || ""}
                    onValueChange={(value: string) =>
                        handleFilterChange("category", value || null)
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="coding">Coding</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="analysis">Analysis</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.model || ""}
                    onValueChange={(value: string) =>
                        handleFilterChange("model", value || null)
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All Models</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="claude-3-5-sonnet-20241022">Claude</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex gap-2">
                    <Button
                        variant={sort.field === "relevance" ? "default" : "outline"}
                        onClick={() => handleSortChange("relevance")}
                    >
                        Relevance{" "}
                        {sort.field === "relevance" && (sort.direction === "desc" ? "↓" : "↑")}
                    </Button>
                    <Button
                        variant={sort.field === "createdAt" ? "default" : "outline"}
                        onClick={() => handleSortChange("createdAt")}
                    >
                        Date{" "}
                        {sort.field === "createdAt" && (sort.direction === "desc" ? "↓" : "↑")}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : results.length > 0 ? (
                    <>
                        {results.map((result) => (
                            <Link key={result.id} href={`/prompts/${result.id}`}>
                                <Card className="hover:border-primary/50 transition-colors">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>{result.name}</CardTitle>
                                            <div className="text-sm text-muted-foreground">
                                                Score: {result.score.toFixed(2)}
                                            </div>
                                        </div>
                                        <CardDescription>{result.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="font-mono text-sm line-clamp-2">
                                                {result.content}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {result.tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {result.category} • {result.model} •{" "}
                                                {new Date(result.updatedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}

                        <div className="flex justify-center gap-2 mt-4">
                            <Button
                                variant="outline"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    Page {page} of {totalPages} • {totalResults} results
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </>
                ) : (
                    query && (
                        <div className="text-center py-8 text-muted-foreground">
                            No results found
                        </div>
                    )
                )}
            </div>
        </div>
    )
} 