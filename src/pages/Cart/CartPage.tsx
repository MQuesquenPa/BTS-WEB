import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function CartPage() {
  return (
    <>
      <Seo title={pageTitle('Purple Bag')} description="Revisa los productos en tu carrito antes de finalizar la compra." path={ROUTES.cart} noIndex />
      <PagePlaceholder
        title="PURPLE BAG"
        description="El carrito completo, con cantidades y subtotal, llega en la Fase 11."
      />
    </>
  )
}
