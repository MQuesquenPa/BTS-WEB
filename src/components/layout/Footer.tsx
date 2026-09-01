import { Link } from 'react-router'
import { Container } from '@/components/common/Container'
import { ROUTES } from '@/constants/routes'

const LINK_GROUPS = [
  {
    title: 'Shop',
    links: [
      { label: 'Shop', to: ROUTES.shop },
      { label: 'Lima 2026', to: ROUTES.lima2026 },
      { label: 'Personaliza', to: ROUTES.customize },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Members', to: ROUTES.members },
      { label: 'News', to: ROUTES.news },
    ],
  },
  {
    title: 'Purple Wave',
    links: [
      { label: 'About', to: ROUTES.about },
      { label: 'FAQ', to: '/#faq' },
    ],
  },
]

const SOCIAL_LINKS: { label: string; href: string }[] = []

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.12em] left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap font-display text-[22vw] font-bold leading-none text-foreground/[0.025] sm:text-[13vw]"
      >
        PURPLE WAVE
      </span>

      <Container className="relative py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div>
            <Link
              to={ROUTES.home}
              className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-purple shadow-glow-purple-sm" aria-hidden="true" />
              PURPLE WAVE
            </Link>
            <p className="mt-3 max-w-[220px] text-sm font-medium text-lavender">UN PEDACITO DE BTS PARA TI.</p>

            {SOCIAL_LINKS.length > 0 && (
              <ul className="mt-5 flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-foreground-muted transition-colors hover:text-purple-light"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <p id={`footer-${group.title.toLowerCase().replace(/\s+/g, '-')}`} className="mb-4 text-xs font-bold tracking-[0.08em] text-foreground-muted">
                  {group.title.toUpperCase()}
                </p>
                <ul
                  aria-labelledby={`footer-${group.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex flex-col gap-2.5"
                >
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-foreground-muted transition-colors hover:text-purple-light focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-purple-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-xs font-bold tracking-[0.08em] text-foreground-muted">JOIN THE PURPLE SIDE</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                Nuevas colecciones, Lima y drops Purple Wave.
              </p>
              <Link
                to={ROUTES.home}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-purple-light transition-colors hover:text-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
              >
                Únete →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="max-w-xl text-xs leading-relaxed text-foreground-muted">
            Purple Wave es un proyecto fan-made independiente. No está afiliado, patrocinado ni respaldado por BTS,
            BIGHIT MUSIC o HYBE.
          </p>
          <p className="shrink-0 text-xs text-foreground-muted">Made with 💜 for ARMY in Peru.</p>
        </div>
      </Container>
    </footer>
  )
}
