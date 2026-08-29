interface QuantityStepperProps {
  quantity: number
  onChange: (quantity: number) => void
  min?: number
}

export function QuantityStepper({ quantity, onChange, min = 1 }: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border px-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        aria-label="Reducir cantidad"
        className="flex min-h-11 min-w-9 items-center justify-center text-lg"
      >
        −
      </button>
      <span className="min-w-4 text-center text-sm">{quantity}</span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        aria-label="Aumentar cantidad"
        className="flex min-h-11 min-w-9 items-center justify-center text-lg"
      >
        +
      </button>
    </div>
  )
}
