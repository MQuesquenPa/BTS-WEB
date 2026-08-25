import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function WishlistPage() {
  return (
    <>
      <Seo title={pageTitle('Tu Purple List')} description="Tus productos favoritos de Purple Wave, guardados en un solo lugar." path={ROUTES.wishlist} noIndex />
      <PagePlaceholder
        title="TU PURPLE LIST"
        description="La wishlist persistente en localStorage llega en la Fase 11."
      />
    </>
  )
}
