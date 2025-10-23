'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { canBookDinners, getAccessDeniedMessage, getRoleBasedRedirect } from '../../lib/access-control'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'

interface BookingGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function BookingGuard({ children, fallback }: BookingGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') {
      // Still loading session
      return
    }

    if (status === 'unauthenticated') {
      // Not authenticated, redirect to sign-in
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated' && session && !canBookDinners(session)) {
      // User is authenticated but cannot book (host account)
      // Redirect to appropriate page
      const redirectUrl = getRoleBasedRedirect(session)
      router.push(redirectUrl)
    }
  }, [session, status, router])

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show fallback if user cannot book
  if (session && !canBookDinners(session)) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              {getAccessDeniedMessage(session)}
            </AlertDescription>
          </Alert>
          <div className="mt-6 text-center">
            <Button 
              onClick={() => router.push(getRoleBasedRedirect(session))}
              variant="outline"
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Show children if user is authenticated and can book
  if (status === 'authenticated' && session && canBookDinners(session)) {
    return <>{children}</>
  }

  // If not authenticated, show loading (will redirect in useEffect)
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  // Fallback for any other case
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
