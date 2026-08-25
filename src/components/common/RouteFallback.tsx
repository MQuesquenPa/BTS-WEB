export function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <span className="text-sm text-foreground-muted">Cargando…</span>
    </div>
  )
}
