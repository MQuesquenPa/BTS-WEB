import { Outlet } from 'react-router-dom'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export function Layout() {
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
