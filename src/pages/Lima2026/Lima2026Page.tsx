import { ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'
import { Container } from '@/components/common/Container'
import { ProductCard } from '@/components/product/ProductCard'
import { QuickView } from '@/components/product/QuickView'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import {
  LIMA_2026_CITY,
  LIMA_2026_DURATION_ESTIMATE,
  LIMA_2026_FIRST_SHOW_ISO,
  LIMA_2026_OFFICIAL_SOURCES,
  LIMA_2026_START_TIME_ESTIMATE,
  LIMA_2026_VENUE,
} from '@/constants/event'
import { buildMeta } from '@/lib/meta'
import { useCountdown } from '@/hooks/useCountdown'
import { PRODUCTS } from '@/data/products'
import type { Product } from '@/types/product'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Lima 2026'),
    description:
      'Todo lo que ARMY necesita para BTS en Lima 2026: countdown, checklist de concierto y la colección Purple Wave pensada para las tres noches en Perú.',
    path: ROUTES.lima2026,
  })

const COUNTDOWN_UNITS = [
  { key: 'days', label: 'DÍAS' },
  { key: 'hours', label: 'HORAS' },
  { key: 'minutes', label: 'MINUTOS' },
  { key: 'seconds', label: 'SEGUNDOS' },
] as const

const CHECKLIST_ITEMS = [
  { id: 'ticket', label: 'Entrada / ticket' },
  { id: 'document', label: 'Documento de identidad' },
  { id: 'phone', label: 'Celular cargado' },
  { id: 'powerbank', label: 'Power bank' },
  { id: 'sunscreen', label: 'Protección solar' },
  { id: 'outfit', label: 'Merch / outfit' },
  { id: 'route-there', label: 'Ruta de ida' },
  { id: 'route-back', label: 'Ruta de regreso' },
]

const LIMA_PRODUCTS = PRODUCTS.filter((product) => product.collection === 'lima-2026')

