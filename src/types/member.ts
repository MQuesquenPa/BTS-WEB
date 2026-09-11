export type MemberSlug = 'rm' | 'jin' | 'suga' | 'j-hope' | 'jimin' | 'v' | 'jung-kook'

export type BiasSlug = MemberSlug | 'ot7'

export interface Member {
  slug: MemberSlug
  stage: string
  /** Real, natural case (e.g. "Kim Namjoon") — components apply `uppercase` for the poster look. */
  fullName: string
  /** Natural case (e.g. "Leader", "Rapper") — components apply `uppercase` where the campaign look wants it. */
  roles: string[]
  initial: string
  /** CSS gradient — card/hero background and the small BiasSelector avatar background. */
  gradient: string
  /** Single representative hex used for glow/CTA/role-label accents — see Fase 9 report for the per-member direction. */
  accent: string
  /**
   * Plain filename only (e.g. 'rm.webp'), not a path or import — resolved to
   * a real bundled URL by src/lib/member-images.ts, the one place that
   * touches Vite's asset pipeline (see the note there for why). The file
   * itself lives in src/assets/images/members/. Undefined falls back to the
   * poster-style editorial treatment (see MemberCard's FallbackPoster) —
   * never a bare color rectangle.
   */
  primaryImage?: string
  /** Same filename convention as primaryImage. Shown via crossfade on hover/focus when set. No fake/simulated hover state when absent. */
  hoverImage?: string
  /** Per-member object-position override for primaryImage/hoverImage, when a centered crop isn't right. */
  imagePosition?: string
  /**
   * Small circular avatar used only by Home's BiasSelector — a tighter crop
   * than primaryImage's editorial portrait. Undefined falls back to the
   * gradient + initial placeholder there (unchanged, Home isn't touched in
   * this phase).
   */
  photo?: string
}
