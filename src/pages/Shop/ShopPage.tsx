import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { MetaFunction } from 'react-router'
import { useSearchParams } from 'react-router'
import { Container } from '@/components/common/Container'
import { ProductCard } from '@/components/product/ProductCard'
import { QuickView } from '@/components/product/QuickView'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'
import { PRODUCTS } from '@/data/products'
import type { Product, ProductCategory } from '@/types/product'
import {
  BIAS_OPTIONS,
  CATEGORY_OPTIONS,
  COLLECTION_OPTIONS,
  DEFAULT_FILTERS,
  filterAndSort,
  type FilterOption,
  filtersToParams,
  FULFILLMENT_OPTIONS,
  type FulfillmentFilter,
  parseFiltersFromParams,
  type ShopFilters,
  SORT_OPTIONS,
  type SortKey,
} from './shopFilters'
import type { BiasSlug } from '@/types/member'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Shop'),
    description:
      'Polos oversized fan-made para ARMY Perú. Diseños OT7 y por integrante, colección Lima 2026 y piezas personalizadas. Envíos a todo el Perú.',
    path: ROUTES.shop,
  })

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  // Flip once after the first client render so that the hydration snapshot
  // (always DEFAULT_FILTERS, matching the prerendered HTML) is identical to
  // the server render, then subsequent renders derive from searchParams.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, [])

  // Derive filters from searchParams rather than keeping a separate state
  // mirror — searchParams is already reactive (re-renders on Back/Forward),
  // so this is always in sync without a manual sync effect.
  const filters = mounted ? parseFiltersFromParams(searchParams) : DEFAULT_FILTERS

  function updateFilters(patch: Partial<ShopFilters>) {
    const next = { ...filters, ...patch }
    setSearchParams(filtersToParams(next), { replace: true })
  }

  function resetFilters() {
    setSearchParams(new URLSearchParams(), { replace: true })
  }

  const hasActiveFilters = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS)
  const results = filterAndSort(PRODUCTS, filters)

  return (
    <>
      <Container className="py-12 sm:py-16">
        <div className="mb-10 max-w-lg">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">SHOP</h1>
          <p className="mt-3 text-sm text-foreground-muted sm:text-base">
            Polos oversized fan-made para ARMY. Cada pieza es producida en Perú — en stock o bajo pedido personalizado.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block flex-1 sm:max-w-xs">
              <span className="sr-only">Buscar merch</span>
              <Search
                size={15}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted"
              />
              <input
                type="search"
                value={filters.q}
                onChange={(event) => updateFilters({ q: event.target.value })}
                placeholder="Buscar merch..."
                className="min-h-11 w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-purple-light focus:outline-none"
              />
            </label>

            <label className="flex items-center gap-2 text-xs text-foreground-muted">
              SORT
              <select
                value={filters.sort}
                onChange={(event) => updateFilters({ sort: event.target.value as SortKey })}
                className="min-h-11 rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:border-purple-light focus:outline-none"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <FilterRow
            label="Categoría"
            options={CATEGORY_OPTIONS}
            value={filters.category}
            onChange={(value) => updateFilters({ category: value as ProductCategory | 'all' })}
          />
          <FilterRow
            label="Bias"
            options={BIAS_OPTIONS}
            value={filters.bias}
            onChange={(value) => updateFilters({ bias: value as BiasSlug | 'all' })}
          />
          <FilterRow
            label="Colección"
            options={COLLECTION_OPTIONS}
            value={filters.collection}
            onChange={(value) => updateFilters({ collection: value as 'lima-2026' | 'all' })}
          />
          <FilterRow
            label="Tipo"
            options={FULFILLMENT_OPTIONS}
            value={filters.fulfillment}
            onChange={(value) => updateFilters({ fulfillment: value as FulfillmentFilter })}
          />

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start text-xs font-medium text-foreground-muted underline-offset-2 transition-colors hover:text-purple-light hover:underline"
            >
              Limpiar filtros
            </button>
          ) : null}
        </div>
        <h2 className="sr-only">Catálogo</h2>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {results.map((product, index) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} priority={index < 4} />
            ))}
          </div>
        ) : (
          <EmptyState onReset={resetFilters} />
        )}
      </Container>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  )
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <span className="mb-2 block text-[11px] font-semibold tracking-[0.1em] text-foreground-muted">
        {label.toUpperCase()}
      </span>
      <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            className={`min-h-9 shrink-0 rounded-full border px-3.5 text-xs font-medium tracking-[0.01em] transition-colors ${
              value === option.value
                ? 'border-purple-light bg-purple/15 text-purple-light'
                : 'border-border text-foreground-muted hover:border-purple-light hover:text-foreground'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
      <span className="font-display text-lg font-semibold">No encontramos merch con esos filtros</span>
      <p className="max-w-sm text-sm text-foreground-muted">
        Prueba con otra categoría, otro integrante o limpia la búsqueda.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
      >
        Ver todo el catálogo
      </button>
    </div>
  )
}
