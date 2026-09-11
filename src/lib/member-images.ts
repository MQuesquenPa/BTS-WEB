import type { MemberSlug } from '@/types/member'

// Vite resolves this at build time — same pattern as Hero.tsx's artwork glob.
// `Member.primaryImage`/`hoverImage` store a plain filename (e.g. 'rm.webp'),
// not a full import, so src/data/members.ts stays safe to load from the
// Node-context build scripts (react-router.config.ts / generate-seo-files.ts
// via seo-routes.ts) — this is the one place that turns a filename into a
// real, bundled asset URL for the browser.
const MEMBER_IMAGES = import.meta.glob('/src/assets/images/members/*.{webp,jpg,jpeg,png}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export function resolveMemberImage(filename?: string): string | undefined {
  if (!filename) return undefined
  const match = Object.keys(MEMBER_IMAGES).find((path) => path.endsWith(`/${filename}`))
  return match ? MEMBER_IMAGES[match] : undefined
}

export interface MemberPhotoTreatment {
  filter?: string
  overlayOpacity: number
}

// Presentation-only photo correction — not core member data. Baseline: mild
// purple tint + slight desaturation for family cohesion across seven
// differently-lit source photos. Adjusted only where a specific photo's own
// background/lighting needs more or less of it (see the Fase 9.2 report for
// the per-photo read). Shared by MemberCard and MemberDetailPage's hero so
// the two don't drift into two different treatments of the same photo.
const PHOTO_TREATMENT: Partial<Record<MemberSlug, MemberPhotoTreatment>> = {
  jin: { overlayOpacity: 0.26 }, // very light/pastel source — needs more depth to stay legible
  suga: { overlayOpacity: 0.08 }, // already dark — avoid crushing hair/shadow detail further
  // strong blue backdrop — pulled harder toward the purple family so it doesn't
  // read as the one "blue card" next to six purple ones (Fase 9.3A §T)
  'j-hope': { filter: 'saturate(0.78) hue-rotate(-10deg)', overlayOpacity: 0.26 },
  jimin: { overlayOpacity: 0.16 }, // light hoodie — keep detail, avoid a muddy grey wash
  v: { overlayOpacity: 0.12 }, // already minimal/editorial — light touch
}
const DEFAULT_TREATMENT: MemberPhotoTreatment = { filter: 'saturate(0.92) contrast(1.03)', overlayOpacity: 0.16 }

export function getMemberPhotoTreatment(slug: MemberSlug): MemberPhotoTreatment {
  return { ...DEFAULT_TREATMENT, ...PHOTO_TREATMENT[slug] }
}
