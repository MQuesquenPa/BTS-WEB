import type { MetaFunction } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Checkout'),
    description: 'Finaliza tu compra en Purple Wave.',
    path: ROUTES.checkout,
    robots: 'noindex, follow',
  })

export default function CheckoutPage() {
  return (
    <PagePlaceholder
      title="CHECKOUT"
      description="El flujo simulado de datos, delivery, pago y confirmación llega en la Fase 12."
    />
  )
}
