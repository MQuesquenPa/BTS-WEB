import { Container } from '@/components/common/Container'
import { ProductCard } from '@/components/product/ProductCard'
import { PRODUCTS } from '@/data/products'
import type { Product } from '@/types/product'

interface ArmyPicksProps {
  onQuickView: (product: Product) => void
}

const featured = PRODUCTS.find((p) => p.slug === 'oversized-tee-ot7')!
const bracelet = PRODUCTS.find((p) => p.slug === 'borahae-bracelet')!
const tote = PRODUCTS.find((p) => p.slug === 'seven-tote')!
const hoodie = PRODUCTS.find((p) => p.slug === 'purple-wave-hoodie')!
const jiminTee = PRODUCTS.find((p) => p.slug === 'jimin-95-tee')!

// Single list, single DOM: mobile and desktop are the same markup transformed
// by CSS only (see the wrapper below) — no duplicated products/links for
// crawlers. `aspect` carries both breakpoints in one class string so each
// item can vary proportions on desktop without a second render pass.
const PICKS: { product: Product; colSpan: string; aspect: string; priority?: boolean }[] = [
  { product: featured, colSpan: 'sm:col-span-7', aspect: 'aspect-[4/5] sm:aspect-[16/11]', priority: true },
  { product: bracelet, colSpan: 'sm:col-span-5', aspect: 'aspect-[4/5]' },
  { product: tote, colSpan: 'sm:col-span-5', aspect: 'aspect-[4/5]' },
  { product: hoodie, colSpan: 'sm:col-span-4', aspect: 'aspect-[4/5]' },
  { product: jiminTee, colSpan: 'sm:col-span-3', aspect: 'aspect-[4/5] sm:aspect-[3/4]' },
]

export function ArmyPicks({ onQuickView }: ArmyPicksProps) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:max-w-lg">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">ARMY PICKS</h2>
          <p className="text-sm text-foreground-muted sm:text-base">Lo que está conquistando la Purple List esta semana.</p>
        </div>

        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-12 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none">
          {PICKS.map(({ product, colSpan, aspect, priority }) => (
            <div key={product.id} className={`w-[72%] shrink-0 snap-start sm:w-auto sm:shrink ${colSpan}`}>
              <ProductCard product={product} onQuickView={onQuickView} aspectClassName={aspect} priority={priority} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
