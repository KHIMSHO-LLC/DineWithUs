import { Session } from "next-auth"

export function getRedirectUrl(session: Session | null): string {
  if (!session?.user) {
    return '/'
  }

  // Redirect hosts to their dashboard
  if (session.user.role === 'host') {
    return '/host/dashboard'
  }

  // Redirect guests to home page
  return '/'
}

export function shouldRedirectToDashboard(session: Session | null): boolean {
  return session?.user?.role === 'host'
}
