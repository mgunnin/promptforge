import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AuthService } from "@/lib/services/auth.service"
import { ApiKeyList } from "@/components/api-key-list"

interface ApiKeyWithDates {
    id: string
    name: string
    key: string
    createdAt: Date
    lastUsed: Date | null
    expiresAt: Date | null
}

function formatDate(date: Date | null): string {
    if (!date) return ""
    return date.toISOString()
}

function transformApiKeys(keys: ApiKeyWithDates[]) {
    return keys.map(key => ({
        ...key,
        createdAt: formatDate(key.createdAt),
        lastUsed: formatDate(key.lastUsed),
        expiresAt: formatDate(key.expiresAt),
    }))
}

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        redirect("/login")
    }

    const apiKeys = await AuthService.listApiKeys(session.user.id)
    const formattedKeys = transformApiKeys(apiKeys)

    return (
        <div className="container py-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your account settings and API keys
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                <div className="space-y-6">
                    <div className="text-lg font-semibold">API Access</div>
                    <ApiKeyList initialKeys={formattedKeys} />
                </div>

                <div className="space-y-6">
                    <div className="text-lg font-semibold">Account Settings</div>
                    <div className="rounded-lg border bg-card">
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            readOnly
                                            value={session.user.email || ""}
                                            className="w-full px-3 py-2 bg-muted border rounded-md text-muted-foreground"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Name</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            readOnly
                                            value={session.user.name || ""}
                                            className="w-full px-3 py-2 bg-muted border rounded-md text-muted-foreground"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="text-lg font-semibold">Usage & Billing</div>
                    <div className="rounded-lg border bg-card">
                        <div className="p-6">
                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        API Requests
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">0</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Active Prompts
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">0</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Team Members
                                    </div>
                                    <div className="mt-1 text-2xl font-bold">1</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
