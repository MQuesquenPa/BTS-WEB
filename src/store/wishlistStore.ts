import { create } from 'zustand'

interface WishlistState {
  productIds: string[]
  toggleWishlist: (productId: string) => boolean
  isWishlisted: (productId: string) => boolean
}

// No localStorage persistence yet: it's deferred to Fase 11 so the store stays
// safe to import from server-rendered-at-build (prerender) code — reading
// localStorage during that pass would crash the build, and gating it behind
// `typeof window` would make the first client render diverge from the
// prerendered HTML (hydration mismatch). In-memory only for now.
export const useWishlistStore = create<WishlistState>((set, get) => ({
  productIds: [],
  toggleWishlist: (productId) => {
    const isAdding = !get().productIds.includes(productId)
    set((state) => ({
      productIds: isAdding
        ? [...state.productIds, productId]
        : state.productIds.filter((id) => id !== productId),
    }))
    return isAdding
  },
  isWishlisted: (productId) => get().productIds.includes(productId),
}))
