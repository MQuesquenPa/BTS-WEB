import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { DEFAULT_DESCRIPTION, pageTitle } from '@/constants/site'

export default function HomePage() {
  return (
    <>
      <Seo title={pageTitle()} description={DEFAULT_DESCRIPTION} path={ROUTES.home} />
      <PagePlaceholder
        eyebrow="보라해"
        title="BTS IS COMING TO LIMA"
        description="La base técnica está lista. El Hero, Army Picks, el selector de bias y el resto de la experiencia llegan en la Fase 2."
      />
    </>
  )
}
