"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
    {
        href: "/prompts",
        label: "Prompts",
    },
    {
        href: "/prompts/new",
        label: "Create",
    },
]

export function MainNav() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center space-x-4 lg:space-x-6">
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href
                            ? "text-foreground"
                            : "text-muted-foreground"
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}
