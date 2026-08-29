import { useState } from 'react'
import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'
import { Container } from '@/components/common/Container'
import { ProductCard } from '@/components/product/ProductCard'
import { QuickView } from '@/components/product/QuickView'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'
import { PRODUCTS } from '@/data/products'
import { useWishlistStore } from '@/store/wishlistStore'
import type { Product } from '@/types/product'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Tu Purple List'),
    description: 'Tus productos favoritos de Purple Wave, guardados en un solo lugar.',
    path: ROUTES.wishlist,
    robots: 'noindex, follow',
  })

export default function WishlistPage() {
  const productIds = useWishlistStore((state) => state.productIds)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const products = productIds
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product))

  return (
    <>
      <Container className="py-12 sm:py-16">
        <div className="mb-10 max-w-lg">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">TU PURPLE LIST</h1>
          <p className="mt-3 text-sm text-foreground-muted sm:text-base">
            Los productos que guardaste para más adelante, todos en un solo lugar.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
            <span className="font-display text-lg font-semibold">Tu Purple List está vacía</span>
            <p className="max-w-sm text-sm text-foreground-muted">
              Guarda tus piezas favoritas desde el Shop tocando el corazón — las encontrarás aquí.
            </p>
            <Link
              to={ROUTES.shop}
              className="rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
            >
              Ir a Shop
            </Link>
          </div>
        )}
      </Container>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  )
}