export default function Lima2026Page() {
  const countdown = useCountdown(LIMA_2026_FIRST_SHOW_ISO)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  return (
    <>
      {/* 1. Hero editorial — distinto del Hero de Home: sin countdown embebido,
          sin CTAs, fondo con las fechas gigantes en vez de silueta+grid. */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 whitespace-nowrap text-center font-display text-[30vw] font-bold leading-none text-purple/[0.07] sm:text-[16vw]"
        >
          07 · 09 · 10
        </span>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(128,84,255,0.16), transparent 65%), var(--color-background)',
          }}
        />

        <Container className="max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.16em] text-purple-light">ARMY PERÚ HUB</span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] sm:text-6xl">BTS IN LIMA</h1>

          <div className="mx-auto mt-8 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <span className="font-display text-2xl font-bold tracking-wide">07 · 09 · 10</span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />
            <span className="text-xs uppercase tracking-[0.1em] text-foreground-muted">OCT 2026</span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />
            <span className="text-xs uppercase tracking-[0.1em] text-foreground-muted">{LIMA_2026_VENUE}</span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />
            <span className="text-xs uppercase tracking-[0.1em] text-foreground-muted">{LIMA_2026_CITY}</span>
          </div>
        </Container>
      </section>

      {/* 2. Countdown — reutiliza useCountdown + LIMA_2026_FIRST_SHOW_ISO, sin duplicar fecha/lógica. */}
      <section className="border-y border-border py-12 sm:py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span className="text-xs font-semibold tracking-[0.14em] text-foreground-muted">
            FALTA PARA LA PRIMERA NOCHE
          </span>
          <div
            role="group"
            aria-label="Cuenta regresiva para BTS World Tour Lima 2026, 07 de octubre"
            className="flex gap-6 sm:gap-10"
          >
            {COUNTDOWN_UNITS.map(({ key, label }) => (
              <div key={key} className="min-w-[60px]">
                <div className="font-display text-4xl font-bold tabular-nums sm:text-5xl">
                  {String(countdown[key]).padStart(2, '0')}
                </div>
                <div className="mt-1 text-[10px] tracking-[0.1em] text-foreground-muted sm:text-xs">{label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Three Nights — mismo lenguaje visual/tagline que LimaCollection (Home),
          pero copy propio del hub, sin mezclar productos en esta sección. */}
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.14em] text-accent">ARMY PERÚ · LIMA 2026</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
            THREE NIGHTS.
            <br />
            ONE <span className="text-lavender">PURPLE</span> CITY.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-foreground-muted sm:text-base">
            Tres noches en las que Lima se va a teñir de Purple Ocean. Este hub reúne todo lo que ARMY necesita para
            vivirlas: fechas, checklist y la colección pensada para esas tres noches.
          </p>
        </Container>
      </section>

      {/* 4. Concert Checklist — interactivo, persistido en localStorage. */}
      <ConcertChecklist />

      {/* 5. Your Concert Fit — reutiliza ProductCard y los productos reales de la colección lima-2026. */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:max-w-lg">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">YOUR CONCERT FIT</h2>
            <p className="text-sm text-foreground-muted sm:text-base">
              La colección Purple Wave pensada para las tres noches de octubre.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {LIMA_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
                aspectClassName="aspect-[4/5]"
              />
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <Link
              to={`${ROUTES.shop}?collection=lima-2026`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-purple px-7 py-3.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:bg-purple-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2"
            >
              VER COLECCIÓN LIMA
            </Link>
          </div>
        </Container>
      </section>

      {/* 6. Before You Go — solo datos confirmados. */}
      <section className="border-t border-border py-16 sm:py-24">
        <Container className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">BEFORE YOU GO</h2>
          <dl className="mt-8 grid grid-cols-2 gap-6 text-sm sm:flex sm:flex-wrap sm:gap-12">
            <div>
              <dt className="text-xs font-semibold tracking-[0.1em] text-foreground-muted">FECHAS</dt>
              <dd className="mt-1 font-display text-lg font-bold">07, 09 y 10 de octubre de 2026</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.1em] text-foreground-muted">LUGAR</dt>
              <dd className="mt-1 font-display text-lg font-bold">
                {LIMA_2026_VENUE}, {LIMA_2026_CITY}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.1em] text-foreground-muted">HORA DE INICIO ESTIMADA</dt>
              <dd className="mt-1 font-display text-lg font-bold">{LIMA_2026_START_TIME_ESTIMATE}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.1em] text-foreground-muted">DURACIÓN APROXIMADA</dt>
              <dd className="mt-1 font-display text-lg font-bold">{LIMA_2026_DURATION_ESTIMATE}</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-foreground-muted">
            La información del evento puede cambiar. Revisa siempre las fuentes oficiales antes de asistir.
          </p>

          {/* 7. Fuentes oficiales — links externos reales, verificados, no afiliados a Purple Wave. */}
          <div className="mt-10 border-t border-border pt-8">
            <h3 className="font-display text-base font-bold">FUENTES OFICIALES</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {LIMA_2026_OFFICIAL_SOURCES.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:border-purple-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
                  >
                    <span>
                      <span className="flex items-center gap-1.5 font-display text-sm font-bold">
                        {source.label}
                        <ExternalLink
                          size={13}
                          aria-hidden="true"
                          className="text-foreground-muted transition-colors group-hover:text-purple-light"
                        />
                      </span>
                      <span className="mt-0.5 block text-xs text-foreground-muted">{source.description}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-foreground-muted">
              Purple Wave no está afiliado a estas plataformas — son fuentes externas independientes.
            </p>
          </div>
        </Container>
      </section>

      {/* 8. Disclaimer */}
      <section className="pb-16 sm:pb-24">
        <Container className="max-w-2xl">
          <p className="rounded-xl border border-border bg-surface/40 px-5 py-4 text-center text-xs leading-relaxed text-foreground-muted sm:text-left">
            Purple Wave no vende entradas y no forma parte de la organización del evento. La venta oficial se realiza
            a través del operador indicado en las fuentes oficiales.
          </p>
        </Container>
      </section>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  )
}

const CHECKLIST_STORAGE_KEY = 'purple-wave-concert-checklist'

function ConcertChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  // Same hydration-safe pattern as useCountdown: starts empty on the
  // prerendered HTML and the first client render, then loads the real,
  // saved state from localStorage after mount — never during prerender,
  // where localStorage doesn't exist.
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY)
        if (raw) setChecked(JSON.parse(raw))
      } catch {
        // Corrupt or inaccessible storage — keep the empty default.
      }
    }
    loadFromStorage()
  }, [])

  function toggle(id: string) {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      try {
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next))
      } catch {
        // Storage full or unavailable — the toggle still works for this session.
      }
      return next
    })
  }

  const doneCount = CHECKLIST_ITEMS.filter((item) => checked[item.id]).length

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">CONCERT CHECKLIST</h2>
          <span className="shrink-0 text-xs font-semibold tracking-[0.06em] text-foreground-muted">
            {doneCount}/{CHECKLIST_ITEMS.length}
          </span>
        </div>

        <ul className="flex flex-col gap-2.5">
          {CHECKLIST_ITEMS.map((item) => (
            <li key={item.id}>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-border px-4 py-3 transition-colors has-[:checked]:border-purple-light has-[:checked]:bg-purple/10">
                <input
                  type="checkbox"
                  checked={Boolean(checked[item.id])}
                  onChange={() => toggle(item.id)}
                  className="h-4 w-4 shrink-0 accent-purple"
                />
                <span
                  className={`text-sm ${checked[item.id] ? 'text-foreground-muted line-through' : 'text-foreground'}`}
                >
                  {item.label}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs leading-relaxed text-foreground-muted">
          Revisa siempre las indicaciones oficiales del evento antes de asistir.
        </p>
      </Container>
    </section>
  )
}
