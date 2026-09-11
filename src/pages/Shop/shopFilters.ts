// Pure filter/sort logic + option lists for ShopPage, split out of the route
// file so it can be unit-tested directly (see shopFilters.test.ts) without
// tripping react-refresh/only-export-components on a page module, and so
// ShopPage.tsx stays focused on rendering.
import { MEMBERS } from '@/data/members'
import type { BiasSlug } from '@/types/member'
import type { Product, ProductCategory } from '@/types/product'

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'
export type FulfillmentFilter = 'all' | 'ready-stock' | 'made-to-order'

export interface ShopFilters {
  category: ProductCategory | 'all'
  bias: BiasSlug | 'all'
  collection: 'lima-2026' | 'all'
  fulfillment: FulfillmentFilter
  sort: SortKey
  q: string
}

export const DEFAULT_FILTERS: ShopFilters = {
  category: 'all',
  bias: 'all',
  collection: 'all',
  fulfillment: 'all',
  sort: 'featured',
  q: '',
}

export interface FilterOption {
  value: string
  label: string
}

export const CATEGORY_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'tee', label: 'Polos' },
  { value: 'hoodie', label: 'Hoodies' },
  { value: 'bag', label: 'Bolsos' },
  { value: 'accessory', label: 'Accesorios' },
]

export const BIAS_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'ot7', label: 'OT7' },
  ...MEMBERS.map((member) => ({ value: member.slug, label: member.stage })),
]

export const COLLECTION_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'lima-2026', label: 'Lima 2026' },
]

export const FULFILLMENT_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'ready-stock', label: 'Stock' },
  { value: 'made-to-order', label: 'Personalizado' },
]

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name', label: 'Nombre' },
]

const CATEGORY_VALUES = CATEGORY_OPTIONS.map((option) => option.value)
const BIAS_VALUES = BIAS_OPTIONS.map((option) => option.value)
const FULFILLMENT_VALUES: string[] = FULFILLMENT_OPTIONS.map((option) => option.value)
const SORT_VALUES: string[] = SORT_OPTIONS.map((option) => option.value)

export function parseFiltersFromParams(params: URLSearchParams): ShopFilters {
  const category = params.get('category')
  const bias = params.get('bias')
  const collection = params.get('collection')
  const fulfillment = params.get('fulfillment')
  const sort = params.get('sort')
  const q = params.get('q')

  return {
    category: category && CATEGORY_VALUES.includes(category) ? (category as ProductCategory) : 'all',
    bias: bias && BIAS_VALUES.includes(bias) ? (bias as BiasSlug) : 'all',
    collection: collection === 'lima-2026' ? 'lima-2026' : 'all',
    fulfillment: fulfillment && FULFILLMENT_VALUES.includes(fulfillment) ? (fulfillment as FulfillmentFilter) : 'all',
    sort: sort && SORT_VALUES.includes(sort) ? (sort as SortKey) : 'featured',
    q: q ?? '',
  }
}

export function filtersToParams(filters: ShopFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.category !== 'all') params.set('category', filters.category)
  if (filters.bias !== 'all') params.set('bias', filters.bias)
  if (filters.collection !== 'all') params.set('collection', filters.collection)
  if (filters.fulfillment !== 'all') params.set('fulfillment', filters.fulfillment)
  if (filters.sort !== 'featured') params.set('sort', filters.sort)
  if (filters.q.trim()) params.set('q', filters.q.trim())
  return params
}

export function filterAndSort(products: Product[], filters: ShopFilters): Product[] {
  let result = products
  if (filters.category !== 'all') result = result.filter((product) => product.category === filters.category)
  if (filters.bias !== 'all') result = result.filter((product) => product.member === filters.bias)
  if (filters.collection !== 'all') result = result.filter((product) => product.collection === filters.collection)
  if (filters.fulfillment !== 'all') result = result.filter((product) => product.fulfillment === filters.fulfillment)
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
