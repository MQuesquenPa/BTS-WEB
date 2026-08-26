import type { MetaFunction } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Bangtan News'),
    description: 'Últimas noticias sobre BTS, el tour por Lima y la comunidad ARMY Perú.',
    path: ROUTES.news,
  })

export default function NewsPage() {
  return (
    <PagePlaceholder title="BANGTAN NEWS" description="Filtros por categoría y grilla de artículos llegan en la Fase 9." />
  )
}
