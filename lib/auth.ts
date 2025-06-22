// lib/auth.ts (final version with both email/password and Google OAuth)
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create Supabase client for our custom authentication
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
  // Don't use SupabaseAdapter - we'll handle user management manually
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
          // Query our custom auth_users table for email/password users
          const { data: user, error } = await supabase
            .from('auth_users')
            .select('*')
            .eq('email', credentials.email)
            .single()

          if (error || !user) {
            return null
          }

          // Verify the password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

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
          console.error('Credentials authentication error:', error)
          return null
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google OAuth users
      if (account?.provider === 'google' && profile?.email) {
        try {
          // Check if user already exists in our auth_users table
          const { data: existingUser, error: checkError } = await supabase
            .from('auth_users')
            .select('*')
            .eq('email', profile.email)
            .maybeSingle()

          if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking existing Google user:', checkError)
            return false
          }

          if (!existingUser) {
            // Create new user for Google OAuth
            const { data: newUser, error: insertError } = await supabase
              .from('auth_users')
              .insert([{
                name: profile.name || user.name || 'Google User',
                email: profile.email,
                password: '', // Empty password for OAuth users
                image: profile.picture || user.image,
                email_verified: new Date().toISOString(),
                provider: 'google'
              }])
              .select()
              .single()

            if (insertError) {
              console.error('Error creating Google user:', insertError)
              return false
            }

            // Update the user object with our database ID
            user.id = newUser.id
          } else {
            // Use existing user's ID
            user.id = existingUser.id
          }
        } catch (error) {
          console.error('Google sign-in error:', error)
          return false
        }
      }

      return true
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user, account }) {
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