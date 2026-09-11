import { STYLE_OPTIONS } from '@/constants/customizer'
import type { CustomDesignState } from '@/constants/customizer'

// Re-exported for existing consumers (CustomizerWizard.tsx) — the actual
// implementation lives in lib/whatsapp.ts, shared with Checkout.
export { buildWhatsAppUrl, WHATSAPP_NUMBER } from '@/lib/whatsapp'

export function buildOrderSummaryText(state: CustomDesignState): string {
  const styleName = STYLE_OPTIONS.find((s) => s.id === state.style)?.name ?? '—'

  return [
    'PURPLE WAVE — POLO PERSONALIZADO',
    '',
    'Modelo: Oversized Tee',
    `Color: ${state.color.name}`,
    `Talla: ${state.size ?? '—'}`,
    `Bias: ${state.biasLabel ?? '—'}`,
    `Estilo: ${styleName}`,
    '',
    `Foto personal: ${state.customerPhoto ? 'Agregada' : 'No agregada'}`,
    `Referencia artista: ${state.artistReference ? 'Agregada' : 'No agregada'}`,
    '',
    'Tiempo estimado: 5–7 días aprox.',
    'Envíos: Todo el Perú',
    'Delivery: costo aparte, coordinado según destino.',
    '',
    'Vista previa referencial. El diseño final puede requerir ajustes antes de producción.',
  ].join('\n')
}

export function buildWhatsAppMessage(state: CustomDesignState): string {
  const styleName = STYLE_OPTIONS.find((s) => s.id === state.style)?.name ?? '—'
  const hasCustomerPhoto = Boolean(state.customerPhoto)
  const hasArtistRef = Boolean(state.artistReference)

  const lines = [
    'Hola Purple Wave 💜',
    '',
    'Quiero cotizar un polo personalizado.',
    '',
    'Modelo: Oversized Tee',
    `Color: ${state.color.name}`,
    `Talla: ${state.size ?? '—'}`,
    `Bias: ${state.biasLabel ?? '—'}`,
    `Estilo: ${styleName}`,
  ]

  if (hasCustomerPhoto || hasArtistRef) {
    lines.push('')
    if (hasCustomerPhoto) lines.push('Foto personal: lista para enviar')
    if (hasArtistRef) lines.push('Referencia del artista: lista para enviar')
    lines.push('')
    lines.push('Les enviaré las imágenes directamente por este chat.')
  }

  return lines.join('\n')
}
