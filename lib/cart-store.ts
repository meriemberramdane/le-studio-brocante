import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from './supabase'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity: number) => {
        const items = get().items
        const existingItem = items.find((item) => item.product_id === product.id)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product_id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
        } else {
          set({
            items: [...items, { product_id: product.id, quantity, product }],
          })
        }
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.product_id !== productId),
        })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
        } else {
          set({
            items: get().items.map((item) =>
              item.product_id === productId ? { ...item, quantity } : item
            ),
          })
        }
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.product?.price || 0) * item.quantity
        }, 0)
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'brocante-cart',
      skipHydration: true,
    }
  )
)
