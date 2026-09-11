import { DELIVERY_COPY, FULFILLMENT_LABEL } from '@/constants/commerce'
import { formatCurrency } from '@/lib/currency'
import type { CheckoutFormData } from '@/types/checkout'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

// Re-exported rather than reimplemented — Fase 10 §12/13 explicitly calls for
// reusing shared WhatsApp infra (URL building + sanitization + env config)
// instead of a second implementation. Fase 11 §2 moved the actual code to
// lib/whatsapp.ts (generic, no Customizer-specific naming) since Checkout
// depends on it too.
export { buildWhatsAppUrl, WHATSAPP_NUMBER } from '@/lib/whatsapp'

export interface CheckoutOrderLine {
  item: CartItem
  product: Product
}

function lineLabel(product: Product): string | null {
  if (product.customizable) return 'Personalizado'
  if (product.fulfillment === 'made-to-order') return FULFILLMENT_LABEL['made-to-order']
  return null
}

function productLines(lines: CheckoutOrderLine[]): string[] {
  return lines.flatMap(({ item, product }) => {
    const label = lineLabel(product)
    return [
      `• ${product.name}${label ? ` (${label})` : ''}`,
      `  Color: ${item.color}`,
      `  Talla: ${item.size}`,
      `  Cantidad: ${item.quantity}`,
      `  Subtotal: ${formatCurrency(product.price * item.quantity)}`,
    ]
  })
}

function contactLines(data: CheckoutFormData): string[] {
  const lines = [`Nombre: ${data.contact.fullName}`, `Celular: ${data.contact.phone}`]
  if (data.contact.email) lines.push(`Correo: ${data.contact.email}`)
  return lines
}

function deliveryLines(data: CheckoutFormData): string[] {
  const { delivery } = data
  const lines = [
    `Departamento: ${delivery.department}`,
    `Provincia: ${delivery.province}`,
    `Distrito: ${delivery.district}`,
    `Dirección: ${delivery.address}`,
  ]
  if (delivery.reference) lines.push(`Referencia: ${delivery.reference}`)
  if (delivery.notes) lines.push(`Notas: ${delivery.notes}`)
  return lines
}

// Shared body — product lines, subtotal/delivery, contact and delivery blocks
// — used by both the clipboard summary and the WhatsApp message so the two
// never drift apart on content, only on greeting/framing.
function orderBody(data: CheckoutFormData, lines: CheckoutOrderLine[], subtotal: number): string[] {
  return [
    ...productLines(lines),
    '',
    `Subtotal de productos: ${formatCurrency(subtotal)}`,
    'Delivery: por coordinar',
    '',
    'DATOS',
    ...contactLines(data),
    '',
    'ENTREGA',
    ...deliveryLines(data),
  ]
}

export function buildCheckoutSummaryText(
  data: CheckoutFormData,
  lines: CheckoutOrderLine[],
  subtotal: number,
): string {
  return ['PURPLE WAVE — RESUMEN DE PEDIDO', '', ...orderBody(data, lines, subtotal)].join('\n')
}

export function buildCheckoutWhatsAppMessage(
  data: CheckoutFormData,
  lines: CheckoutOrderLine[],
  subtotal: number,
): string {
  return [
    'Hola Purple Wave 💜',
    '',
    'Quiero solicitar este pedido:',
    '',
    ...orderBody(data, lines, subtotal),
    '',
    'Quedo atento/a a la confirmación del pedido 💜',
  ].join('\n')
}

// Used by the Order Summary card notices (§7/§8) — always sourced from the
// existing commerce constants, never a second hardcoded "5-7 días".
export const MADE_TO_ORDER_NOTICE = `Tu pedido incluye productos personalizados. ${DELIVERY_COPY.madeToOrder}`
export const READY_STOCK_NOTICE = 'Disponibilidad sujeta a talla y color al confirmar el pedido.'
