import { useState } from 'react'
import { Link } from 'react-router'
import type { MetaFunction } from 'react-router'
import { Container } from '@/components/common/Container'
import { CustomizerWizard } from '@/components/customizer/CustomizerWizard'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Personaliza tu polo'),
    description:
      'Crea tu polo oversized único: elige tu color, sube tu foto favorita con tu integrante y recibe una pieza hecha solo para ti. Fan-made en Perú.',
    path: ROUTES.customize,
  })

const STEPS = [
  { number: '01', title: 'Elige el color base', description: 'Negro, Purple, Lavender, Crudo o Blanco.' },
  { number: '02', title: 'Elige tu talla', description: 'Oversized de S a XL. Si dudas, elige la mayor.' },
  { number: '03', title: 'Elige tu bias', description: 'RM, Jin, SUGA, j-hope, Jimin, V, Jung Kook — o los siete juntos (OT7).' },
  { number: '04', title: 'Crea tu composición', description: 'Sube tu foto y opcionalmente una referencia de tu artista favorito.' },
  { number: '05', title: 'Elige el estilo', description: 'Purple Editorial, Lima Night o Fan Collage — el look que quieres para tu pieza.' },
  { number: '06', title: 'Tu diseño listo', description: 'Ve la vista previa final y coordina tu pedido. Tiempo estimado: 5–7 días aprox.' },
]

export default function CustomizePage() {
  const [started, setStarted] = useState(false)

  return (
    <>
      {!started ? (
        <Landing onStart={() => setStarted(true)} />
      ) : (
        <Container className="max-w-5xl">
          <CustomizerWizard />
        </Container>
      )}
    </>
  )
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(128,84,255,0.22), transparent 60%), var(--color-background-secondary)',
          }}
        />
        <Container className="max-w-3xl text-center">
          <span className="text-xs font-semibold tracking-[0.16em] text-purple-light">PURPLE WAVE · PERSONALIZA</span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            TU POLO.
            <br />
            <span className="text-lavender">TU FOTO.</span>
            <br />
            TU BIAS.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-foreground-muted sm:text-base">
            Crea un polo oversized único con tu foto y tu integrante favorito. Fan-made en Perú, bajo pedido — una
            pieza que no existe en ningún otro lugar del mundo.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-purple px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light sm:w-auto"
            >
              Empezar a personalizar →
            </button>
            <Link
              to={ROUTES.shop}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-border px-7 py-3.5 text-sm font-semibold text-foreground-muted transition-colors hover:border-purple-light hover:text-foreground sm:w-auto"
            >
              Ver polos en stock
            </Link>
          </div>
          <p className="mt-4 text-xs text-foreground-muted">
            Tiempo estimado: 5–7 días aprox. · Envíos a todo el Perú · Delivery aparte
          </p>
        </Container>
      </section>

      {/* Steps */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">¿CÓMO FUNCIONA?</h2>
            <p className="mt-3 text-sm text-foreground-muted sm:text-base">
              Seis pasos para que tu polo sea exactamente como lo imaginaste.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 ${
                  index === STEPS.length - 1
                    ? 'sm:col-span-2 lg:col-span-1 xl:col-span-4 xl:flex-row xl:items-center xl:gap-8'
                    : ''
                }`}
              >
                <span aria-hidden="true" className="font-display text-4xl font-bold leading-none text-purple/30 xl:text-5xl">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold sm:text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-purple px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
            >
              Empezar a personalizar →
            </button>
          </div>
        </Container>
      </section>

      {/* What you get */}
      <section className="py-16 sm:py-20">
        <div
          className="relative overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(128,84,255,0.12), transparent 70%), var(--color-background-secondary)',
          }}
        >
          <Container className="max-w-2xl py-16 text-center sm:py-20">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              UNA PIEZA ÚNICA,{'\n'}HECHA PARA TI
            </h2>
            <ul className="mx-auto mt-8 flex max-w-sm flex-col gap-3 text-left text-sm text-foreground-muted">
              {[
                'Polo oversized, corte amplio',
                'Tu foto integrada al diseño, no pegada encima',
                'Fan-made en Perú — no es merch oficial',
                'Tiempo estimado: 5–7 días aprox. desde que confirmas',
                'En Lima puede ser menor',
                'Envíos a todo el Perú · Delivery aparte, coordinado contigo',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-purple-light">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-purple px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
              >
                Quiero el mío →
              </button>
              <Link
                to={`${ROUTES.shop}?fulfillment=made-to-order`}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-7 py-3.5 text-sm font-semibold text-foreground-muted transition-colors hover:border-purple-light hover:text-foreground"
              >
                Ver polos personalizados
              </Link>
            </div>
          </Container>
        </div>
      </section>
    </>
  )
}
