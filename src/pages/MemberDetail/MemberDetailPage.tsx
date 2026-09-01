import { useState } from 'react'
import type { MetaFunction } from 'react-router'
import { Link, useParams } from 'react-router'
import { Container } from '@/components/common/Container'
import { ProductCard } from '@/components/product/ProductCard'
import { QuickView } from '@/components/product/QuickView'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'
import { findMember, MEMBERS } from '@/data/members'
import { PRODUCTS } from '@/data/products'
import type { Member } from '@/types/member'
import type { Product } from '@/types/product'

export const meta: MetaFunction = ({ params }) => {
  const member = findMember(params.slug ?? '')

  if (!member) {
    return buildMeta({
      title: 'Integrante no encontrado | Purple Wave',
      description: 'Este integrante no existe en Purple Wave.',
      path: ROUTES.memberDetail(params.slug ?? ''),
      robots: 'noindex',
    })
  }

  return buildMeta({
    title: pageTitle(member.stage),
    description: `Descubre la colección Purple Wave inspirada en ${member.stage} — ${member.role}.`,
    path: ROUTES.memberDetail(member.slug),
  })
}

export default function MemberDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const member = findMember(slug)

  return member ? <MemberDetail member={member} /> : <MemberNotFound />
}

function productsForMember(member: Member): { products: Product[]; isFallback: boolean } {
  const own = PRODUCTS.filter((product) => product.member === member.slug)
  if (own.length > 0) return { products: own, isFallback: false }
  return { products: PRODUCTS.filter((product) => product.member === 'ot7').slice(0, 4), isFallback: true }
}

function MemberDetail({ member }: { member: Member }) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const { products, isFallback } = productsForMember(member)

  const index = MEMBERS.findIndex((candidate) => candidate.slug === member.slug)
  const prev = MEMBERS[(index - 1 + MEMBERS.length) % MEMBERS.length]
  const next = MEMBERS[(index + 1) % MEMBERS.length]

  return (
    <>
      <Container className="py-10 sm:py-14">
        <Link
          to={ROUTES.members}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-muted transition-colors hover:text-purple-light"
        >
          ← Volver a Members
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-14">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border"
            style={{ background: member.gradient }}
          >
            {member.photo ? (
              <img
                src={member.photo}
                alt={`${member.stage}, integrante de BTS`}
                loading="eager"
                className="h-full w-full object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center font-display text-8xl font-bold text-foreground/90"
              >
                {member.initial}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-[0.14em] text-purple-light">BTS · OT7</span>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{member.stage}</h1>
            <span className="text-sm text-foreground-muted">{member.role}</span>

            <Link
              to={`${ROUTES.shop}?bias=${member.slug}`}
              className="mt-4 inline-flex min-h-11 w-fit items-center justify-center rounded-xl bg-purple px-6 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
            >
              Shop by {member.stage}
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              {isFallback ? 'RECOMENDADO PARA TI' : `COLECCIÓN ${member.stage.toUpperCase()}`}
            </h2>
            {isFallback ? (
              <span className="text-xs text-foreground-muted">
                Su colección individual llega pronto — mientras tanto, lo mejor de OT7.
              </span>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-border pt-6 text-sm">
          {prev ? (
            <Link
              to={ROUTES.memberDetail(prev.slug)}
              className="text-foreground-muted transition-colors hover:text-purple-light"
            >
              ← {prev.stage}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={ROUTES.memberDetail(next.slug)}
              className="text-foreground-muted transition-colors hover:text-purple-light"
            >
              {next.stage} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </Container>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  )
}

function MemberNotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-display text-sm tracking-[0.2em] text-purple-light">404</span>
      <h1 className="max-w-xl font-display text-4xl font-bold leading-tight md:text-5xl">Este integrante no existe</h1>
      <p className="max-w-sm text-sm leading-relaxed text-foreground-muted">
        Puede que el link esté mal escrito. Vuelve a Members y elige a tu bias.
      </p>
      <Link
        to={ROUTES.members}
        className="mt-2 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
      >
        Ir a Members
      </Link>
    </section>
  )
}
