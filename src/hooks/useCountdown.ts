import { useEffect, useState } from 'react'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const ZERO: CountdownParts = { days: 0, hours: 0, minutes: 0, seconds: 0 }

function diffToParts(diffMs: number): CountdownParts {
  if (diffMs <= 0) return ZERO
  const totalSeconds = Math.floor(diffMs / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

/** Ticks every second towards `targetIso`. Returns all-zero once it's passed. */
export function useCountdown(targetIso: string): CountdownParts {
  const [parts, setParts] = useState(() => diffToParts(new Date(targetIso).getTime() - Date.now()))

  useEffect(() => {
    const targetMs = new Date(targetIso).getTime()
    const tick = () => setParts(diffToParts(targetMs - Date.now()))

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [targetIso])

  return parts
}
