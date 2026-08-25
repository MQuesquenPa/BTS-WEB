import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function CheckoutPage() {
  return (
    <>
      <Seo title={pageTitle('Checkout')} description="Finaliza tu compra en Purple Wave." path={ROUTES.checkout} noIndex />
      <PagePlaceholder
        title="CHECKOUT"
        description="El flujo simulado de datos, delivery, pago y confirmación llega en la Fase 12."
      />
    </>
  )
}
