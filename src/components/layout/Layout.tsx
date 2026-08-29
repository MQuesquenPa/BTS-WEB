import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Toast } from '@/components/common/Toast'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

// Default export required: this file is referenced directly as a route module
// (see routes.ts) and React Router Framework Mode renders a route's component
// from its default export.
export default function Layout() {
  // Both stores are created with `skipHydration: true` (see cartStore.ts /
  // wishlistStore.ts) — this is where the deferred, client-only read of
  // localStorage actually happens, once, after mount.
  useEffect(() => {
    const rehydrate = () => {
      useCartStore.persist.rehydrate()
      useWishlistStore.persist.rehydrate()
    }
    rehydrate()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  )
}
