'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import { Session } from 'next-auth'

interface AuthContextType {
  session: Session | null
  loading: boolean
  isAuthenticated: boolean
  user: Session['user'] | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false)
    }
  }, [status])

  const value = {
    session,
    loading,
    isAuthenticated: !!session,
    user: session?.user || null,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  )
}
