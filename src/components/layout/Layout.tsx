import { Outlet } from 'react-router'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

// Default export required: this file is referenced directly as a route module
// (see routes.ts) and React Router Framework Mode renders a route's component
// from its default export.
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
