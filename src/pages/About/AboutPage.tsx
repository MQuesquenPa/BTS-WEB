import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'
import { Container } from '@/components/common/Container'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('About'),
    description:
      'Purple Wave es un proyecto fan-made hecho en Perú para ARMY: merch inspirado en BTS, personalización a tu manera y la colección Lima 2026.',
    path: ROUTES.about,
  })

const PILLARS = [
  {
    title: 'MERCH',
    description: 'Polos oversized y piezas fan-made pensadas para ARMY.',
  },
  {
    title: 'CUSTOM',
    description: 'Tu foto + tu artista favorito, convertidos en una pieza personalizada.',
  },
  {
    title: 'LIMA 2026',
    description: 'Una colección inspirada en las fechas que convertirán Lima en Purple Ocean.',
  },
]

const STEPS = [
  { number: '01', title: 'ELIGE', description: 'Escoge una pieza o colección del Shop.' },
  { number: '02', title: 'PERSONALIZA', description: 'Si quieres algo único, crea tu diseño con tu foto y tu bias.' },
  { number: '03', title: 'REVISAMOS', description: 'Purple Wave revisa la composición antes de producir.' },
  { number: '04', title: 'PRODUCIMOS', description: 'Los personalizados se preparan especialmente para cada pedido.' },
  { number: '05', title: 'RECÍBELO', description: 'Envíos a todo el Perú.' },
]

const COMMERCIAL_FACTS = [
  { value: 'S — XL', label: 'Tallas base' },
  { value: '5–7 DÍAS APROX.', label: 'Personalizados' },
  { value: 'TODO EL PERÚ', label: 'Envíos nacionales' },
  { value: 'DELIVERY APARTE', label: 'Coordinado según destino' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(128,84,255,0.2), transparent 60%), var(--color-background-secondary)',
          }}
        />
        <Container className="max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.16em] text-purple-light">PURPLE WAVE · ABOUT</span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] sm:text-6xl">ABOUT PURPLE WAVE</h1>
          <p className="mt-4 font-display text-xl font-semibold tracking-[0.02em] text-lavender sm:text-2xl">
            FROM ARMY, <span className="text-purple-light">FOR ARMY.</span>
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-foreground-muted sm:text-base">
            Purple Wave nació en Perú como un proyecto fan-made para ARMY: piezas que puedes llevar mucho más allá
            del concierto, y que también puedes convertir en algo completamente tuyo.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mb-12 max-w-lg">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">UN PEDACITO DE BTS PARA TI</h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {PILLARS.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`flex flex-col gap-3 border-t border-border pt-6 sm:border-t-0 sm:pt-0 ${
                  index > 0 ? 'sm:border-l sm:border-border sm:pl-8' : ''
                }`}
              >
                <span className="font-display text-sm font-bold text-purple-light">0{index + 1}</span>
                <h3 className="font-display text-xl font-bold">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-muted">{pillar.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(128,84,255,0.1), transparent 70%), var(--color-background-secondary)',
          }}
        />
        <Container>
          <div className="mb-12 max-w-lg">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">CÓMO FUNCIONA</h2>
          </div>
          <ol className="flex flex-col gap-8 sm:flex-row sm:gap-6">
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="flex flex-1 flex-col gap-2 border-t-2 border-border pt-5"
              >
                <span className="font-display text-2xl font-bold text-purple/40">{step.number}</span>
                <h3 className="font-display text-base font-bold tracking-[0.01em]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-border py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COMMERCIAL_FACTS.map((fact) => (
              <div key={fact.label}>
                <p className="font-display text-lg font-bold leading-tight sm:text-xl">{fact.value}</p>
                <p className="mt-1 text-xs text-foreground-muted">{fact.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12">
        <Container className="max-w-2xl">
          <p className="rounded-xl border border-border bg-surface/40 px-5 py-4 text-center text-xs leading-relaxed text-foreground-muted sm:text-left">
            Purple Wave es un proyecto fan-made independiente. No está afiliado, patrocinado ni respaldado por BTS,
            BIGHIT MUSIC o HYBE.
          </p>
        </Container>
      </section>

      <section className="py-16 text-center sm:py-24">
        <Container className="max-w-xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">CREA ALGO TUYO</h2>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to={ROUTES.customize}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-purple px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2 sm:w-auto"
            >
              PERSONALIZA TU MERCH
            </Link>
            <Link
              to={ROUTES.shop}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-border px-7 py-3.5 text-sm font-semibold text-foreground-muted transition-colors hover:border-purple-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2 sm:w-auto"
            >
              VER EL SHOP
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
