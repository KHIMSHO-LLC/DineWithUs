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

    // Get current user from database
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        needsRoleSelection: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      user: user,
      session: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        needsRoleSelection: session.user.needsRoleSelection
      }
    })

  } catch (error) {
    console.error('Error fetching current user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
