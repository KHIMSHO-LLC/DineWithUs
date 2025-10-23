import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // For now, we'll use mock data. Later this will be replaced with actual database queries
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      // Initial sign in
      if (user) {
        token.role = user.role
        token.id = user.id
        console.log('JWT Callback - Initial sign in, user role:', user.role)
      }
      
      // Always fetch the user's role from the database if we have an email
      if (token.email) {
        try {
          console.log('JWT Callback - Fetching role from DB for email:', token.email)
          const dbUser = await prisma.user.findUnique({
            where: {
              email: token.email
            },
            select: {
              role: true,
              id: true,
              needsRoleSelection: true
            }
          })
          
          if (dbUser) {
            console.log('JWT Callback - Setting role from DB:', dbUser.role, 'needsRoleSelection:', dbUser.needsRoleSelection)
            token.role = dbUser.role
            token.id = dbUser.id
            token.needsRoleSelection = dbUser.needsRoleSelection
          } else {
            console.log('JWT Callback - User not found in database for email:', token.email)
          }
        } catch (error) {
          console.error('Error fetching user role:', error)
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.needsRoleSelection = token.needsRoleSelection as boolean
        console.log('Session Callback - Setting user role:', token.role, 'needsRoleSelection:', token.needsRoleSelection)
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          console.log('SignIn Callback - Google OAuth for user:', user.email)
          
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email!
            }
          })

          if (!existingUser) {
            // Create new user with temporary role
            console.log('SignIn Callback - Creating new user with temporary role')
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name!,
                image: user.image,
                role: 'guest', // Temporary role - will be updated after role selection
                emailVerified: new Date(),
                needsRoleSelection: true, // Flag to indicate role selection needed
              }
            })
          } else {
            console.log('SignIn Callback - Existing user found with role:', existingUser.role)
          }

          return true
        } catch (error) {
          console.error('Google sign-in error:', error)
          return false
        }
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      // Handle auth callback redirects - always go to callback page first
      if (url === `${baseUrl}/auth/callback` || url.includes('/auth/callback')) {
        return url
      }
      
      // For Google OAuth, redirect to callback page to handle role selection
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/auth/callback`
      }
      
      // If it's a relative URL, make it absolute
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // If it's the same origin, allow it
      else if (new URL(url).origin === baseUrl) return url
      
      // Default to callback page for new users
      return `${baseUrl}/auth/callback`
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}
