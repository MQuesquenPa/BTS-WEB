import { X } from 'lucide-react'
import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'
import { Container } from '@/components/common/Container'
import { ProductImage } from '@/components/product/ProductImage'
import { QuantityStepper } from '@/components/product/QuantityStepper'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'
import { PRODUCTS } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Purple Bag'),
    description: 'Revisa los productos en tu carrito antes de finalizar la compra.',
    path: ROUTES.cart,
    robots: 'noindex, follow',
  })

interface CartLine {
  item: CartItem
  product: Product
}

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const lines: CartLine[] = items
    .map((item) => {
      const product = PRODUCTS.find((candidate) => candidate.id === item.productId)
      return product ? { item, product } : null
    })
    .filter((line): line is CartLine => Boolean(line))

  const subtotal = lines.reduce((total, { item, product }) => total + item.quantity * product.price, 0)

  return (
    <Container className="py-12 sm:py-16">
      <div className="mb-10 max-w-lg">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">PURPLE BAG</h1>
        <p className="mt-3 text-sm text-foreground-muted sm:text-base">Revisa tus productos antes de continuar.</p>
      </div>

      {lines.length > 0 ? (
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <ul className="flex flex-col gap-5">
            {lines.map(({ item, product }) => (
              <li
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-4 rounded-2xl border border-border bg-surface p-4"
              >
                <Link
                  to={ROUTES.product(product.slug)}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28"
                >
                  <ProductImage product={product} />
                </Link>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={ROUTES.product(product.slug)}
                      className="font-display text-sm font-semibold transition-colors hover:text-purple-light sm:text-base"
                    >
                      {product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(item)}
                      aria-label={`Quitar ${product.name} del carrito`}
                      className="flex min-h-9 min-w-9 items-center justify-center rounded-full text-foreground-muted transition-colors hover:text-accent"
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  </div>
                  <span className="text-xs text-foreground-muted">
                    {item.color} · Talla {item.size}
                  </span>
                  <div className="mt-auto flex items-center justify-between">
                    <QuantityStepper quantity={item.quantity} onChange={(quantity) => updateQuantity(item, quantity)} />
                    <span className="font-display text-sm font-semibold sm:text-base">
                      S/ {(product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-fit rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-bold">Resumen</h2>
            <div className="mt-4 flex items-center justify-between text-sm text-foreground-muted">
              <span>Subtotal</span>
              <span className="font-semibold text-foreground">S/ {subtotal.toFixed(2)}</span>
            </div>
            <p className="mt-2 text-xs text-foreground-muted">Envío y totales finales se calculan al continuar.</p>
            <Link
              to={ROUTES.checkout}
              className="mt-6 flex min-h-11 items-center justify-center rounded-xl bg-purple px-6 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
            >
              Ir a Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <span className="font-display text-lg font-semibold">Tu Purple Bag está vacía</span>
          <p className="max-w-sm text-sm text-foreground-muted">
            Agrega productos desde el Shop y aparecerán aquí, listos para el checkout.
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
  )
}
