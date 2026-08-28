import { create } from 'zustand'

interface ToastState {
  id: number
  message: string | null
  showToast: (message: string) => void
  dismissToast: (id: number) => void
}

// Truly global, cross-cutting UI feedback (triggered from ProductCard, QuickView,
// eventually the cart page) — the kind of state that justifies a store on its own.
export const useToastStore = create<ToastState>((set) => ({
  id: 0,
  message: null,
  showToast: (message) => set((state) => ({ message, id: state.id + 1 })),
  dismissToast: (id) => set((state) => (state.id === id ? { message: null } : {})),
}))
