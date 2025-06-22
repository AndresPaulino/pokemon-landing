import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Remove the invalid apiVersion - let the SDK use its default compatible version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion will be automatically set to the version compatible with stripe-node v18.2.1
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      cardType,
      element,
      pokemonName,
      hp,
      moves,
      rarity,
      personalMessage,
      useAI,
      aiPrompt,
      imageFile
    } = body

    // Calculate total amount (in cents)
    const basePrice = 3498 // $34.98
    const aiPrice = 999 // $9.99
    const totalAmount = basePrice + (useAI ? aiPrice : 0)

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      metadata: {
        user_id: session.user.id,
        pokemon_name: pokemonName,
        card_type: cardType,
      },
    })

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: session.user.id,
        stripe_payment_intent_id: paymentIntent.id,
        card_type: cardType,
        element,
        pokemon_name: pokemonName,
        hp,
        rarity,
        personal_message: personalMessage,
        use_ai: useAI,
        ai_prompt: aiPrompt,
        total_amount: totalAmount,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Insert moves (if any)
    if (moves && moves.length > 0) {
      const movesData = moves.map((move: any, index: number) => ({
        order_id: order.id,
        move_name: move.name,
        damage: move.damage,
        description: move.description,
        move_order: index
      }))

      const { error: movesError } = await supabase
        .from('order_moves')
        .insert(movesData)

      if (movesError) {
        console.error('Moves insertion error:', movesError)
      }
    }

    // Handle image upload if provided
    if (imageFile) {
      // Note: This assumes imageFile is a base64 string or file data
      // You'll need to implement the actual file upload logic based on your frontend
      const { error: imageError } = await supabase
        .from('order_images')
        .insert({
          order_id: order.id,
          image_url: imageFile, // This should be the uploaded file URL
          image_type: 'reference'
        })

      if (imageError) {
        console.error('Image insertion error:', imageError)
      }
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id
    })

  } catch (error) {
    console.error('Order API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_images (*)
      `)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Orders fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }

    return NextResponse.json({ orders })

  } catch (error) {
    console.error('Orders GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}