import type { Member } from '@/types/member'

// No `photo` set for any member yet — every entry falls back to the
// gradient + initial placeholder until a licensed portrait lands in
// src/assets/images/members/ (see Fase 3.2 report).
// Order matches official line-up order; consumed by both the Members teaser
// (later phases) and the Home bias selector.
export const MEMBERS: Member[] = [
  { slug: 'rm', stage: 'RM', role: 'Líder · Rapero', initial: 'RM', gradient: 'linear-gradient(155deg, #3E2E66, #8054FF)' },
  { slug: 'jin', stage: 'Jin', role: 'Vocalista', initial: 'JIN', gradient: 'linear-gradient(155deg, #8054FF, #B49CFF)' },
  { slug: 'suga', stage: 'SUGA', role: 'Productor · Rapero', initial: 'SG', gradient: 'linear-gradient(155deg, #17171F, #3E2E66)' },
  { slug: 'jhope', stage: 'j-hope', role: 'Bailarín principal', initial: 'JH', gradient: 'linear-gradient(155deg, #B49CFF, #DED5FF)' },
  { slug: 'jimin', stage: 'Jimin', role: 'Vocalista', initial: 'JM', gradient: 'linear-gradient(155deg, #FF315C, #8054FF)' },
  { slug: 'v', stage: 'V', role: 'Vocalista', initial: 'V', gradient: 'linear-gradient(155deg, #08080B, #6B46C7)' },
  { slug: 'jungkook', stage: 'Jung Kook', role: 'Vocalista', initial: 'JK', gradient: 'linear-gradient(155deg, #8054FF, #FF315C)' },
]

export function findMember(slug: string) {
  return MEMBERS.find((member) => member.slug === slug)
}
