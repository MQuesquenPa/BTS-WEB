// BTS World Tour — Lima 2026. Shared by the Home hero and the Lima 2026 hub page.
export const LIMA_2026_DATES_LABEL = '07 · 09 · 10 OCT 2026'
export const LIMA_2026_VENUE = 'Estadio San Marcos'
export const LIMA_2026_CITY = 'Lima, Perú'
export const LIMA_2026_FIRST_SHOW_ISO = '2026-10-07T20:00:00-05:00'

// Publicly announced, not confirmed by Purple Wave — always framed as
// "estimated"/"approximate" wherever they're shown (see Fase 8.1 report).
export const LIMA_2026_START_TIME_ESTIMATE = '8:00 p. m.'
export const LIMA_2026_DURATION_ESTIMATE = '3 horas'

export interface OfficialSource {
  label: string
  description: string
  url: string
}

// Real, independently verified official/ticketing channels — not affiliated
// with Purple Wave. Single source of truth so the links are never
// hand-typed per component (see Lima2026Page.tsx).
export const LIMA_2026_OFFICIAL_SOURCES: OfficialSource[] = [
  {
    label: 'TICKETMASTER PERÚ',
    description: 'Información de entradas y evento',
    url: 'https://help.ticketmaster.pe/hc/es-419/articles/45168456892433-BTS-World-Tour',
  },
  {
    label: 'LIVE NATION PERÚ',
    description: 'Página oficial del concierto',
    url: 'https://www.livenation.com.pe/event/bts-world-tour-arirang-in-latin-america-lima-tickets-edp1664097',
  },
  {
    label: 'BIGHIT MUSIC / WEVERSE',
    description: 'Avisos oficiales del tour',
    url: 'https://weverse.io/bts/notice/34732?hl=es',
  },
]
