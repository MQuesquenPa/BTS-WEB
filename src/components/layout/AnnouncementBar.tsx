import { Sparkles, X } from 'lucide-react'
import { useState } from 'react'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-gradient-to-r from-surface via-purple-deep to-surface px-10 py-2 text-center text-xs font-semibold tracking-[0.06em] text-lavender">
      <span className="inline-flex items-center justify-center gap-2">
        <Sparkles size={12} aria-hidden="true" />
        BTS WORLD TOUR · LIMA 2026 · 07 / 09 / 10 OCT 💜
      </span>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        aria-label="Cerrar aviso"
        className="absolute right-2 top-1/2 flex min-h-8 min-w-8 -translate-y-1/2 items-center justify-center rounded-full text-lavender/80 transition-colors hover:text-foreground"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  )
}
