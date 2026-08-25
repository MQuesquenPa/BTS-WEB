interface PagePlaceholderProps {
  eyebrow?: string
  title: string
  description: string
  /** Extra debug hint (e.g. a resolved :slug param) to prove routing works. */
  meta?: string
}

export function PagePlaceholder({ eyebrow, title, description, meta }: PagePlaceholderProps) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      {eyebrow ? (
        <span className="font-kr text-xs tracking-[0.1em] text-purple-light">{eyebrow}</span>
      ) : null}
      <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
      <p className="max-w-md text-sm leading-relaxed text-foreground-muted">{description}</p>
      {meta ? (
        <code className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-lavender">
          {meta}
        </code>
      ) : null}
    </section>
  )
}
