import type { MetaFunction } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Shop'),
    description:
      'Explora todo el catálogo de merch fan-made Purple Wave: hoodies, polos, accesorios y piezas de la colección Lima 2026.',
    path: ROUTES.shop,
  })

export default function ShopPage() {
  return (
    <PagePlaceholder
      title="SHOP"
      description="Filtros por integrante, categoría, estilo y grilla de productos llegan en la Fase 5."
    />
  )
}
