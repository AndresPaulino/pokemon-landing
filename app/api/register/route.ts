// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create a fresh Supabase client specifically for this API route
// with explicit schema targeting to avoid NextAuth conflicts
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'  // Explicitly use public schema
  }
})

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists in our custom auth_users table
    // Use .from() with explicit table name to avoid any schema confusion
    const { data: existingUser, error: checkError } = await supabase
      .from('auth_users')
      .select('email')
      .eq('email', email)
      .maybeSingle()  // Use maybeSingle() instead of single() to avoid errors when no record found

    // If checkError is not null and it's not a "not found" error, return error
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Check user error:', checkError)
      return NextResponse.json(
        { error: 'Failed to check existing user' },
        { status: 500 }
      )
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user in our custom auth_users table
    // Use explicit insert with proper error handling
    const { data: newUser, error: insertError } = await supabase
      .from('auth_users')
      .insert([{  // Wrap in array to be explicit about insert format
        name: `${firstName} ${lastName}`,
        email: email,
        password: hashedPassword
      }])
      .select()
      .single()

    if (insertError) {
      console.error('User creation error:', insertError)
      return NextResponse.json(
        { error: 'Failed to create user: ' + insertError.message },
        { status: 500 }
      )
    }

    // Return success (don't include password in response)
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}