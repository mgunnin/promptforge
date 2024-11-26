import { TestEnvironment } from "@/components/test-environment"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function TestPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        redirect("/login")
    }

    return (
        <div className="container py-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Test Environment</h2>
                <p className="text-muted-foreground">
                    Test your prompts with different models and parameters
                </p>
            </div>

            <TestEnvironment userId={session.user.id} />
        </div>
    )
} 