import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function NewsPage() {
  return (
    <>
      <Seo
        title={pageTitle('Bangtan News')}
        description="Últimas noticias sobre BTS, el tour por Lima y la comunidad ARMY Perú."
        path={ROUTES.news}
      />
      <PagePlaceholder
        title="BANGTAN NEWS"
        description="Filtros por categoría y grilla de artículos llegan en la Fase 9."
      />
    </>
  )
}
