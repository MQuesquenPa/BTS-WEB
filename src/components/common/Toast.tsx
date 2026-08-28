import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { useToastStore } from '@/store/toastStore'

const DURATION_MS = 3200

/** Mounted once (in Layout) — reads the global toast store and renders itself. */
export function Toast() {
  const { id, message, dismissToast } = useToastStore()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!message) return
    const timer = window.setTimeout(() => dismissToast(id), DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [id, message, dismissToast])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-6" aria-live="polite">
      <AnimatePresence>
        {message ? (
          <motion.div
            key={id}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto rounded-xl border border-border bg-elevated px-5 py-3 text-sm font-medium text-foreground shadow-glow-purple-sm"
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
