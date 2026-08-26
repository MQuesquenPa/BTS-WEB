import type { MetaFunction } from 'react-router'
import { PagePlaceholder } from '@/components/common/PagePlaceholder'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Members'),
    description: 'Conoce a los siete integrantes de BTS y descubre la colección Purple Wave inspirada en cada uno.',
    path: ROUTES.members,
  })

export default function MembersPage() {
  return (
    <PagePlaceholder title="MEET THE SEVEN" description="La grilla editorial de los siete integrantes llega en la Fase 7." />
  )
}
