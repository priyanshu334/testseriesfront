// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of paths that don't require authentication
const publicPaths = ['/login', '/signup', '/forgot-password']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('authToken')?.value

  // If it's a public path, don't do anything
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // If there's no token and it's not a public path, redirect to login
  if (!token && !publicPaths.includes(pathname)) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Otherwise, continue with the request
  return NextResponse.next()
}

// Specify the paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}