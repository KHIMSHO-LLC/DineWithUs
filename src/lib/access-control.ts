import { Session } from "next-auth"

export function canBookDinners(session: Session | null): boolean {
  // Only guests can book dinners
  return session?.user?.role === 'guest'
}

export function canCreateDinners(session: Session | null): boolean {
  // Only hosts can create dinners
  return session?.user?.role === 'host'
}

export function getAccessDeniedMessage(session: Session | null): string {
  if (session?.user?.role === 'host') {
    return "Host accounts cannot book dinners. Switch to a guest account to make bookings."
  }
  return "You must be logged in as a guest to book dinners."
}

export function canAccessHostDashboard(session: Session | null): boolean {
  // Only hosts can access the host dashboard
  return session?.user?.role === 'host'
}

export function getAccessDeniedMessageForHostDashboard(session: Session | null): string {
  if (session?.user?.role === 'guest') {
    return "Guest accounts cannot access the host dashboard. Switch to a host account or sign up as a host."
  }
  return "You must be logged in as a host to access the dashboard."
}

export function getRoleBasedRedirect(session: Session | null): string {
  if (session?.user?.role === 'host') {
    return '/host/dashboard'
  }
  return '/auth/signin'
}
