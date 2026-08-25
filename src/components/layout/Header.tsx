import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { ROUTES } from '@/constants/routes'

const NAV_LINKS = [
  { label: 'Shop', to: ROUTES.shop },
  { label: 'Lima 2026', to: ROUTES.lima2026 },
  { label: 'Members', to: ROUTES.members },
  { label: 'News', to: ROUTES.news },
  { label: 'Personaliza', to: ROUTES.customize },
  { label: 'About', to: ROUTES.about },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link
          to={ROUTES.home}
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-purple shadow-glow-purple-sm" aria-hidden="true" />
          PURPLE WAVE
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-light ${
                  isActive ? 'text-purple-light' : 'text-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Buscar"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-full text-foreground transition-colors hover:text-purple-light md:inline-flex"
          >
            <Search size={18} aria-hidden="true" />
          </button>
          <Link
            to={ROUTES.wishlist}
            aria-label="Wishlist"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-foreground transition-colors hover:text-purple-light"
          >
            <Heart size={18} aria-hidden="true" />
          </Link>
          <Link
            to={ROUTES.cart}
            aria-label="Carrito"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-foreground transition-colors hover:text-purple-light"
          >
            <ShoppingBag size={18} aria-hidden="true" />
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-foreground md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {isMenuOpen ? (
        <nav className="flex flex-col gap-1 border-t border-border px-6 pb-6 pt-2 md:hidden" aria-label="Navegación móvil">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `flex min-h-11 items-center rounded-lg px-2 font-display text-lg ${
                  isActive ? 'text-purple-light' : 'text-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
