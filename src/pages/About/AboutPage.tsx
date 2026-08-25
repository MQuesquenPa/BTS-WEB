import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'

export default function AboutPage() {
  return (
    <>
      <Seo
        title={pageTitle('About')}
        description="Purple Wave nace en Perú, creada por y para ARMY. Merch fan-made no afiliado oficialmente con BTS, BIGHIT MUSIC o HYBE."
        path={ROUTES.about}
      />
      <PagePlaceholder
        title="ABOUT PURPLE WAVE"
        description="Historia de marca, disclaimer fan-made y FAQ llegan completos en fases posteriores."
      />
    </>
  )
}
