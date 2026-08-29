// Global commercial policies — single source of truth for copy used across
// PDP, FAQ, and Customize. Per-product overrides go in products.ts only when
// a product genuinely differs from these defaults.

export const FULFILLMENT_LABEL: Record<'ready-stock' | 'made-to-order', string> = {
  'ready-stock': 'Stock disponible',
  'made-to-order': 'Bajo pedido',
}

export const DELIVERY_COPY = {
  readyStock:
    'Disponible según talla y color. El tiempo de entrega se coordina según destino.',
  madeToOrder:
    'Tiempo estimado: 5–7 días aprox. En Lima puede ser menor. Para provincias el plazo puede variar según destino y operador de envío.',
} as const

export const SHIPPING_COPY = 'Envíos a todo el Perú · Costo de delivery aparte' as const

export const SIZES_APPAREL = ['S', 'M', 'L', 'XL'] as const
