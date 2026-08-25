import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function MembersPage() {
  return (
    <>
      <Seo
        title={pageTitle('Members')}
        description="Conoce a los siete integrantes de BTS y descubre la colección Purple Wave inspirada en cada uno."
        path={ROUTES.members}
      />
      <PagePlaceholder
        title="MEET THE SEVEN"
        description="La grilla editorial de los siete integrantes llega en la Fase 7."
      />
    </>
  )
}
