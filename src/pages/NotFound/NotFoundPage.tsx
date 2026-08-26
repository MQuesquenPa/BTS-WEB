import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'
import { ROUTES } from '@/constants/routes'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: 'Página no encontrada | Purple Wave',
    description: 'La página que buscas no existe o fue movida.',
    path: '/404',
    robots: 'noindex',
  })

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-display text-sm tracking-[0.2em] text-purple-light">404</span>
      <h1 className="max-w-xl font-display text-4xl font-bold leading-tight md:text-5xl">
        Esta página se perdió en el Purple Ocean
      </h1>
      <p className="max-w-sm text-sm leading-relaxed text-foreground-muted">
        No encontramos lo que buscas. Vuelve al inicio y sigue explorando.
      </p>
      <Link
        to={ROUTES.home}
        className="mt-2 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
      >
        Volver al inicio
      </Link>
    </section>
  )
}
