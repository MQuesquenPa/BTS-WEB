import { useParams } from 'react-router-dom'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function NewsDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()

  return (
    <>
      <Seo
        title={pageTitle('Noticia')}
        description="Artículo de Bangtan News: contexto, cuerpo de la nota y fuente."
        path={ROUTES.newsDetail(slug)}
      />
      <PagePlaceholder
        title="NEWS DETAIL"
        description="Artículo completo, fuente y noticias relacionadas llegan en la Fase 9."
        meta={`slug: ${slug}`}
      />
    </>
  )
}
