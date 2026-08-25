import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function CustomizePage() {
  return (
    <>
      <Seo
        title={pageTitle('Crea tu merch')}
        description="Personaliza tu merch Purple Wave: elige producto, color, integrante, estilo y agrega tu texto."
        path={ROUTES.customize}
      />
      <PagePlaceholder
        title="CREA TU MERCH"
        description="El wizard de personalización de 6 pasos con preview en vivo llega en la Fase 10."
      />
    </>
  )
}
