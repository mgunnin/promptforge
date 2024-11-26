"use client"

import { cn } from "@/lib/utils"
import { FileText, Plus, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MainNav() {
    const pathname = usePathname()

    return (
        <div className="mr-4 flex items-center space-x-4 lg:space-x-6">
            <Link
                href="/"
                className="flex items-center space-x-2 font-bold text-xl"
            >
                <span className="hidden sm:inline">PromptForge</span>
            </Link>
            <nav className="flex items-center space-x-4 lg:space-x-6">
                <Link
                    href="/prompts"
                    className={cn(
                        "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                        pathname === "/prompts"
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    <FileText className="h-4 w-4" />
                    <span>Prompts</span>
                </Link>
                <Link
                    href="/prompts/search"
                    className={cn(
                        "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                        pathname === "/prompts/search"
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                </Link>
                <Link
                    href="/prompts/new"
                    className={cn(
                        "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                        pathname === "/prompts/new"
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    <Plus className="h-4 w-4" />
                    <span>Create</span>
                </Link>
            </nav>
        </div>
    )
}
