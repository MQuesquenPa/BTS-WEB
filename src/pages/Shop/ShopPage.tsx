import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function ShopPage() {
  return (
    <>
      <Seo
        title={pageTitle('Shop')}
        description="Explora todo el catálogo de merch fan-made Purple Wave: hoodies, polos, accesorios y piezas de la colección Lima 2026."
        path={ROUTES.shop}
      />
      <PagePlaceholder
        title="SHOP"
        description="Filtros por integrante, categoría, estilo y grilla de productos llegan en la Fase 5."
      />
    </>
  )
}
