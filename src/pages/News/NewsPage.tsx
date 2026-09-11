import type { MetaFunction } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

// News is paused for the MVP (Fase 10) — noindex while it's unlinked and out
// of sitemap.xml (see PUBLIC_STATIC_ROUTES). Not deleted, not redirected.
export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Bangtan News'),
    description: 'Últimas noticias sobre BTS, el tour por Lima y la comunidad ARMY Perú.',
    path: ROUTES.news,
    robots: 'noindex, follow',
  })

export default function NewsPage() {
  return (
    <PagePlaceholder title="BANGTAN NEWS" description="Filtros por categoría y grilla de artículos llegan en la Fase 9." />
  )
}
