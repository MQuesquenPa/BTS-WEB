import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { CartItem } from '@/types/cart'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (line: Pick<CartItem, 'productId' | 'size' | 'color'>) => void
  updateQuantity: (line: Pick<CartItem, 'productId' | 'size' | 'color'>, quantity: number) => void
  itemCount: () => number
}

function sameLine(a: CartItem, b: Pick<CartItem, 'productId' | 'size' | 'color'>) {
  return a.productId === b.productId && a.size === b.size && a.color === b.color
}

// See wishlistStore.ts for why `skipHydration` + a manual `rehydrate()` call
// (in Layout, on mount) is required to keep this hydration-safe.
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((line) => sameLine(line, item))
          if (existing) {
            return {
              items: state.items.map((line) =>
                sameLine(line, item) ? { ...line, quantity: line.quantity + item.quantity } : line,
              ),
            }
          }
          return { items: [...state.items, item] }
        })
      },
      removeItem: (line) => {
        set((state) => ({ items: state.items.filter((item) => !sameLine(item, line)) }))
      },
      updateQuantity: (line, quantity) => {
        set((state) => ({
          items:
            quantity > 0
              ? state.items.map((item) => (sameLine(item, line) ? { ...item, quantity } : item))
              : state.items.filter((item) => !sameLine(item, line)),
        }))
      },
      itemCount: () => get().items.reduce((total, line) => total + line.quantity, 0),
    }),
    {
      name: 'purple-wave-cart',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
)
