import { Link } from 'react-router'
import { Container } from '@/components/common/Container'
import { ProductCard } from '@/components/product/ProductCard'
import { PRODUCTS } from '@/data/products'
import { ROUTES } from '@/constants/routes'
import type { Product } from '@/types/product'

interface LimaCollectionProps {
  onQuickView: (product: Product) => void
}

const hoodie = PRODUCTS.find((p) => p.slug === 'seoul-to-lima-hoodie')!
const tee = PRODUCTS.find((p) => p.slug === 'lima-nights-tee')!

export function LimaCollection({ onQuickView }: LimaCollectionProps) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 85% 10%, rgba(255,49,92,0.10), transparent 60%), ' +
            'radial-gradient(ellipse 90% 70% at 15% 90%, rgba(128,84,255,0.22), transparent 65%), ' +
            'var(--color-background-secondary)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 64px)' }}
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="text-xs font-semibold tracking-[0.14em] text-accent">ARMY PERÚ · LIMA 2026</span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
              THREE NIGHTS.
              <br />
              ONE <span className="text-lavender">PURPLE</span> CITY.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground-muted sm:text-base">
              Una cápsula inspirada en la Costa Verde, la neblina y las luces de Lima la noche en que el Purple Ocean tome
              la ciudad.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="font-display text-3xl font-bold tracking-wide">07 · 09 · 10</span>
              <span className="text-xs uppercase leading-relaxed tracking-[0.1em] text-foreground-muted">
                OCT 2026
                <br />
                Lima, Perú
              </span>
            </div>
            <Link
              to={ROUTES.lima2026}
              className="mt-9 inline-flex min-h-11 items-center justify-center rounded-xl bg-foreground px-7 py-3.5 text-sm font-semibold tracking-[0.02em] text-background transition-colors hover:bg-lavender"
            >
              EXPLORE LIMA COLLECTION
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ProductCard
              product={hoodie}
              onQuickView={onQuickView}
              aspectClassName="aspect-[16/10]"
              className="col-span-2"
            />
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface/60 p-6 text-center">
              <div className="flex flex-col items-center gap-0.5 font-display text-2xl font-bold tracking-wide">
                <span>07</span>
                <span aria-hidden="true" className="text-sm text-foreground-muted">
                  —
                </span>
                <span>09</span>
                <span aria-hidden="true" className="text-sm text-foreground-muted">
                  —
                </span>
                <span>10</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display text-2xl font-bold text-lavender">LIMA</span>
                <span className="font-display text-2xl font-bold">2026</span>
              </div>
              <span className="text-[11px] tracking-[0.08em] text-foreground-muted">12.0464° S · 77.0428° W</span>
            </div>
            <ProductCard product={tee} onQuickView={onQuickView} aspectClassName="aspect-[4/5]" />
          </div>
        </div>
      </Container>
    </section>
  )
}
