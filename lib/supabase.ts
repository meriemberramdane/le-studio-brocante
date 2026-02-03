import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions
export interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  condition: string
  dimensions?: string
  stock_status: 'available' | 'sold'
  images: string[]
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  full_name: string
  email: string
  phone: string
  city: string
  address: string
  notes?: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'completed'
  created_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  price: number
  quantity: number
}

export interface CartItem {
  product_id: string
  quantity: number
  product?: Product
}
