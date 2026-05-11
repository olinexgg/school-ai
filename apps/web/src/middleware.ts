import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROLE_COOKIE_NAME, SESSION_COOKIE_NAME } from './lib/auth-cookie'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-schoolai-pathname', request.nextUrl.pathname)

  const userId = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/teacher') && !pathname.startsWith('/teacher/unlock')) {
    const role = request.cookies.get(ROLE_COOKIE_NAME)?.value
    if (role === 'STUDENT') {
      return NextResponse.redirect(new URL('/chat', request.url))
    }
  }

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
