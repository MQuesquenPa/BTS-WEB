// Single source for WhatsApp config + URL building — shared by the Customizer
// and Checkout handoffs so the two can never drift (Fase 11 §1/2: a hardcoded
// fallback number in the Customizer was a real bug — this file exists so
// there's only one place that can make that mistake, and it doesn't).

export function sanitizeWhatsAppNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, '')
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  return `https://wa.me/${sanitizeWhatsAppNumber(phoneNumber)}?text=${encodeURIComponent(message)}`
}

// Empty string → undefined so every WhatsApp CTA in the app hides itself when
// the var is unset or blank. This is the only place that reads
// VITE_WHATSAPP_NUMBER — never hardcode a fallback number anywhere else.
const raw = import.meta.env['VITE_WHATSAPP_NUMBER'] as string | undefined
export const WHATSAPP_NUMBER: string | undefined = raw?.trim() || undefined
