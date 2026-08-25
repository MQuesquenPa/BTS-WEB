import { Helmet } from 'react-helmet-async'
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '@/constants/site'

interface SeoProps {
  /** Final page title, already combined with the site name (see pageTitle helper). */
  title: string
  description?: string
  /** Route path starting with "/", used to build the canonical + og:url. */
  path?: string
  noIndex?: boolean
}

export function Seo({ title, description = DEFAULT_DESCRIPTION, path = '/', noIndex = false }: SeoProps) {
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="es_PE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
    </Helmet>
  )
}
