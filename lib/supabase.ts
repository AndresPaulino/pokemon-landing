// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// For client-side usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For client components with auth
export const createSupabaseClient = () => createClientComponentClient()

// Database types
export interface Order {
  id: string
  user_id: string
  stripe_payment_intent_id?: string
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled'
  card_type: string
  element: string
  pokemon_name: string
  hp: string
  rarity: string
  personal_message?: string
  use_ai: boolean
  ai_prompt?: string
  total_amount: number
  created_at: string
  updated_at: string
}

export interface OrderMove {
  id: string
  order_id: string
  name: string
  damage: string
  description?: string
  move_order: number
  created_at: string
}

export interface OrderImage {
  id: string
  order_id: string
  file_path: string
  file_name: string
  file_size?: number
  created_at: string
}