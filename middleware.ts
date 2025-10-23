import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Define protected routes
        const { pathname } = req.nextUrl
        
        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/search',
          '/dinners/[id]',
          '/auth/signin',
          '/auth/signup',
          '/auth/error',
          '/auth/forgot-password',
          '/terms',
          '/privacy',
          '/help',
          '/about'
        ]
        
        // Check if the current path is public
        const isPublicRoute = publicRoutes.some(route => {
          if (route.includes('[id]')) {
            // Handle dynamic routes like /dinners/[id]
            return pathname.startsWith(route.replace('[id]', ''))
          }
          return pathname === route
        })
        
        // If it's a public route, allow access
        if (isPublicRoute) {
          return true
        }
        
        // For protected routes, check if user is authenticated
        return !!token
      },
    },
  }
)

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (static assets)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|assets).*)',
  ],
}
