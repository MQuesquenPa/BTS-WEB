import { useState } from 'react'
import { Link } from 'react-router'
import { Modal } from '@/components/common/Modal'
import { ProductImage } from '@/components/product/ProductImage'
import { VariantPicker } from '@/components/product/VariantPicker'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import type { Product, ProductSize } from '@/types/product'

interface QuickViewProps {
  product: Product | null
  onClose: () => void
}

export function QuickView({ product, onClose }: QuickViewProps) {
  return (
    <Modal isOpen={!!product} onClose={onClose} title={product ? `Quick view — ${product.name}` : 'Quick view'}>
      {/* Keyed by product id: switching products remounts this with fresh
          variant/quantity state instead of resetting it via an effect. */}
      {product ? <QuickViewContent key={product.id} product={product} onClose={onClose} /> : null}
    </Modal>
  )
}

function QuickViewContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? '')
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product.sizes && product.sizes.length > 1 ? null : (product.sizes?.[0] ?? null),
  )
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const showToast = useToastStore((state) => state.showToast)

  function handleAddToCart() {
    if (product.sizes && product.sizes.length > 1 && !selectedSize) {
      setSizeError(true)
      showToast('Selecciona una talla')
      return
    }
    addItem({ productId: product.id, size: selectedSize ?? 'Único', color: selectedColor, quantity })
    showToast('Added to your Purple Bag 💜')
    onClose()
  }

  return (
    <div className="grid gap-0 sm:grid-cols-2">
      <div className="aspect-square sm:aspect-auto sm:h-full">
        <ProductImage product={product} priority className="sm:rounded-l-2xl" />
      </div>

      <div className="flex flex-col gap-5 p-6">
        {product.member ? (
          <span className="text-xs font-semibold tracking-[0.08em] text-purple-light">
            {product.member === 'ot7' ? 'OT7' : product.member.toUpperCase()}
          </span>
        ) : null}
        <h3 className="font-display text-xl font-bold leading-tight">{product.name}</h3>
        <span className="-mt-3 font-display text-lg">S/ {product.price.toFixed(2)}</span>
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
          <div className="flex items-center gap-3 rounded-lg border border-border px-1">
            <button
              type="button"
              onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
              aria-label="Reducir cantidad"
              className="flex min-h-11 min-w-9 items-center justify-center text-lg"
            >
              −
            </button>
            <span className="min-w-4 text-center text-sm">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((qty) => qty + 1)}
              aria-label="Aumentar cantidad"
              className="flex min-h-11 min-w-9 items-center justify-center text-lg"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-1 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="min-h-11 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
          >
            Add to Cart
          </button>
          <Link
            to={`/product/${product.slug}`}
            onClick={onClose}
            className="text-center text-xs font-medium text-foreground-muted underline-offset-4 transition-colors hover:text-purple-light hover:underline"
          >
            Ver producto completo
          </Link>
        </div>
      </div>
    </div>
  )
}
