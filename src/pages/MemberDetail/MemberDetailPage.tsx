import { useState } from 'react'
import type { MetaFunction } from 'react-router'
import { Link, useParams } from 'react-router'
import { Container } from '@/components/common/Container'
import { ProductCard } from '@/components/product/ProductCard'
import { QuickView } from '@/components/product/QuickView'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'
import { getMemberPhotoTreatment, resolveMemberImage } from '@/lib/member-images'
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
    description: `Descubre la colección Purple Wave inspirada en ${member.stage} — ${member.roles.join(' · ')}.`,
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
  const position = `${String(index + 1).padStart(2, '0')} / ${String(MEMBERS.length).padStart(2, '0')}`

  return (
    <>
      <Container className="py-10 sm:py-14">
        <Link
          to={ROUTES.members}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-muted transition-colors hover:text-purple-light"
        >
          ← Volver a Members
        </Link>

        {/* Detail hero — editorial, not a Wikipedia infobox */}
        <div className="mt-6 grid gap-10 lg:grid-cols-[420px_1fr] lg:gap-14">
          <div
            className="relative isolate aspect-[3/4] overflow-hidden rounded-2xl border"
            style={{
              borderColor: `${member.accent}33`,
              boxShadow: 'inset 0 0 70px 16px rgba(0,0,0,0.35)',
            }}
          >
            <div aria-hidden="true" className="absolute inset-0 -z-20" style={{ background: member.gradient }} />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
            >
              <span className="font-display text-[13rem] font-bold uppercase leading-none text-foreground/[0.08] sm:text-[16rem]">
                {member.stage}
              </span>
            </span>

            {(() => {
              const heroSrc = resolveMemberImage(member.primaryImage)
              if (!heroSrc) {
                return (
                  <div aria-hidden="true" className="relative flex h-full flex-col justify-between p-6">
                    <span className="font-display text-sm font-bold tracking-[0.1em]" style={{ color: member.accent }}>
                      {position}
                    </span>
                    <span className="text-right text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-foreground/45">
                      Purple Wave
                      <br />
                      Member Series
                    </span>
                  </div>
                )
              }

              const treatment = getMemberPhotoTreatment(member.slug)
              return (
                <>
                  <img
                    src={heroSrc}
                    alt={`${member.stage} — ${member.fullName}`}
                    loading="eager"
                    className="h-full w-full object-cover [mask-image:linear-gradient(to_top,transparent,black_6%)]"
                    style={{ objectPosition: member.imagePosition, filter: treatment.filter }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: 'linear-gradient(155deg, rgba(128,84,255,0.9), rgba(36,27,61,0.9))',
                      mixBlendMode: 'color',
                      opacity: treatment.overlayOpacity,
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-6"
                  >
                    <span className="font-display text-sm font-bold tracking-[0.1em]" style={{ color: member.accent }}>
                      {position}
                    </span>
                    <span className="text-right text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-foreground/70">
                      Purple Wave
                      <br />
                      Member Series
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent"
                  />
                </>
              )
            })()}
          </div>

          <div className="flex flex-col justify-center gap-3">
            <span className="text-xs font-semibold tracking-[0.14em] text-purple-light">BTS · OT7 · {position}</span>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] sm:text-7xl">{member.stage}</h1>
            <span className="text-sm font-medium tracking-[0.02em] text-foreground-muted sm:text-base">
              {member.fullName}
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm"
              style={{ color: member.accent }}
            >
              {member.roles.join(' · ')}
            </span>

            <Link
              to={`${ROUTES.shop}?bias=${member.slug}`}
              className="mt-5 inline-flex min-h-11 w-fit items-center justify-center rounded-xl bg-purple px-6 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2"
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

        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
          {prev ? (
            <Link
              to={ROUTES.memberDetail(prev.slug)}
              className="flex flex-col gap-1.5 transition-colors hover:text-purple-light"
            >
              <span className="text-[10px] font-semibold tracking-[0.14em] text-foreground-muted">← PREVIOUS</span>
              <span className="flex items-center gap-2 font-display text-lg font-bold uppercase">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: prev.accent }} />
                {prev.stage}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={ROUTES.memberDetail(next.slug)}
              className="flex flex-col items-end gap-1.5 text-right transition-colors hover:text-purple-light"
            >
              <span className="text-[10px] font-semibold tracking-[0.14em] text-foreground-muted">NEXT →</span>
              <span className="flex items-center gap-2 font-display text-lg font-bold uppercase">
                {next.stage}
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: next.accent }} />
              </span>
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
