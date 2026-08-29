export interface ColorOption {
  name: string
  hex: string
}

// Colors planned for polo customizer — physical stock subject to confirmation.
export const CUSTOMIZER_COLORS: ColorOption[] = [
  { name: 'Negro', hex: '#171720' },
  { name: 'Purple', hex: '#8054FF' },
  { name: 'Lavender', hex: '#DED5FF' },
  { name: 'Crudo', hex: '#F4F1EA' },
  { name: 'Blanco', hex: '#F8F8F2' },
]

export type StyleTemplate = 'purple-editorial' | 'lima-night' | 'fan-collage'

export interface StyleOption {
  id: StyleTemplate
  name: string
  description: string
}

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'purple-editorial',
    name: 'Purple Editorial',
    description: 'Minimalista y elegante. Tu foto protagonista con tipografía limpia.',
  },
  {
    id: 'lima-night',
    name: 'Lima Night',
    description: 'Inspiración concierto. Oscuro y vibrante con las fechas Lima 2026.',
  },
  {
    id: 'fan-collage',
    name: 'Fan Collage',
    description: 'Composición expresiva. Tus dos fotos + bias en estética fan merch.',
  },
]

export type CustomizerSize = 'S' | 'M' | 'L' | 'XL'
export const CUSTOMIZER_SIZES: CustomizerSize[] = ['S', 'M', 'L', 'XL']

export const MAX_PHOTO_BYTES = 8 * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp'

export interface CustomDesignState {
  model: 'oversized-tee'
  color: ColorOption
  size: CustomizerSize | null
  bias: string | null
  biasLabel: string | null
  customerPhoto: File | null
  customerPhotoUrl: string | null
  artistReference: File | null
  artistReferenceUrl: string | null
  style: StyleTemplate | null
}
