import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add CORS headers for API routes
    if (req.nextUrl.pathname.startsWith("/api/")) {
      const response = NextResponse.next()
      response.headers.append("Access-Control-Allow-Origin", "*")
      response.headers.append(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      )
      response.headers.append(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      )
      return response
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/prompts/:path*",
    "/settings/:path*",
    "/api/v1/:path*",
    "/api/auth/register",
  ],
}
