import type { MetaFunction } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Lima 2026'),
    description:
      'Todo sobre BTS World Tour en Lima: fechas, countdown, checklist de concierto y la colección cápsula Lima 2026.',
    path: ROUTES.lima2026,
  })

export default function Lima2026Page() {
  return (
    <PagePlaceholder
      eyebrow="ARMY PERÚ HUB"
      title="BTS IN LIMA"
      description="Countdown, checklist interactivo y concert fit llegan en la Fase 8."
    />
  )
}
