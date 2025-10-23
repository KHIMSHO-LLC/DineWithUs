import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { role } = await request.json()
    
    if (!role || !['guest', 'host'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Update user role in database
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        role: role,
        needsRoleSelection: false // Clear the flag after role selection
      }
    })

    return NextResponse.json({ 
      success: true, 
      role: updatedUser.role 
    })

  } catch (error) {
    console.error('Error updating user role:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
