import type { MetaFunction } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Purple Bag'),
    description: 'Revisa los productos en tu carrito antes de finalizar la compra.',
    path: ROUTES.cart,
    robots: 'noindex, follow',
  })

export default function CartPage() {
  return (
    <PagePlaceholder title="PURPLE BAG" description="El carrito completo, con cantidades y subtotal, llega en la Fase 11." />
  )
}
