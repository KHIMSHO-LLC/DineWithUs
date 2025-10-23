import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      needsRoleSelection?: boolean
    } & DefaultSession['user']
  }

  interface User {
    role: string
    needsRoleSelection?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    id: string
    needsRoleSelection?: boolean
  }
}
