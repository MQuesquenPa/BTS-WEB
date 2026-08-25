import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/AppRouter'
import '@/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element "#root" not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
)
