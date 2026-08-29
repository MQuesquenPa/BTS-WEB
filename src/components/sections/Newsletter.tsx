import { useState, type FormEvent } from 'react'
import { Container } from '@/components/common/Container'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'invalid' | 'submitted'

// No backend exists yet — submitting only validates the email locally and
// shows an honest "coming soon" message. It never claims to have
// subscribed anyone to a real list.
export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(EMAIL_PATTERN.test(email.trim()) ? 'submitted' : 'invalid')
  }

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(128,84,255,0.18), transparent 65%), var(--color-background-secondary)',
        }}
      />
      <Container className="max-w-xl text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">JOIN THE PURPLE SIDE</h2>
        <p className="mt-3 text-sm text-foreground-muted sm:text-base">
          Sé de los primeros en enterarte cuando lancemos nuevas colecciones y el personalizador completo.
        </p>

        {status === 'submitted' ? (
          <p className="mt-6 rounded-xl border border-purple-light/40 bg-purple/10 px-5 py-4 text-sm text-lavender">
            ¡Gracias! Todavía no tenemos newsletter activa — muy pronto podrás suscribirte de verdad. 💜
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Correo electrónico</span>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setStatus('idle')
                }}
                placeholder="tu@correo.com"
                aria-invalid={status === 'invalid'}
                className="min-h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground placeholder:text-foreground-muted focus:border-purple-light focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-xl bg-purple px-6 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
            >
              Unirme
            </button>
          </form>
        )}
        {status === 'invalid' ? <p className="mt-3 text-xs text-accent">Ingresa un correo válido.</p> : null}
      </Container>
    </section>
  )
}
