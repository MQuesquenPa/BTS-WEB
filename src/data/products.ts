// Relative import (not `@/*`): also loaded from react-router.config.ts /
// scripts/generate-seo-files.ts via seo-routes.ts, under tsconfig.node.json,
// which doesn't define the alias.
import type { Product } from '../types/product.ts'

const BLACK = { name: 'Negro', hex: '#171720' }
const PURPLE = { name: 'Purple', hex: '#8054FF' }
const LAVENDER = { name: 'Lavender', hex: '#DED5FF' }
const RED = { name: 'Lima Red', hex: '#FF315C' }
const ECRU = { name: 'Crudo', hex: '#F4F1EA' }
const WHITE = { name: 'Blanco', hex: '#F8F8F2' }

const SIZES_APPAREL = ['S', 'M', 'L', 'XL'] as const

// Catalog focused on oversized tees as the core product.
// Colors and sizes listed here are planned options — physical stock subject to confirmation.
// Every `gradient` is a placeholder; setting `image` later swaps the visual with no component changes.
// All pieces are fan-made; no HYBE/BTS affiliation.
export const PRODUCTS: Product[] = [
  // ── FLAGSHIP OVERSIZED TEES ────────────────────────────────────────────────
  {
    id: 'p1',
    slug: 'oversized-tee-ot7',
    name: 'OT7 Oversized Tee',
    price: 149.9,
    category: 'tee',
    member: 'ot7',
    style: 'concert',
    badge: 'Bestseller',
    description:
      'Corte oversized con los siete trazos de BTS impresos al frente. Minimalista y versátil — la pieza de todos los días para ARMY.',
    colors: [BLACK, PURPLE, WHITE],
    sizes: [...SIZES_APPAREL],
    gradient: 'linear-gradient(155deg, #171720 0%, #3E2E66 55%, #8054FF 120%)',
    rating: 4.8,
    reviewsCount: 64,
    fulfillment: 'ready-stock',
    customizable: false,
  },
  {
    id: 'p3',
    slug: 'lima-nights-tee',
    name: 'Lima Nights Oversized Tee',
    price: 135.9,
    category: 'tee',
    member: 'ot7',
    collection: 'lima-2026',
    style: 'lima',
    badge: 'Lima 2026',
    description:
      'Corte oversized conmemorativo con el skyline nocturno de Lima y las coordenadas del Estadio San Marcos. Fan-made para las tres noches de octubre.',
    colors: [BLACK, RED],
    sizes: [...SIZES_APPAREL],
    gradient: 'linear-gradient(160deg, #08080B 0%, #3E2E66 60%, rgba(255,49,92,0.45) 130%)',
    rating: 4.9,
    reviewsCount: 37,
    fulfillment: 'ready-stock',
    customizable: false,
  },
  {
    id: 'p6',
    slug: 'minimal-rm-tee',
    name: 'RM Oversized Tee',
    price: 129.9,
    category: 'tee',
    member: 'rm',
    style: 'minimal',
    description:
      'Corte oversized con monograma RM bordado al pecho. Para el ARMY que va a los museos y necesita el fit correcto.',
    colors: [BLACK, ECRU],
    sizes: [...SIZES_APPAREL],
    gradient: 'linear-gradient(155deg, #171720 0%, #3E2E66 130%)',
    rating: 4.6,
    reviewsCount: 19,
    fulfillment: 'ready-stock',
    customizable: false,
  },
  {
    id: 'p7',
    slug: 'jimin-95-tee',
    name: 'Jimin 95 Oversized Tee',
    price: 119.9,
    category: 'tee',
    member: 'jimin',
    style: 'typography',
    description:
      'Oversized con tipografía compuesta: el número 95 y el nombre de Jimin en composición vertical al frente. Sutil pero inequívoca para los Mochis.',
    colors: [BLACK, RED],
    sizes: [...SIZES_APPAREL],
    gradient: 'linear-gradient(155deg, #1D1D28 0%, rgba(255,49,92,0.55) 130%)',
    rating: 4.7,
    reviewsCount: 26,
    fulfillment: 'ready-stock',
    customizable: false,
  },
  // ── PERSONALIZADO (BAJO PEDIDO) ────────────────────────────────────────────
  {
    id: 'p11',
    slug: 'polo-personalizado',
    name: 'Tu Polo Personalizado',
    price: 179.9,
    category: 'tee',
    member: 'ot7',
    style: 'concert',
    badge: 'Personalizable',
    description:
      'Tu polo oversized con tu foto y tu bias favorito. Elige el color, sube la imagen que más amas y creamos la composición. Pieza única, hecha para ti.',
    colors: [BLACK, PURPLE, ECRU, WHITE],
    sizes: [...SIZES_APPAREL],
    gradient: 'linear-gradient(140deg, #3E2E66 0%, #8054FF 45%, #DED5FF 100%)',
    rating: 5.0,
    reviewsCount: 12,
    fulfillment: 'made-to-order',
    customizable: true,
  },
  // ── HOODIES ───────────────────────────────────────────────────────────────
  {
    id: 'p2',
    slug: 'purple-wave-hoodie',
    name: 'Purple Wave Hoodie',
    price: 219.9,
    category: 'hoodie',
    member: 'ot7',
    style: 'purple',
    badge: 'Nuevo',
    description:
      'Hoodie con bordado sutil Purple Wave a la altura del pecho. El aliado para las colas largas antes del show.',
    colors: [BLACK, PURPLE],
    sizes: [...SIZES_APPAREL],
    gradient: 'linear-gradient(160deg, #3E2E66 0%, #8054FF 70%, #B49CFF 130%)',
    rating: 4.9,
    reviewsCount: 41,
    fulfillment: 'ready-stock',
    customizable: false,
  },
  {
    id: 'p8',
    slug: 'seoul-to-lima-hoodie',
    name: 'Seoul to Lima Hoodie',
    price: 239.9,
    category: 'hoodie',
    member: 'ot7',
    collection: 'lima-2026',
    style: 'lima',
    badge: 'Lima 2026',
    description:
      'Hoodie edición Lima con mapa abstracto de la ruta Seúl–Lima bordado en la manga. Para llevar el viaje encima las tres noches de octubre.',
    colors: [BLACK, PURPLE],
    sizes: [...SIZES_APPAREL],
    gradient: 'linear-gradient(160deg, #171720 0%, #8054FF 90%, rgba(255,49,92,0.25) 140%)',
    rating: 4.8,
    reviewsCount: 29,
    fulfillment: 'ready-stock',
    customizable: false,
  },
  // ── ACCESORIOS ─────────────────────────────────────────────────────────────
  {
    id: 'p4',
    slug: 'seven-tote',
    name: 'Seven Tote',
    price: 69.9,
    category: 'bag',
    member: 'ot7',
    style: 'minimal',
    description:
      'Tote con siete líneas grabadas en relieve. Para el día a día y para cargar merch sin drama.',
    colors: [BLACK, ECRU],
    sizes: ['Único'],
    gradient: 'linear-gradient(160deg, #17171F 0%, #1D1D28 100%)',
    rating: 4.7,
    reviewsCount: 28,
    fulfillment: 'ready-stock',
    customizable: false,
  },
  {
    id: 'p5',
    slug: 'borahae-bracelet',
    name: 'Borahae Bracelet',
    price: 39.9,
    category: 'accessory',
    member: 'ot7',
    style: 'purple',
    badge: 'Edición limitada',
    description:
      'Pulsera ajustable de hilo trenzado en tono Borahae, ligera y discreta. Se acumula bien con el lightstick.',
    colors: [PURPLE, LAVENDER],
    sizes: ['Único'],
    gradient: 'linear-gradient(160deg, #3E2E66 0%, #B49CFF 100%)',
    rating: 4.9,
    reviewsCount: 52,
    fulfillment: 'ready-stock',
    customizable: false,
  },
]

export function findProduct(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug)
}
