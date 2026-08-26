import type { MetaFunction } from 'react-router'
import { Hero } from '@/components/sections/Hero'
import { ROUTES } from '@/constants/routes'
import { DEFAULT_DESCRIPTION, pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({ title: pageTitle(), description: DEFAULT_DESCRIPTION, path: ROUTES.home })

export default function HomePage() {
  return <Hero />
}
