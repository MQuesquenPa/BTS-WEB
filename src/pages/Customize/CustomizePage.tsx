import type { MetaFunction } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Crea tu merch'),
    description: 'Personaliza tu merch Purple Wave: elige producto, color, integrante, estilo y agrega tu texto.',
    path: ROUTES.customize,
  })

export default function CustomizePage() {
  return (
    <PagePlaceholder
      title="CREA TU MERCH"
      description="El wizard de personalización de 6 pasos con preview en vivo llega en la Fase 10."
    />
  )
}
