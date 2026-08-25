export const SITE_NAME = 'Purple Wave'

// TODO: reemplazar por el dominio real antes de salir a producción.
export const SITE_URL = 'https://purplewave.pe'

export const DEFAULT_DESCRIPTION =
  'Merch fan-made para ARMY Perú. Colección inspirada en BTS World Tour Lima 2026 — ropa, accesorios y piezas personalizadas creadas por y para la comunidad.'

export const DEFAULT_TITLE = `${SITE_NAME} · Fan-made BTS Merch Perú`

export function pageTitle(section?: string): string {
  return section ? `${section} · ${SITE_NAME}` : DEFAULT_TITLE
}
