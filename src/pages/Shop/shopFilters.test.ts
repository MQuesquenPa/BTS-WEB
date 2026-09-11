import { describe, expect, it } from 'vitest'
import { PRODUCTS } from '@/data/products'
import { DEFAULT_FILTERS, filterAndSort, filtersToParams, parseFiltersFromParams } from './shopFilters'

describe('filterAndSort', () => {
  it('returns every product with the default (no) filters', () => {
    expect(filterAndSort(PRODUCTS, DEFAULT_FILTERS)).toHaveLength(PRODUCTS.length)
  })

  it('filters by category', () => {
    const result = filterAndSort(PRODUCTS, { ...DEFAULT_FILTERS, category: 'hoodie' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((product) => product.category === 'hoodie')).toBe(true)
  })

  it('filters by search query across name and description', () => {
    const result = filterAndSort(PRODUCTS, { ...DEFAULT_FILTERS, q: 'jimin' })
    expect(result.length).toBeGreaterThan(0)
    expect(
      result.every((product) => `${product.name} ${product.description}`.toLowerCase().includes('jimin')),
    ).toBe(true)
  })

  it('returns an empty array when nothing matches', () => {
    expect(filterAndSort(PRODUCTS, { ...DEFAULT_FILTERS, q: 'no-existe-este-producto-xyz' })).toHaveLength(0)
  })

  it('sorts by price ascending', () => {
    const result = filterAndSort(PRODUCTS, { ...DEFAULT_FILTERS, sort: 'price-asc' })
    for (let i = 1; i < result.length; i += 1) {
      expect(result[i]!.price).toBeGreaterThanOrEqual(result[i - 1]!.price)
    }
  })

  it('sorts by price descending', () => {
    const result = filterAndSort(PRODUCTS, { ...DEFAULT_FILTERS, sort: 'price-desc' })
    for (let i = 1; i < result.length; i += 1) {
      expect(result[i]!.price).toBeLessThanOrEqual(result[i - 1]!.price)
    }
  })
})

describe('parseFiltersFromParams / filtersToParams', () => {
  it('round-trips a non-default filter set through the URL', () => {
    const filters = { ...DEFAULT_FILTERS, category: 'hoodie' as const, sort: 'price-desc' as const, q: 'lima' }
    expect(parseFiltersFromParams(filtersToParams(filters))).toEqual(filters)
  })

  it('falls back to defaults for unknown/invalid values', () => {
    const params = new URLSearchParams('category=not-a-real-category&sort=nonsense')
    expect(parseFiltersFromParams(params)).toEqual(DEFAULT_FILTERS)
  })

  it('parses an empty query string as the default filters', () => {
    expect(parseFiltersFromParams(new URLSearchParams(''))).toEqual(DEFAULT_FILTERS)
  })
})
