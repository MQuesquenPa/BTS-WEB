import { create } from 'zustand'
import type { CartItem } from '@/types/cart'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  itemCount: () => number
}

function sameLine(a: CartItem, b: Pick<CartItem, 'productId' | 'size' | 'color'>) {
  return a.productId === b.productId && a.size === b.size && a.color === b.color
}

// In-memory only for now — see wishlistStore.ts for why persistence waits for Fase 11.
export const useCartStore = create<CartState>((set, get) => ({
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
  itemCount: () => get().items.reduce((total, line) => total + line.quantity, 0),
}))
