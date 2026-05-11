import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE_NAME } from './lib/auth-cookie'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-schoolai-pathname', request.nextUrl.pathname)

  const userId = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/chat') || pathname.startsWith('/teacher')) {
    if (!userId) {
      const login = new URL('/login', request.url)
      login.searchParams.set('next', pathname)
      return NextResponse.redirect(login)
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders }
  })
}

export const config = {
  matcher: ['/chat', '/chat/:path*', '/teacher', '/teacher/:path*']
}
