import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user needs role selection
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      select: {
        needsRoleSelection: true,
        role: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      needsRoleSelection: user.needsRoleSelection || false,
      currentRole: user.role
    })

  } catch (error) {
    console.error('Error checking role selection:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
