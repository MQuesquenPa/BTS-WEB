// Relative import — see the note in src/data/products.ts.
import type { Member } from '../types/member.ts'

// primaryImage set for all 7 (src/assets/images/members/, .webp) — local
// dev/integration assets, not confirmed for commercial licensing (see the
// Fase 9.2 report). hoverImage stays unset until a second shot per member
// exists. imagePosition tuned per photo so each face stays in frame when
// object-cover crops a 1000x590 landscape source into a portrait card.
// Order matches official line-up order; consumed by the Members index/detail
// pages, Home's BiasSelector, and Home's Members teaser — one array, no
// duplicated per-page copies.
export const MEMBERS: Member[] = [
  {
    slug: 'rm',
    stage: 'RM',
    fullName: 'Kim Namjoon',
    roles: ['Leader', 'Rapper'],
    initial: 'RM',
    gradient: 'linear-gradient(155deg, #3E2E66, #8054FF)',
    accent: '#8054FF',
    primaryImage: 'rm.webp',
    // Shifted right per Fase 9.3A §C (face targeted ~65-72% of card width for
    // the asymmetric featured composition) — set to the requested numeric
    // target, not visually re-verified since no browser is available this session.
    imagePosition: '68% 32%',
  },
  {
    slug: 'jin',
    stage: 'Jin',
    fullName: 'Kim Seokjin',
    roles: ['Vocalist'],
    initial: 'JIN',
    gradient: 'linear-gradient(155deg, #8054FF, #B49CFF)',
    accent: '#DED5FF',
    primaryImage: 'jin.webp',
    imagePosition: '50% 32%',
  },
  {
    slug: 'suga',
    stage: 'SUGA',
    fullName: 'Min Yoongi',
    roles: ['Rapper', 'Producer'],
    initial: 'SG',
    gradient: 'linear-gradient(155deg, #17171F, #3E2E66)',
    accent: '#695d88',
    primaryImage: 'suga.webp',
    imagePosition: '35% 30%',
  },
  {
    slug: 'j-hope',
    stage: 'j-hope',
    fullName: 'Jung Hoseok',
    roles: ['Rapper', 'Dancer'],
    initial: 'JH',
    gradient: 'linear-gradient(155deg, #B49CFF, #DED5FF)',
    accent: '#B49CFF',
    primaryImage: 'j-hope.webp',
    imagePosition: '42% 32%',
  },
  {
    slug: 'jimin',
    stage: 'Jimin',
    fullName: 'Park Jimin',
    roles: ['Vocalist', 'Dancer'],
    initial: 'JM',
    gradient: 'linear-gradient(155deg, #FF315C, #8054FF)',
    accent: '#FF315C',
    primaryImage: 'jimin.webp',
    imagePosition: '58% 35%',
  },
  {
    slug: 'v',
    stage: 'V',
    fullName: 'Kim Taehyung',
    roles: ['Vocalist'],
    initial: 'V',
    gradient: 'linear-gradient(155deg, #08080B, #6B46C7)',
    accent: '#897ea7',
    primaryImage: 'v.webp',
    imagePosition: '55% 28%',
  },
  {
    slug: 'jung-kook',
    stage: 'Jung Kook',
    fullName: 'Jeon Jungkook',
    roles: ['Vocalist', 'Performer'],
    initial: 'JK',
    gradient: 'linear-gradient(155deg, #8054FF, #FF315C)',
    accent: '#9B4DFF',
    primaryImage: 'jung-kook.webp',
    imagePosition: '68% 30%',
  },
]

export function findMember(slug: string) {
  return MEMBERS.find((member) => member.slug === slug)
}
