export const SITE_NAME = 'Purple Wave'

export const DEFAULT_DESCRIPTION =
  'Merch fan-made creada en Perú para ARMY. Descubre colecciones inspiradas en BTS, personaliza tu merch y prepárate para Lima 2026.'

export const DEFAULT_TITLE = `${SITE_NAME} | Merch fan-made para ARMY Perú`

export function pageTitle(section?: string): string {
  return section ? `${section} | ${SITE_NAME}` : DEFAULT_TITLE
}
