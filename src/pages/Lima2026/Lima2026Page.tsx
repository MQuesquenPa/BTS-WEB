import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function Lima2026Page() {
  return (
    <>
      <Seo
        title={pageTitle('Lima 2026')}
        description="Todo sobre BTS World Tour en Lima: fechas, countdown, checklist de concierto y la colección cápsula Lima 2026."
        path={ROUTES.lima2026}
      />
      <PagePlaceholder
        eyebrow="ARMY PERÚ HUB"
        title="BTS IN LIMA"
        description="Countdown, checklist interactivo y concert fit llegan en la Fase 8."
      />
    </>
  )
}
