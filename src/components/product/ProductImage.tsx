import type { Product } from '@/types/product'

interface ProductImageProps {
  product: Product
  className?: string
  /** Product images are the LCP candidate on some sections — opt out of lazy loading there. */
  priority?: boolean
}

// Until real photography exists (see Product.image), every product renders this
// mockup: its own gradient, a soft abstract drapery silhouette, a grain overlay
// and a bottom vignette so it reads as an editorial studio shot rather than a
// flat color swatch.
export function ProductImage({ product, className = '', priority = false }: ProductImageProps) {
  if (product.image) {
    const fit = product.imageFit ?? 'cover'
    return (
      <img
        src={product.image}
        alt={`${product.name} — fan-made Purple Wave`}
        loading={priority ? 'eager' : 'lazy'}
        className={`h-full w-full ${fit === 'contain' ? 'object-contain bg-surface' : 'object-cover'} ${className}`}
        style={product.imagePosition ? { objectPosition: product.imagePosition } : undefined}
      />
    )
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} style={{ background: product.gradient }}>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 opacity-90"
      >
        <path
          d="M100 18c-22 0-34 14-34 30 0 10 5 18 5 30 0 26-16 34-16 60 0 24 20 44 45 44s45-20 45-44c0-26-16-34-16-60 0-12 5-20 5-30 0-16-12-30-34-30Z"
          fill="rgba(255,255,255,0.08)"
        />
        <path
          d="M100 18c-22 0-34 14-34 30 0 10 5 18 5 30 0 26-16 34-16 60 0 24 20 44 45 44"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
        />
      </svg>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/50 to-transparent"
      />
    </div>
  )
}
