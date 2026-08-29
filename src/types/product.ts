// Relative import — see the note in src/data/products.ts.
import type { BiasSlug } from './member.ts'

export type ProductCategory = 'tee' | 'hoodie' | 'accessory' | 'bag'
export type ProductStyle = 'concert' | 'minimal' | 'purple' | 'lima' | 'typography'
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Único'
export type FulfillmentType = 'ready-stock' | 'made-to-order'

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  slug: string
  name: string
  price: number
  category: ProductCategory
  /** Which member this piece is associated with, or 'ot7' for group pieces. */
  member?: BiasSlug
  collection?: 'lima-2026'
  style?: ProductStyle
  badge?: string
  description: string
  colors: ProductColor[]
  sizes?: ProductSize[]
  /**
   * Licensed/final photography path, e.g. '@/assets/images/products/oversized-tee-ot7.webp'.
   * Left undefined for every product today — ProductImage renders the
   * `gradient` mockup instead. Setting this later swaps the visual with no
   * component changes.
   */
  image?: string
  hoverImage?: string
  /** Isolated product-on-plain-background shots read better with 'contain'; editorial/lifestyle shots with 'cover' (default). */
  imageFit?: 'cover' | 'contain'
  imagePosition?: string
  /** CSS gradient driving the placeholder mockup until `image` exists. */
  gradient: string
  rating?: number
  reviewsCount?: number

  // --- COMMERCIAL MODEL ---
  /** How the piece is fulfilled: ready from stock or made to order. */
  fulfillment: FulfillmentType
  /** Whether the buyer can personalize this piece (photo + bias). */
  customizable: boolean
}
