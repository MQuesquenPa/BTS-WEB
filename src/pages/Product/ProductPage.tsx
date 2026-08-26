import type { MetaFunction } from 'react-router'
import { useParams } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = ({ params }) =>
  buildMeta({
    title: pageTitle('Producto'),
    description: 'Detalle de producto Purple Wave: galería, variantes de talla y color, stock y recomendaciones.',
    path: ROUTES.product(params.slug ?? ''),
  })

export default function ProductPage() {
  const { slug = '' } = useParams<{ slug: string }>()

  return (
    <PagePlaceholder
      title="PRODUCT DETAIL"
      description="Galería, variantes, talla, color, stock y productos relacionados llegan en la Fase 6."
      meta={`slug: ${slug}`}
    />
  )
}
