import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface WishlistState {
  productIds: string[]
  toggleWishlist: (productId: string) => boolean
  isWishlisted: (productId: string) => boolean
}

// Persisted to localStorage, but hydration is deferred: `skipHydration` stops
// the persist middleware from reading localStorage at store-creation time.
// Layout calls `useWishlistStore.persist.rehydrate()` once, client-side,
// after mount — so both the prerendered HTML and the very first client
// render start from this empty default (no hydration mismatch), and the
// real saved wishlist replaces it a tick later. Same pattern as
// useCountdown deferring its real value to an effect.
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: 'purple-wave-wishlist',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
)
