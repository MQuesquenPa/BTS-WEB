import type { MetaDescriptor } from 'react-router'
import { DEFAULT_DESCRIPTION, SITE_NAME } from '@/constants/site'

// Only set when VITE_SITE_URL is configured (see .env.example) — we never fabricate
// a domain. Without it, canonical/og:url are simply omitted rather than pointing at
// localhost or an invented address.
const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '')

interface BuildMetaArgs {
  /** Final page title, already combined with the site name (see pageTitle helper). */
  title: string
  description?: string
  /** Route path starting with "/", used to build the canonical + og:url when SITE_URL is known. */
  path: string
  /** Explicit robots directive for pages with no public search value. */
  robots?: 'noindex, follow' | 'noindex'
}

export function buildMeta({ title, description = DEFAULT_DESCRIPTION, path, robots }: BuildMetaArgs): MetaDescriptor[] {
  const canonical = SITE_URL ? `${SITE_URL}${path}` : undefined

  const descriptors: MetaDescriptor[] = [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:locale', content: 'es_PE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ]

  if (canonical) {
    descriptors.push({ tagName: 'link', rel: 'canonical', href: canonical })
    descriptors.push({ property: 'og:url', content: canonical })
  }

  if (robots) {
    descriptors.push({ name: 'robots', content: robots })
  }

  return descriptors
}
