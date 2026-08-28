import type { ProductColor, ProductSize } from '@/types/product'

interface VariantPickerProps {
  colors: ProductColor[]
  selectedColor: string
  onSelectColor: (colorName: string) => void
  sizes?: ProductSize[]
  selectedSize: string | null
  onSelectSize: (size: ProductSize) => void
  sizeError?: boolean
}

export function VariantPicker({
  colors,
  selectedColor,
  onSelectColor,
  sizes,
  selectedSize,
  onSelectSize,
  sizeError = false,
}: VariantPickerProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="text-xs tracking-[0.08em] text-foreground-muted">COLOR · {selectedColor}</span>
        <div className="mt-2 flex gap-2.5">
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => onSelectColor(color.name)}
              aria-label={color.name}
              aria-pressed={selectedColor === color.name}
              className={`h-9 w-9 rounded-full border-2 transition-transform ${
                selectedColor === color.name ? 'scale-110 border-purple-light' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {sizes && sizes.length > 0 && (
        <div>
          <span className={`text-xs tracking-[0.08em] ${sizeError ? 'text-accent' : 'text-foreground-muted'}`}>
            {sizeError ? 'SELECCIONA UNA TALLA' : 'TALLA'}
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onSelectSize(size)}
                aria-pressed={selectedSize === size}
                className={`min-h-11 min-w-11 rounded-lg border px-3 text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? 'border-purple-light bg-purple/15 text-purple-light'
                    : sizeError
                      ? 'border-accent/60 text-foreground'
                      : 'border-border text-foreground hover:border-purple-light'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
