import { describe, expect, it } from 'vitest'
import { validateContact, validateDelivery } from './checkoutValidation'

describe('validateContact', () => {
  it('requires fullName and phone', () => {
    const errors = validateContact({ fullName: '', phone: '' })
    expect(errors.fullName).toBeTruthy()
    expect(errors.phone).toBeTruthy()
  })

  it('accepts a Peruvian-style phone number, "+", spaces and all', () => {
    const errors = validateContact({ fullName: 'Ana Torres', phone: '+51 999 000 111' })
    expect(errors.phone).toBeUndefined()
  })

  it('rejects a phone that is too short to be real', () => {
    const errors = validateContact({ fullName: 'Ana Torres', phone: '123' })
    expect(errors.phone).toBeTruthy()
  })

  it('treats email as optional', () => {
    const errors = validateContact({ fullName: 'Ana', phone: '999000111' })
    expect(errors.email).toBeUndefined()
  })

  it('validates email only when one is provided', () => {
    const errors = validateContact({ fullName: 'Ana', phone: '999000111', email: 'not-an-email' })
    expect(errors.email).toBeTruthy()
  })

  it('passes with a complete, valid contact', () => {
    const errors = validateContact({ fullName: 'Ana Torres', phone: '999000111', email: 'ana@example.com' })
    expect(errors).toEqual({})
  })
})

describe('validateDelivery', () => {
  it('requires department, province, district and address', () => {
    const errors = validateDelivery({ department: '', province: '', district: '', address: '' })
    expect(Object.keys(errors).sort()).toEqual(['address', 'department', 'district', 'province'])
  })

  it('does not require reference or notes', () => {
    const errors = validateDelivery({
      department: 'Lima',
      province: 'Lima',
      district: 'Miraflores',
      address: 'Av. Larco 123',
    })
    expect(errors).toEqual({})
  })
})
