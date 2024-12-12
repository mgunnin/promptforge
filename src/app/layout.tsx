import { MainNav } from "@/components/main-nav"
import { SessionProvider } from "@/components/session-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { UserNav } from "@/components/user-nav"
import { PromptProvider } from "@/contexts/prompt-context"
import { authOptions } from "@/lib/auth"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import "./globals.css"

export const metadata: Metadata = {
  title: "PromptForge",
  description: "Modern prompt management application for AI development",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background" suppressHydrationWarning>
        <PromptProvider>
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative flex min-h-screen flex-col">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="container flex h-14 items-center px-8">
                    <MainNav />
                    <div className="ml-auto flex items-center space-x-4">
                      <UserNav />
                    </div>
                  </div>
                </header>
                <main className="flex-1 px-8">{children}</main>
              </div>
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </PromptProvider>
      </body>
    </html>
  )
}
