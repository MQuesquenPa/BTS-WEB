import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { SITE_NAME } from '@/constants/site'
import '@/index.css'

// Site-wide structured data: describes the site itself, present on every page.
// No Organization schema yet — we don't have a real address/phone/social profile
// to attach without inventing data (see Fase 2.5 report).
const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  inLanguage: 'es-PE',
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#08080B" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+KR:wght@500&display=swap"
          rel="stylesheet"
        />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }} />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}
