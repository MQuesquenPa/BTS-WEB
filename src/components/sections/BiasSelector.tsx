import { motion } from 'framer-motion'
import { useState } from 'react'
import { Container } from '@/components/common/Container'
import { ProductCard } from '@/components/product/ProductCard'
import { MEMBERS } from '@/data/members'
import { PRODUCTS } from '@/data/products'
import type { BiasSlug } from '@/types/member'
import type { Product } from '@/types/product'

interface BiasSelectorProps {
  onQuickView: (product: Product) => void
}

const OT7_GRADIENT = 'linear-gradient(135deg, #8054FF 0%, #FF315C 50%, #B49CFF 100%)'

function productsForBias(bias: BiasSlug): { products: Product[]; isFallback: boolean } {
  const ot7Products = PRODUCTS.filter((product) => product.member === 'ot7')
  if (bias === 'ot7') return { products: ot7Products.slice(0, 4), isFallback: false }

  const own = PRODUCTS.filter((product) => product.member === bias)
  if (own.length === 0) return { products: ot7Products.slice(0, 4), isFallback: true }
  return { products: [...own, ...ot7Products].slice(0, 4), isFallback: false }
}

export function BiasSelector({ onQuickView }: BiasSelectorProps) {
  // Stable default (OT7) on both the prerendered HTML and the first client
  // render — interaction only changes it after hydration, so there's no
  // server/client text mismatch.
  const [selectedBias, setSelectedBias] = useState<BiasSlug>('ot7')

  const selectedMember = MEMBERS.find((member) => member.slug === selectedBias)
  const { products, isFallback } = productsForBias(selectedBias)
  const displayName = selectedBias === 'ot7' ? 'OT7' : (selectedMember?.stage ?? selectedBias)

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mb-8 flex flex-col items-center gap-2 text-center sm:mb-12">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">WHO&apos;S YOUR BIAS?</h2>
          <p className="max-w-md text-sm text-foreground-muted sm:text-base">
            Elige a tu integrante y descubre qué le queda mejor.
          </p>
        </div>

        <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:justify-center sm:overflow-visible sm:px-0">
          {MEMBERS.map((member) => (
            <BiasButton
              key={member.slug}
              label={member.stage}
              initial={member.initial}
              gradient={member.gradient}
              photo={member.photo}
              isSelected={selectedBias === member.slug}
              onSelect={() => setSelectedBias(member.slug)}
            />
          ))}
          <BiasButton
            label="OT7"
            initial="7"
            gradient={OT7_GRADIENT}
            isSelected={selectedBias === 'ot7'}
            onSelect={() => setSelectedBias('ot7')}
          />
        </div>

        <div className="mt-12">
          <div className="mb-6 flex flex-col items-center gap-1 text-center">
            <h3 className="font-display text-lg text-purple-light">
              {selectedBias === 'ot7' ? 'RECOMENDADO PARA OT7' : `RECOMENDADO PARA ${displayName.toUpperCase()}`}
            </h3>
            {selectedBias === 'ot7' ? (
              <span className="font-kr text-xs tracking-[0.14em] text-foreground-muted">7/7 · Seven together.</span>
            ) : isFallback ? (
              <span className="text-xs text-foreground-muted">
                Su colección individual llega pronto — mientras tanto, lo mejor de OT7.
              </span>
            ) : null}
          </div>

          <motion.div
            key={selectedBias}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

interface BiasButtonProps {
  label: string
  initial: string
  gradient: string
  photo?: string
  isSelected: boolean
  onSelect: () => void
}

function BiasButton({ label, initial, gradient, photo, isSelected, onSelect }: BiasButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className="flex shrink-0 flex-col items-center gap-2"
    >
      <span
        className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full font-display text-sm font-bold text-foreground transition-all duration-200 sm:h-20 sm:w-20 ${
          isSelected ? 'scale-105 shadow-glow-purple' : 'opacity-75 hover:opacity-100'
        }`}
        style={{
          background: gradient,
          outline: isSelected ? '2px solid var(--color-purple-light)' : '2px solid transparent',
          outlineOffset: 3,
        }}
      >
        {photo ? (
          <>
            <img
              src={photo}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover object-top"
              style={{ filter: 'grayscale(0.25) contrast(1.08) saturate(0.9)' }}
            />
            {/* Unifies six different photo styles under one tone instead of seven random treatments. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: 'linear-gradient(155deg, rgba(62,46,102,0.35), rgba(8,8,11,0.05))', mixBlendMode: 'multiply' }}
            />
          </>
        ) : (
          initial
        )}
      </span>
      <span className={`text-xs font-medium ${isSelected ? 'text-purple-light' : 'text-foreground-muted'}`}>{label}</span>
    </button>
  )
}
