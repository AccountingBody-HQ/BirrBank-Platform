import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'Wolega@888'

// Routes that must remain publicly accessible
const PUBLIC_PATHS = ['/admin-login', '/api/admin-auth', '/api/admin-logout']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip public paths
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) return NextResponse.next()

  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi  = pathname.startsWith('/api/admin-')

  if (!isAdminPage && !isAdminApi) return NextResponse.next()

  const token = req.cookies.get('admin_token')?.value

  if (token !== ADMIN_SECRET) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const url = req.nextUrl.clone()
    url.pathname = '/admin-login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin-:path*',
  ],
}
