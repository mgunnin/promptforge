import { ImportDialog } from "@/components/import-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authOptions } from "@/lib/auth"
import { Beaker, FileText, Plus } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Create, manage, and optimize your AI prompts
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Create Prompt</CardTitle>
            <CardDescription>
              Create a new prompt with AI-powered optimization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/prompts/new">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Import Prompts</CardTitle>
            <CardDescription>
              Import prompts from JSON, CSV, or TXT files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImportDialog />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Environment</CardTitle>
            <CardDescription>
              Try out prompts with different models and parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/test">
              <Button variant="outline" className="w-full">
                <Beaker className="mr-2 h-4 w-4" />
                Open Playground
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browse Prompts</CardTitle>
            <CardDescription>
              View and manage your prompt collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/prompts">
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                View All
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
