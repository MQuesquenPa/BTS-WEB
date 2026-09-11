import { describe, expect, it } from 'vitest'
import { formatCurrency } from './currency'

describe('formatCurrency', () => {
  it.each([
    [0, 'S/ 0.00'],
    [1, 'S/ 1.00'],
    [12.5, 'S/ 12.50'],
    [1200, 'S/ 1200.00'],
  ])('formats %s as %s', (amount, expected) => {
    expect(formatCurrency(amount)).toBe(expected)
  })
})
