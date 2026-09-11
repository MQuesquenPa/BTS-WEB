import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { ROUTES } from '@/constants/routes'
import { getMemberPhotoTreatment, resolveMemberImage } from '@/lib/member-images'
import type { Member } from '@/types/member'

interface MemberCardProps {
  member: Member
  /** 0-based line-up order — drives the corner badge's 01–07 index. */
  index: number
  /**
   * Only changes the layout at `lg:` and above — below that this renders
   * identically to a regular card, so RM rejoins the normal grid on
   * tablet/mobile without any duplicated markup (see MembersPage.tsx).
   */
  featured?: boolean
  className?: string
}

// One shared card for the index grid (regular + featured) — the featured
// variant only diverges at `lg:`, so there's a single render per member,
// never a duplicated mobile/desktop pair.
export function MemberCard({ member, index, featured = false, className = '' }: MemberCardProps) {
  const [isActive, setIsActive] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const reduceMotion = Boolean(prefersReducedMotion)

  const primarySrc = resolveMemberImage(member.primaryImage)
  const treatment = getMemberPhotoTreatment(member.slug)
  const active = isActive && !reduceMotion

  // RM is the protagonist card — a slightly stronger border/glow than the six
  // regular cards, which share one lighter, consistent treatment (Fase 9.3A §F/K).
  const borderRest = featured ? `${member.accent}59` : `${member.accent}26`
  const borderActive = featured ? `${member.accent}bf` : `${member.accent}66`
  const hoverGlow = featured ? `0 0 50px -8px ${member.accent}88` : `0 0 36px -6px ${member.accent}77`

  return (
    <Link
      to={ROUTES.memberDetail(member.slug)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      style={{
        borderColor: isActive ? borderActive : borderRest,
        boxShadow: `inset 0 0 60px 14px rgba(0,0,0,0.35)${active ? `, ${hoverGlow}` : ''}`,
      }}
      className={`group relative isolate block overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-4 focus-visible:ring-offset-background ${
        featured ? 'aspect-[3/4] lg:aspect-[21/9]' : 'aspect-[3/4]'
      } ${className}`}
    >
      {/* CAPA 1 — BACKGROUND: member accent + dark Purple Wave */}
      <div aria-hidden="true" className="absolute inset-0 -z-30" style={{ background: member.gradient }} />

      {/* CAPA 2 — TYPOGRAPHY BACKDROP: stage name, very low opacity. With a
          photo present it sits behind it and is mostly covered — that's the
          intended look, not a bug (see the Fase 9.2 report). Featured runs
          bigger and left-anchored at `lg:` so it reads as editorial type
          behind the portrait rather than a centered watermark (Fase 9.3A §E). */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-20 flex items-center overflow-hidden ${
          featured ? 'justify-center lg:justify-start' : 'justify-center'
        }`}
      >
        <span
          className={`font-display font-bold uppercase leading-none text-foreground/[0.1] transition-transform duration-[400ms] ease-out motion-reduce:transition-none ${
            active ? '-translate-y-3' : '-translate-y-1'
          } ${featured ? `text-[15vw] lg:pl-6 lg:text-[11vw] ${active ? 'lg:-translate-x-3' : ''}` : 'text-[9vw]'}`}
        >
          {member.stage}
        </span>
      </span>

      {/* CAPA 3 — FOREGROUND: full-bleed portrait, or the editorial fallback poster */}
      <div className="absolute inset-0 -z-10">
        {primarySrc ? (
          <>
            <img
              src={primarySrc}
              alt={`${member.stage} — ${member.fullName}`}
              loading="lazy"
              className={`h-full w-full object-cover transition-transform duration-[400ms] ease-out motion-reduce:transition-none [mask-image:linear-gradient(to_top,transparent,black_8%)] ${
                active ? (featured ? 'scale-[1.035]' : 'scale-[1.04]') : ''
              }`}
              style={{ objectPosition: member.imagePosition, filter: treatment.filter }}
            />
            {/* CAPA 4 — Purple Wave color treatment: unifies backgrounds/lighting across
                the seven photos without painting over skin tones. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(155deg, rgba(128,84,255,0.9), rgba(36,27,61,0.9))',
                mixBlendMode: 'color',
                opacity: active ? treatment.overlayOpacity * 0.75 : treatment.overlayOpacity,
              }}
            />
            {/* Subtle vignette — darkens the corners a touch so the portrait reads as
                a composed poster rather than a flat cropped photo (Fase 9.3A §L). */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.38) 100%)' }}
            />
            {/* Featured/desktop only: dark-to-transparent horizontal gradient. Tuned so
                the portrait reads as occupying ~roughly the right 60% of the card while
                the left ~40% stays dark enough for the RM / Kim Namjoon / Leader · Rapper
                block (Fase 9.3A §C). */}
            {featured ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden lg:block"
                style={{
                  background:
                    'linear-gradient(to right, var(--color-background) 0%, var(--color-background) 18%, transparent 42%)',
                }}
              />
            ) : null}
            {/* Light pass — a soft diagonal shine sweeping across on hover/focus only. */}
            {!reduceMotion ? (
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-y-0 -left-1/2 w-1/2 transition-transform duration-500 ease-out"
                  style={{
                    background: 'linear-gradient(75deg, transparent, rgba(255,255,255,0.12), transparent)',
                    transform: isActive ? 'translateX(260%)' : 'translateX(0%)',
                  }}
                />
              </div>
            ) : null}
          </>
        ) : (
          <FallbackPoster member={member} isActive={isActive} reduceMotion={reduceMotion} />
        )}
      </div>

      {/* CAPA 4 (cont.) — bottom legibility gradient, all cards. Holds near-full
          opacity through the text zone (up to ~48%) instead of fading early,
          so the name stays legible over light/busy source photos (Jin, V). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background from-0% via-background/75 via-45% to-transparent"
      />

      {/* CAPA 5 — UI: corner badge (index + kicker), always present whether or not a photo exists */}
      <CornerBadge member={member} index={index} />

      {/* Featured-only decorative editorial note — subtle, desktop only */}
      {featured ? (
        <span
          aria-hidden="true"
          className="absolute right-5 top-14 hidden font-display text-xs italic tracking-wide text-foreground/40 sm:right-8 lg:block"
        >
          Leading the Purple Wave
        </span>
      ) : null}

      {/* Arrow CTA — shared by all seven cards, RM included (Fase 9.3A §I/P).
          Always rendered (not hover-gated) so mobile/touch gets it without
          depending on hover; only its styling reacts to isActive. */}
      <div
        aria-hidden="true"
        className={`absolute bottom-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border opacity-75 transition-all duration-300 ease-out motion-reduce:transition-none sm:bottom-5 sm:right-5 ${
          active ? '-translate-y-0.5 translate-x-0.5 opacity-100' : ''
        }`}
        style={{
          borderColor: isActive ? member.accent : `${member.accent}55`,
          backgroundColor: isActive ? `${member.accent}26` : 'rgba(8,8,11,0.35)',
        }}
      >
        <ArrowUpRight size={14} aria-hidden="true" style={{ color: member.accent }} />
      </div>

      {/* CAPA 5 (cont.) — stage name, full name, roles — always visible, no interaction required */}
      <div
        className={`absolute inset-x-0 bottom-0 p-4 pr-14 sm:p-5 sm:pr-16 ${featured ? 'lg:max-w-md lg:p-8' : ''}`}
        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.9)' }}
      >
        <span
          className={`block font-display font-bold uppercase tracking-tight text-foreground ${
            featured ? 'text-2xl sm:text-3xl lg:text-6xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          {member.stage}
        </span>
        <span className="mt-1 block text-xs font-semibold tracking-[0.04em] text-foreground/80">
          {member.fullName}
        </span>
        <span aria-hidden="true" className="mt-2 block h-px w-6" style={{ backgroundColor: member.accent }} />
        <span
          className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: member.accent }}
        >
          {member.roles.join(' · ')}
        </span>

        <AnimatePresence initial={false}>
          {isActive ? (
            <motion.span
              key="cta"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.3 }}
              className="mt-2 block text-xs font-semibold tracking-[0.06em]"
              style={{ color: member.accent }}
            >
              MEET {member.stage.toUpperCase()}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </Link>
  )
}

// Index number + "Purple Wave Member Series" kicker — the part of the
// editorial system that stays constant whether or not a photo exists.
function CornerBadge({ member, index }: { member: Member; index: number }) {
  const number = String(index + 1).padStart(2, '0')
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 flex items-start justify-between gap-3 p-4 sm:p-5"
    >
      <span className="flex flex-col gap-1">
        <span className="font-display text-sm font-bold tracking-[0.14em]" style={{ color: member.accent }}>
          {number}
        </span>
        <span className="h-px w-4" style={{ backgroundColor: `${member.accent}88` }} />
      </span>
      <span className="text-right text-[9px] font-semibold uppercase leading-tight tracking-[0.16em] text-foreground/50">
        Purple Wave
        <br />
        Member Series
      </span>
    </div>
  )
}

// The "no photo yet" foreground — an accent line, bottom-aligned (matches
// where CornerBadge's row would otherwise sit above it). Never a bare color
// rectangle reading as a missing image.
function FallbackPoster({
  member,
  isActive,
  reduceMotion,
}: {
  member: Member
  isActive: boolean
  reduceMotion: boolean
}) {
  return (
    <div aria-hidden="true" className="flex h-full w-full flex-col items-center justify-end p-4 sm:p-5">
      <span
        className={`h-px w-10 transition-transform duration-[400ms] ease-out motion-reduce:transition-none ${
          isActive && !reduceMotion ? 'w-16' : ''
        }`}
        style={{ backgroundColor: member.accent }}
      />
    </div>
  )
}
