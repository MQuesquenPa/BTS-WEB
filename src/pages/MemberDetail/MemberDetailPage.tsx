import type { MetaFunction } from 'react-router'
import { useParams } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = ({ params }) =>
  buildMeta({
    title: pageTitle('Member'),
    description: 'Perfil de integrante: biografía, colección relacionada y noticias asociadas.',
    path: ROUTES.memberDetail(params.slug ?? ''),
  })

export default function MemberDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()

  return (
    <PagePlaceholder
      title="MEMBER DETAIL"
      description="Bio, colección relacionada y navegación entre integrantes llegan en la Fase 7."
      meta={`slug: ${slug}`}
    />
  )
}
