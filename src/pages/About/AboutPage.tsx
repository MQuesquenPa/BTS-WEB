import type { MetaFunction } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('About'),
    description:
      'Purple Wave nace en Perú, creada por y para ARMY. Merch fan-made no afiliado oficialmente con BTS, BIGHIT MUSIC o HYBE.',
    path: ROUTES.about,
  })

export default function AboutPage() {
  return (
    <PagePlaceholder
      title="ABOUT PURPLE WAVE"
      description="Historia de marca, disclaimer fan-made y FAQ llegan completos en fases posteriores."
    />
  )
}
