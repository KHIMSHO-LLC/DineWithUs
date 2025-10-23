'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { getRedirectUrl } from '@/lib/auth-utils'

export default function AuthCallbackPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [checkingRole, setCheckingRole] = useState(false)

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

    if (session) {
      // Check if this is a new Google OAuth user who needs role selection
      checkUserRoleSelection()
    }
  }, [session, status, router])

  const checkUserRoleSelection = () => {
    setCheckingRole(true)
    
    // Check if user needs role selection directly from session
    if (session?.user?.needsRoleSelection) {
      console.log('User needs role selection, redirecting to role selection page')
      router.push('/auth/role-selection')
    } else {
      console.log('User role already set, redirecting normally')
      // Existing user or role already selected, redirect normally
      const redirectUrl = getRedirectUrl(session!)
      router.push(redirectUrl)
    }
    
    setCheckingRole(false)
  }

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">
          {checkingRole ? 'Setting up your account...' : 'Redirecting...'}
        </p>
      </div>
    </div>
  )
}
