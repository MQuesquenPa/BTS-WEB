import { useParams } from 'react-router-dom'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function MemberDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()

  return (
    <>
      <Seo
        title={pageTitle('Member')}
        description="Perfil de integrante: biografía, colección relacionada y noticias asociadas."
        path={ROUTES.memberDetail(slug)}
      />
      <PagePlaceholder
        title="MEMBER DETAIL"
        description="Bio, colección relacionada y navegación entre integrantes llegan en la Fase 7."
        meta={`slug: ${slug}`}
      />
    </>
  )
}
