import { useParams } from 'react-router-dom'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function ProductPage() {
  const { slug = '' } = useParams<{ slug: string }>()

  return (
    <>
      <Seo
        title={pageTitle('Producto')}
        description="Detalle de producto Purple Wave: galería, variantes de talla y color, stock y recomendaciones."
        path={ROUTES.product(slug)}
      />
      <PagePlaceholder
        title="PRODUCT DETAIL"
        description="Galería, variantes, talla, color, stock y productos relacionados llegan en la Fase 6."
        meta={`slug: ${slug}`}
      />
    </>
  )
}
