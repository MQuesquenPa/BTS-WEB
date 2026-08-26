import type { MetaFunction } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Tu Purple List'),
    description: 'Tus productos favoritos de Purple Wave, guardados en un solo lugar.',
    path: ROUTES.wishlist,
    robots: 'noindex, follow',
  })

export default function WishlistPage() {
  return (
    <PagePlaceholder title="TU PURPLE LIST" description="La wishlist persistente en localStorage llega en la Fase 11." />
  )
}
