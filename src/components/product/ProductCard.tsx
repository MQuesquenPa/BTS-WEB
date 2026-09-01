import { Heart } from 'lucide-react'
import { Link } from 'react-router'
import { ProductImage } from '@/components/product/ProductImage'
import { useToastStore } from '@/store/toastStore'
import { useWishlistStore } from '@/store/wishlistStore'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
  /** First-viewport cards skip lazy loading so they don't delay LCP. */
  priority?: boolean
  className?: string
  /** Lets editorial layouts (e.g. Army Picks) vary card proportions instead of a uniform grid. */
  aspectClassName?: string
}

export function ProductCard({
  product,
  onQuickView,
  priority = false,
  className = '',
  aspectClassName = 'aspect-[4/5]',
}: ProductCardProps) {
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id))
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  const showToast = useToastStore((state) => state.showToast)

  function handleWishlistClick() {
    const added = toggleWishlist(product.id)
    showToast(added ? 'Guardado en tu Purple List 💜' : 'Eliminado de tu Purple List')
  }

  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-transform duration-300 ease-out hover:-translate-y-1 ${className}`}>
      <div className={`relative overflow-hidden ${aspectClassName}`}>
        <Link to={`/product/${product.slug}`} className="block h-full w-full" aria-label={product.name}>
          <span className="sr-only">{product.name}</span>
          <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.04]">
            <ProductImage product={product} priority={priority} />
          </div>
        </Link>

        {product.badge ? (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-background/70 px-3 py-1 text-[10px] font-semibold tracking-[0.06em] text-lavender backdrop-blur-sm">
            {product.badge}
          </span>
        ) : product.customizable ? (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-accent/80 px-3 py-1 text-[10px] font-semibold tracking-[0.06em] text-background backdrop-blur-sm">
            Personalizable
          </span>
        ) : null}

        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Quitar de tu Purple List' : 'Guardar en tu Purple List'}
          aria-pressed={isWishlisted}
          className="absolute right-3 top-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-background/60 text-foreground transition-colors hover:text-purple-light"
        >
          <Heart size={17} aria-hidden="true" fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'text-accent' : ''} />
          <span className="sr-only">{isWishlisted ? 'Quitar de tu Purple List' : 'Guardar en tu Purple List'}</span>
        </button>

        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute inset-x-3 bottom-3 flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-background/75 text-xs font-semibold tracking-[0.04em] text-foreground backdrop-blur-sm transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100"
        >
          QUICK VIEW
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <Link to={`/product/${product.slug}`} className="transition-colors hover:text-purple-light">
          <h3 className="line-clamp-1 font-display text-base">{product.name}</h3>
        </Link>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-lg font-semibold">S/ {product.price.toFixed(2)}</span>
          <div className="flex gap-1" aria-hidden="true">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="h-3 w-3 rounded-full border border-white/20"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
