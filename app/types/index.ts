export interface Order {
    id: string;
    user_id: string;
    stripe_payment_intent_id: string;
    pokemon_name: string;
    card_type: string;
    element: string;
    hp: string;
    rarity: string;
    status: 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled';
    total_amount: number;
    use_ai: boolean;
    ai_prompt?: string;
    personal_message?: string;
    created_at: string;
    updated_at: string;
    order_images?: OrderImage[];
    order_moves?: OrderMove[];
    order_admin_notes?: OrderAdminNote[];
  }
  
  export interface OrderImage {
    id: string;
    order_id: string;
    image_url: string;
    image_type: 'reference' | 'final';
    created_at: string;
  }
  
  export interface OrderMove {
    id: string;
    order_id: string;
    move_name: string;
    damage?: string;
    description?: string;
    move_order: number;
    created_at: string;
  }
  
  export interface OrderAdminNote {
    id: string;
    order_id: string;
    admin_user_id: string;
    note: string;
    created_at: string;
  }
  
  export interface OrderData {
    cardType: string;
    element: string;
    pokemonName: string;
    hp: string;
    moves: Array<{ name: string; damage: string; description: string }>;
    rarity: string;
    image: File | null;
    useAI: boolean;
    aiPrompt: string;
    personalMessage: string;
  }