import { Hero } from '@/components/sections/Hero'
import { Seo } from '@/components/common/Seo'
import { ROUTES } from '@/constants/routes'
import { DEFAULT_DESCRIPTION, pageTitle } from '@/constants/site'

export default function HomePage() {
  return (
    <>
      <Seo title={pageTitle()} description={DEFAULT_DESCRIPTION} path={ROUTES.home} />
      <Hero />
    </>
  )
}
