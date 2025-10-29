import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const start = Date.now()
  const response = NextResponse.next()

  // Add response time header
  const duration = Date.now() - start
  response.headers.set('X-Response-Time', `${duration}ms`)

  // Log slow requests in production for monitoring
  if (duration > 1000 && process.env.NODE_ENV === 'production') {
    console.warn(`[PERFORMANCE] Slow request: ${request.url} took ${duration}ms`)
  }

  // Add security headers (additional layer beyond next.config.mjs)
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

  return response
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
