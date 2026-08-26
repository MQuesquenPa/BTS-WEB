import { Link } from 'react-router'
import { Container } from '@/components/common/Container'
import { ROUTES } from '@/constants/routes'

const FOOTER_COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'Shop', to: ROUTES.shop },
      { label: 'Lima 2026', to: ROUTES.lima2026 },
      { label: 'Members', to: ROUTES.members },
      { label: 'Personaliza', to: ROUTES.customize },
    ],
  },
  {
    title: 'Info',
    links: [
      { label: 'About', to: ROUTES.about },
      { label: 'News', to: ROUTES.news },
      { label: 'Wishlist', to: ROUTES.wishlist },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 pb-12 sm:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <p id={`footer-${column.title.toLowerCase()}`} className="mb-4 font-display text-sm font-bold tracking-wide">
                {column.title.toUpperCase()}
              </p>
              <ul aria-labelledby={`footer-${column.title.toLowerCase()}`} className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-foreground-muted transition-colors hover:text-purple-light">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-6 text-xs leading-relaxed text-foreground-muted">
          <p className="mb-2">Made with 💜 for ARMY in Peru.</p>
          <p>Fan-made merchandise. No afiliado oficialmente con BTS, BIGHIT MUSIC o HYBE.</p>
        </div>
      </Container>
    </footer>
  )
}
