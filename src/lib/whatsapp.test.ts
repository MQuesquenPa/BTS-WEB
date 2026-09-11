import { beforeEach, describe, expect, it, vi } from 'vitest'
import { buildWhatsAppUrl, sanitizeWhatsAppNumber } from './whatsapp'

describe('sanitizeWhatsAppNumber', () => {
  it('strips +, spaces and dashes, keeping only digits', () => {
    expect(sanitizeWhatsAppNumber('+51 999-000-111')).toBe('51999000111')
  })

  it('returns an empty string for an empty input', () => {
    expect(sanitizeWhatsAppNumber('')).toBe('')
  })
})

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me URL from a sanitized number', () => {
    expect(buildWhatsAppUrl('+51 999 000 111', 'hola')).toBe('https://wa.me/51999000111?text=hola')
  })

  it('URL-encodes the message, including newlines and emoji', () => {
    const message = 'Hola Purple Wave 💜\nQuiero mi pedido'
    const url = buildWhatsAppUrl('51999000111', message)
    expect(url).toBe(`https://wa.me/51999000111?text=${encodeURIComponent(message)}`)
  })

  it('never produces a link when given an empty phone number', () => {
    // sanitizeWhatsAppNumber('') === '' — the resulting URL is intentionally
    // not a valid wa.me link. Callers must gate on WHATSAPP_NUMBER instead of
    // calling this with an empty string (see the Fase 11 bug this replaced:
    // a hardcoded fallback number that produced a broken link).
    expect(buildWhatsAppUrl('', 'hola')).toBe('https://wa.me/?text=hola')
  })
})

describe('WHATSAPP_NUMBER (env-derived)', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('is undefined when VITE_WHATSAPP_NUMBER is unset/blank', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '')
    const { WHATSAPP_NUMBER } = await import('./whatsapp')
    expect(WHATSAPP_NUMBER).toBeUndefined()
  })

  it('is the trimmed value when configured', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '  51999000111  ')
    const { WHATSAPP_NUMBER } = await import('./whatsapp')
    expect(WHATSAPP_NUMBER).toBe('51999000111')
  })
})
