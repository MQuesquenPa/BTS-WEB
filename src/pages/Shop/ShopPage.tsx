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
import { MEMBERS } from '@/data/members'
import { PRODUCTS } from '@/data/products'
import type { BiasSlug } from '@/types/member'
import type { Product, ProductCategory } from '@/types/product'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Shop'),
    description:
      'Explora todo el catálogo de merch fan-made Purple Wave: hoodies, polos, accesorios y piezas de la colección Lima 2026.',
    path: ROUTES.shop,
  })

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'

interface ShopFilters {
  category: ProductCategory | 'all'
  bias: BiasSlug | 'all'
  collection: 'lima-2026' | 'all'
  sort: SortKey
  q: string
}

const DEFAULT_FILTERS: ShopFilters = { category: 'all', bias: 'all', collection: 'all', sort: 'featured', q: '' }

interface FilterOption {
  value: string
  label: string
}

const CATEGORY_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'tee', label: 'Tees' },
  { value: 'hoodie', label: 'Hoodies' },
  { value: 'bag', label: 'Bags' },
  { value: 'accessory', label: 'Accessories' },
]

const BIAS_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'ot7', label: 'OT7' },
  ...MEMBERS.map((member) => ({ value: member.slug, label: member.stage })),
]

const COLLECTION_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'lima-2026', label: 'Lima 2026' },
]

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name' },
]

const CATEGORY_VALUES = CATEGORY_OPTIONS.map((option) => option.value)
const BIAS_VALUES = BIAS_OPTIONS.map((option) => option.value)
const SORT_VALUES: string[] = SORT_OPTIONS.map((option) => option.value)

function parseFiltersFromParams(params: URLSearchParams): ShopFilters {
  const category = params.get('category')
  const bias = params.get('bias')
  const collection = params.get('collection')
  const sort = params.get('sort')
  const q = params.get('q')

  return {
    category: category && CATEGORY_VALUES.includes(category) ? (category as ProductCategory) : 'all',
    bias: bias && BIAS_VALUES.includes(bias) ? (bias as BiasSlug) : 'all',
    collection: collection === 'lima-2026' ? 'lima-2026' : 'all',
    sort: sort && SORT_VALUES.includes(sort) ? (sort as SortKey) : 'featured',
    q: q ?? '',
  }
}

function filtersToParams(filters: ShopFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.category !== 'all') params.set('category', filters.category)
  if (filters.bias !== 'all') params.set('bias', filters.bias)
  if (filters.collection !== 'all') params.set('collection', filters.collection)
  if (filters.sort !== 'featured') params.set('sort', filters.sort)
  if (filters.q.trim()) params.set('q', filters.q.trim())
  return params
}

function filterAndSort(products: Product[], filters: ShopFilters): Product[] {
  let result = products
  if (filters.category !== 'all') result = result.filter((product) => product.category === filters.category)
  if (filters.bias !== 'all') result = result.filter((product) => product.member === filters.bias)
  if (filters.collection !== 'all') result = result.filter((product) => product.collection === filters.collection)
  if (filters.q.trim()) {
    const query = filters.q.trim().toLowerCase()
    result = result.filter(
      (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
    )
  }

  if (filters.sort === 'featured') return result
  const sorted = [...result]
  if (filters.sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  else if (filters.sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  else if (filters.sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
  return sorted
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<ShopFilters>(DEFAULT_FILTERS)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  // The prerendered HTML (and this component's very first client render) always
  // reflects DEFAULT_FILTERS — no query string exists at build time. Real filters
  // coming from the URL (e.g. ?collection=lima-2026) are applied here, after
  // mount, the same way useCountdown defers to a real value: this keeps the
  // first client render byte-for-byte identical to the static HTML and avoids a
  // hydration mismatch.
  useEffect(() => {
    const applyFiltersFromUrl = () => setFilters(parseFiltersFromParams(searchParams))
    applyFiltersFromUrl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function updateFilters(patch: Partial<ShopFilters>) {
    const next = { ...filters, ...patch }
    setFilters(next)
    setSearchParams(filtersToParams(next), { replace: true })
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
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
            Fan-made pieces for your Purple Era. Todo el catálogo Purple Wave en un solo lugar.
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
            label="Category"
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
            label="Collection"
            options={COLLECTION_OPTIONS}
            value={filters.collection}
            onChange={(value) => updateFilters({ collection: value as 'lima-2026' | 'all' })}
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
