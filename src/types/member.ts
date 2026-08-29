export type MemberSlug = 'rm' | 'jin' | 'suga' | 'j-hope' | 'jimin' | 'v' | 'jung-kook'

export type BiasSlug = MemberSlug | 'ot7'

export interface Member {
  slug: MemberSlug
  stage: string
  role: string
  initial: string
  /** CSS gradient used for the portrait placeholder when `photo` is missing. */
  gradient: string
  /**
   * Licensed/final portrait, e.g. '@/assets/images/members/rm.webp'.
   * Undefined falls back to the gradient + initial placeholder — that's the
   * current state for every member (see the Fase 3.2 report).
   */
  photo?: string
}
