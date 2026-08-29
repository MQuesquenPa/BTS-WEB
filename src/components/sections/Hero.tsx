import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router'
import { ROUTES } from '@/constants/routes'
import { LIMA_2026_DATES_LABEL, LIMA_2026_FIRST_SHOW_ISO, LIMA_2026_VENUE } from '@/constants/event'
import { useCountdown } from '@/hooks/useCountdown'

const COUNTDOWN_UNITS = [
  { key: 'days', label: 'DÍAS' },
  { key: 'hours', label: 'HORAS' },
  { key: 'minutes', label: 'MINUTOS' },
  { key: 'seconds', label: 'SEGUNDOS' },
] as const

// Vite resolves this at build time. With no matching file it's just `{}` —
// the build never fails and never imports a path that doesn't exist. The
// moment hero-desktop.webp / hero-mobile.webp land in
// src/assets/images/hero/, HeroBackground picks them up automatically, with
// no code change. See the Fase 3.3 report for the full rationale.
const HERO_ARTWORK = import.meta.glob('/src/assets/images/hero/hero-{desktop,mobile}.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const HERO_DESKTOP_SRC = HERO_ARTWORK['/src/assets/images/hero/hero-desktop.webp']
const HERO_MOBILE_SRC = HERO_ARTWORK['/src/assets/images/hero/hero-mobile.webp']

export function Hero() {
  const countdown = useCountdown(LIMA_2026_FIRST_SHOW_ISO)
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
      }

  return (
    <section className="relative isolate flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-32 text-center sm:pt-36">
      <HeroBackground />

      <motion.span {...fadeUp} transition={{ duration: 0.5 }} className="font-kr text-xs tracking-[0.14em] text-purple-light">
        보라해
      </motion.span>

      <motion.h1
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="mt-5 max-w-4xl text-[clamp(2.5rem,7vw,5.25rem)] font-display font-bold leading-[1.02] tracking-tight"
      >
        BTS IS COMING
        <br />
        TO <span className="text-lavender">LIMA</span>
      </motion.h1>

      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.16 }}>
        <p className="mt-5 text-lg tracking-[0.05em] text-lavender">{LIMA_2026_DATES_LABEL}</p>
        <p className="mt-1 text-sm uppercase tracking-[0.12em] text-foreground-muted">{LIMA_2026_VENUE}</p>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.24 }}
        role="group"
        aria-label="Cuenta regresiva para BTS World Tour Lima 2026, 07 de octubre"
        className="mt-9 flex gap-5 sm:gap-8"
      >
        {COUNTDOWN_UNITS.map(({ key, label }) => (
          <div key={key} className="min-w-[52px] sm:min-w-16">
            <div className="font-display text-3xl font-bold tabular-nums sm:text-4xl">
              {String(countdown[key]).padStart(2, '0')}
            </div>
            <div className="mt-1 text-[10px] tracking-[0.1em] text-foreground-muted sm:text-xs">{label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.32 }}
        className="mx-auto mt-9 flex w-full max-w-[280px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-[14px]"
      >
        <Link
          to={ROUTES.lima2026}
          className="inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-purple px-7 text-sm font-semibold tracking-[0.02em] text-foreground transition-all hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
          style={{ boxShadow: '0 0 12px rgba(128,84,255,0.18)' }}
        >
          VER COLECCIÓN LIMA
        </Link>
        <Link
          to={ROUTES.customize}
          className="inline-flex h-[52px] w-full items-center justify-center rounded-xl px-7 text-sm font-semibold tracking-[0.02em] text-foreground transition-all hover:-translate-y-0.5 hover:border-purple-light hover:text-purple-light
            bg-white/[0.04] border border-white/[0.12]
            sm:w-auto sm:bg-transparent sm:border-white/20"
        >
          PERSONALIZA TU MERCH
        </Link>
      </motion.div>

      <p className="mt-8 text-xs text-foreground-muted">Fan-made merchandise creada en Perú para ARMY.</p>
    </section>
  )
}

// Rough silhouette skyline echoing the seven members, tallest near the center.
// Part of the CSS-only fallback — deleted in one pass once HERO_DESKTOP_SRC exists.
const SILHOUETTE_HEIGHTS = [88, 128, 104, 156, 108, 132, 92]

/**
 * Everything behind the text content. Two mutually exclusive branches:
 *  - Artwork found (HERO_DESKTOP_SRC set): <picture> + two subtle overlays.
 *  - No artwork yet: today's CSS-only glow/grid/silhouette treatment.
 * Only one Hero exists either way — this just isolates the swappable part.
 */
function HeroBackground() {
  if (HERO_DESKTOP_SRC) {
    return (
      <>
        <picture aria-hidden="true" className="pointer-events-none absolute inset-0 -z-30">
          {HERO_MOBILE_SRC ? <source media="(max-width: 767px)" srcSet={HERO_MOBILE_SRC} /> : null}
          <img
            src={HERO_DESKTOP_SRC}
            alt=""
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </picture>

        {/* Legibility fade: darkens top and bottom just enough for text/CTAs to
            stay readable regardless of what's under them, and blends the
            section into the page background below. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-background/55 via-transparent to-background"
        />
        {/* Ambient brand wash — intentionally faint; the artwork carries the mood. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 18%, rgba(128,84,255,0.16), transparent 70%)' }}
        />
      </>
    )
  }

  return (
    <>
      {/* Background: purple/red glow + faint vertical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 15%, rgba(128,84,255,0.24), transparent 70%), ' +
            'radial-gradient(ellipse 60% 50% at 15% 85%, rgba(255,49,92,0.08), transparent 70%), ' +
            'var(--color-background)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-40"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 90px)',
        }}
      />

      {/* Background: member silhouette skyline fading into the base */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[42%]">
        <div className="flex h-full items-end justify-center gap-1.5 sm:gap-2">
          {SILHOUETTE_HEIGHTS.map((height, index) => (
            <span
              key={index}
              className="w-9 rounded-t-full bg-gradient-to-b from-surface to-background sm:w-14"
              style={{ height }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-transparent" />
      </div>
    </>
  )
}
