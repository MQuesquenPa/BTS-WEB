import { Link } from 'react-router'
import { Container } from '@/components/common/Container'
import { ROUTES } from '@/constants/routes'
import { MEMBERS } from '@/data/members'

// Deliberately text-first (pill links, not the gradient avatars BiasSelector
// already uses above) — a short teaser into /members, not a second bias
// picker competing with the one that's already on this page.
export function MembersPreview() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="font-kr text-xs tracking-[0.14em] text-purple-light">7/7</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">MEET THE SEVEN</h2>
          <p className="max-w-md text-sm text-foreground-muted sm:text-base">
            Un vistazo rápido a cada integrante — y a la colección que le dedicamos.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-2.5">
            {MEMBERS.map((member) => (
              <Link
                key={member.slug}
                to={ROUTES.memberDetail(member.slug)}
                className="rounded-full border border-border px-4 py-2 text-xs font-semibold tracking-[0.04em] text-foreground-muted transition-colors hover:border-purple-light hover:text-purple-light"
              >
                {member.stage}
              </Link>
            ))}
          </div>

          <Link
            to={ROUTES.members}
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-purple px-6 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
          >
            Ver todos los integrantes
          </Link>
        </div>
      </Container>
    </section>
  )
}
