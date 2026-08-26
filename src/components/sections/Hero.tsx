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

// Rough silhouette skyline echoing the seven members, tallest near the center.
const SILHOUETTE_HEIGHTS = [88, 128, 104, 156, 108, 132, 92]

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
        className="mt-9 flex flex-wrap justify-center gap-4"
      >
        <Link
          to={ROUTES.lima2026}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-purple px-7 py-3.5 text-sm font-semibold tracking-[0.02em] text-foreground shadow-glow-purple transition-colors hover:bg-purple-light"
        >
          VER COLECCIÓN LIMA
        </Link>
        <Link
          to={ROUTES.customize}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-7 py-3.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-purple-light hover:text-purple-light"
        >
          PERSONALIZA TU MERCH
        </Link>
      </motion.div>

      <p className="mt-6 text-xs text-foreground-muted">Fan-made merchandise creada en Perú para ARMY.</p>
    </section>
  )
}
