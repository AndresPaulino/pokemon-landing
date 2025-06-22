// lib/auth.ts (simplified version for debugging)
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create a simple Supabase client for credentials authentication only
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
})

export const authOptions: NextAuthOptions = {
  // Temporarily remove the SupabaseAdapter to avoid conflicts
  // adapter: SupabaseAdapter({
  //   url: supabaseUrl,
  //   secret: supabaseServiceRoleKey,
  // }),
  providers: [
    // Temporarily disable Google provider to isolate the issue
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
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
          console.log('Attempting to authenticate user:', credentials.email)
          
          // Query our custom auth_users table
          const { data: user, error } = await supabase
            .from('auth_users')
            .select('*')
            .eq('email', credentials.email)
            .single()

          console.log('Database query result:', { user: user ? 'found' : 'not found', error })

          if (error || !user) {
            console.log('User not found or error:', error)
            return null
          }

          // Verify the password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          console.log('Password validation:', isPasswordValid)

          if (!isPasswordValid) {
            return null
          }

          // Return user object (without password)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image || null,
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/api/auth/signout',
  },
}