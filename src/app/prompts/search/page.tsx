import { PromptSearch } from "@/components/prompt-search"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function SearchPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        redirect("/login")
    }

    return (
        <div className="container py-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Search Prompts</h2>
                <p className="text-muted-foreground">
                    Find prompts using semantic or text-based search
                </p>
            </div>

            <PromptSearch />
        </div>
    )
} 