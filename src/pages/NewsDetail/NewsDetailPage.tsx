import type { MetaFunction } from 'react-router'
import { useParams } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

// News is paused for the MVP (Fase 10) — see NewsPage.tsx.
export const meta: MetaFunction = ({ params }) =>
  buildMeta({
    title: pageTitle('Noticia'),
    description: 'Artículo de Bangtan News: contexto, cuerpo de la nota y fuente.',
    path: ROUTES.newsDetail(params.slug ?? ''),
    robots: 'noindex, follow',
  })

export default function NewsDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()

  return (
    <PagePlaceholder
      title="NEWS DETAIL"
      description="Artículo completo, fuente y noticias relacionadas llegan en la Fase 9."
      meta={`slug: ${slug}`}
    />
  )
}
