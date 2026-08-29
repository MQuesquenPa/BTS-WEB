import { Heart } from 'lucide-react'
import { useState } from 'react'
import type { MetaFunction } from 'react-router'
import { Link, useParams } from 'react-router'
import { Container } from '@/components/common/Container'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductImage } from '@/components/product/ProductImage'
import { QuantityStepper } from '@/components/product/QuantityStepper'
import { QuickView } from '@/components/product/QuickView'
import { VariantPicker } from '@/components/product/VariantPicker'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'
import { findProduct, PRODUCTS } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import { useWishlistStore } from '@/store/wishlistStore'
import type { Product, ProductSize } from '@/types/product'

export const meta: MetaFunction = ({ params }) => {
  const product = findProduct(params.slug ?? '')

  if (!product) {
    return buildMeta({
      title: 'Producto no encontrado | Purple Wave',
      description: 'Este producto no existe o ya no está disponible en el catálogo Purple Wave.',
      path: ROUTES.product(params.slug ?? ''),
      robots: 'noindex',
    })
  }

  return buildMeta({
    title: pageTitle(product.name),
    description: product.description,
    path: ROUTES.product(product.slug),
  })
}

export default function ProductPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const product = findProduct(slug)

  return product ? <ProductDetail product={product} /> : <ProductNotFound />
}

// Minimum-viable, honest Product schema: only fields we can back with real
// data. No aggregateRating/review (the `rating`/`reviewsCount` on Product are
// display-only mock numbers, not real reviews — surfacing them as review
// schema would be exactly the fabricated markup the spec forbids), no sku,
// no brand entity, no image unless a real photo exists. `availability` is
// InStock because that reflects how the site actually behaves today — every
// listed product can be added to the cart, nothing here gates on real stock.
function buildProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    ...(product.image ? { image: product.image } : {}),
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'PEN',
      availability: 'https://schema.org/InStock',
    },
  }
}

function relatedProducts(product: Product, all: Product[]): Product[] {
  const others = all.filter((candidate) => candidate.id !== product.id)
  const sameCategory = others.filter((candidate) => candidate.category === product.category)
  const sameMember = others.filter(
    (candidate) => candidate.member === product.member && !sameCategory.includes(candidate),
  )
  const rest = others.filter((candidate) => !sameCategory.includes(candidate) && !sameMember.includes(candidate))
  return [...sameCategory, ...sameMember, ...rest].slice(0, 3)
}

function ProductDetail({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? '')
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product.sizes && product.sizes.length > 1 ? null : (product.sizes?.[0] ?? null),
  )
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const addItem = useCartStore((state) => state.addItem)
  const showToast = useToastStore((state) => state.showToast)
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id))
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)

  function handleAddToCart() {
    if (product.sizes && product.sizes.length > 1 && !selectedSize) {
      setSizeError(true)
      showToast('Selecciona una talla')
      return
    }
    addItem({ productId: product.id, size: selectedSize ?? 'Único', color: selectedColor, quantity })
    showToast('Added to your Purple Bag 💜')
  }

  function handleWishlistClick() {
    const added = toggleWishlist(product.id)
    showToast(added ? 'Guardado en tu Purple List 💜' : 'Eliminado de tu Purple List')
  }

  const related = relatedProducts(product, PRODUCTS)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductJsonLd(product)) }}
      />

      <Container className="py-10 sm:py-14">
        <Link
          to={ROUTES.shop}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-muted transition-colors hover:text-purple-light"
        >
          ← Volver a Shop
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="aspect-square overflow-hidden rounded-2xl border border-border">
            <ProductImage product={product} priority />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              {product.member ? (
                <span className="text-xs font-semibold tracking-[0.08em] text-purple-light">
                  {product.member === 'ot7' ? 'OT7' : product.member.toUpperCase()}
                </span>
              ) : null}
              {product.collection === 'lima-2026' ? (
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.06em] text-accent">
                  LIMA 2026
                </span>
              ) : null}
            </div>

            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{product.name}</h1>
            <span className="font-display text-2xl">S/ {product.price.toFixed(2)}</span>
            <p className="text-sm leading-relaxed text-foreground-muted">{product.description}</p>

            <VariantPicker
              colors={product.colors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={(size) => {
                setSelectedSize(size)
                setSizeError(false)
              }}
              sizeError={sizeError}
            />

            <div className="flex items-center gap-3">
              <span className="text-xs tracking-[0.08em] text-foreground-muted">CANTIDAD</span>
              <QuantityStepper quantity={quantity} onChange={setQuantity} />
            </div>

            <div className="mt-1 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                className="min-h-11 flex-1 rounded-xl bg-purple px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light sm:flex-none"
              >
                Add to Purple Bag
              </button>
              <button
                type="button"
                onClick={handleWishlistClick}
                aria-pressed={isWishlisted}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-semibold tracking-[0.02em] text-foreground transition-colors hover:border-purple-light hover:text-purple-light"
              >
                <Heart
                  size={16}
                  aria-hidden="true"
                  fill={isWishlisted ? 'currentColor' : 'none'}
                  className={isWishlisted ? 'text-accent' : ''}
                />
                {isWishlisted ? 'Guardado en tu Purple List' : 'Guardar en Wishlist'}
              </button>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
              Pieza fan-made producida en Perú, bajo pedido. ¿Dudas sobre tallas o envío?{' '}
              <Link to={ROUTES.about} className="underline underline-offset-2 transition-colors hover:text-purple-light">
                Escríbenos
              </Link>
              .
            </p>
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-20">
            <h2 className="mb-6 font-display text-2xl font-bold sm:text-3xl">YOU MAY ALSO LIKE</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
              {related.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  )
}

function ProductNotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-display text-sm tracking-[0.2em] text-purple-light">404</span>
      <h1 className="max-w-xl font-display text-4xl font-bold leading-tight md:text-5xl">
        Este producto no existe (todavía)
      </h1>
      <p className="max-w-sm text-sm leading-relaxed text-foreground-muted">
        Puede que el link esté mal escrito o que la pieza ya no esté disponible. Vuelve al Shop y sigue explorando.
      </p>
      <Link
        to={ROUTES.shop}
        className="mt-2 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
      >
        Ir a Shop
      </Link>
    </section>
  )
}
