import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from './supabase'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const items = get().items

        const alreadyExists = items.some(
          (item) => item.product_id === product.id
        )

        if (alreadyExists) return

        set({
          items: [
            ...items,
            {
              product_id: product.id,
              product,
            },
          ],
        })
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter(
            (item) => item.product_id !== productId
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.product?.price || 0)
        }, 0)
      },

      getItemCount: () => {
        return get().items.length
      },
    }),
    {
      name: 'brocante-cart',
      skipHydration: true,
    }
  )
)