'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, ChefHat, ArrowRight } from 'lucide-react'

export default function RoleSelectionPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // If user is not authenticated, redirect to sign-in
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
    
    // If user already has a role, redirect to appropriate page
    if (session?.user?.role && session.user.role !== 'guest') {
      router.push(session.user.role === 'host' ? '/host/dashboard' : '/')
    }
  }, [session, status, router])

  const handleRoleSelection = async (role: 'guest' | 'host') => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      })

      if (response.ok) {
        // Force a complete page refresh to get updated session
        if (role === 'host') {
          window.location.href = '/host/dashboard'
        } else {
          window.location.href = '/'
        }
      } else {
        console.error('Failed to update role')
        setLoading(false)
      }
    } catch (error) {
      console.error('Error updating role:', error)
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!session) {
    return null
  }

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Welcome to DineWithUs!
            </h1>
            <p className="text-lg text-muted-foreground">
              Please choose how you'd like to use our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guest Option */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">I'm a Guest</CardTitle>
                <CardDescription>
                  I want to discover and book amazing dining experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• Browse unique dining experiences</li>
                  <li>• Book meals with local hosts</li>
                  <li>• Leave reviews and ratings</li>
                  <li>• Save favorite experiences</li>
                </ul>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleRoleSelection('guest')}
                  disabled={loading}
                >
                  Continue as Guest
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Host Option */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-8 h-8 text-primary-600" />
                </div>
                <CardTitle className="text-xl">I'm a Host</CardTitle>
                <CardDescription>
                  I want to share my culinary skills and earn money
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• Create dining experiences</li>
                  <li>• Host guests in your home</li>
                  <li>• Earn money from bookings</li>
                  <li>• Build your culinary reputation</li>
                </ul>
                <Button 
                  className="w-full bg-primary-600 hover:bg-primary-700" 
                  onClick={() => handleRoleSelection('host')}
                  disabled={loading}
                >
                  Continue as Host
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Don't worry, you can always change your role later in your account settings.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
