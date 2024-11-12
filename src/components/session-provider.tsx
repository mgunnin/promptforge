"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

interface SessionProviderProps {
    children: React.ReactNode
    session: any // NextAuth doesn't export the session type properly
}

export function SessionProvider({ children, session }: SessionProviderProps) {
    return (
        <NextAuthSessionProvider session={session}>
            {children}
        </NextAuthSessionProvider>
    )
}
