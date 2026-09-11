import { useState, type FormEvent } from 'react'
import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'
import { Container } from '@/components/common/Container'
import { ProductImage } from '@/components/product/ProductImage'
import { FULFILLMENT_LABEL, SHIPPING_COPY } from '@/constants/commerce'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import {
  buildCheckoutSummaryText,
  buildCheckoutWhatsAppMessage,
  buildWhatsAppUrl,
  MADE_TO_ORDER_NOTICE,
  READY_STOCK_NOTICE,
  WHATSAPP_NUMBER,
  type CheckoutOrderLine,
} from '@/lib/checkout-order'
import { formatCurrency } from '@/lib/currency'
import { buildMeta } from '@/lib/meta'
import { PRODUCTS } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import type { CheckoutContact, CheckoutDelivery } from '@/types/checkout'
import {
  type ContactErrors,
  type DeliveryErrors,
  validateContact,
  validateDelivery,
} from './checkoutValidation'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Checkout'),
    description: 'Finaliza tu pedido en Purple Wave — checkout de invitado, sin necesidad de crear cuenta.',
    path: ROUTES.checkout,
    robots: 'noindex, follow',
  })

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)

  const lines: CheckoutOrderLine[] = items
    .map((item) => {
      const product = PRODUCTS.find((candidate) => candidate.id === item.productId)
      return product ? { item, product } : null
    })
    .filter((line): line is CheckoutOrderLine => Boolean(line))

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">CHECKOUT</h1>
      {lines.length > 0 ? <CheckoutForm lines={lines} /> : <EmptyCheckout />}
    </Container>
  )
}

function EmptyCheckout() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
      <span className="font-display text-lg font-semibold">Tu Purple Bag está vacía</span>
      <p className="max-w-sm text-sm text-foreground-muted">
        Agrega productos desde el Shop antes de continuar con tu pedido.
      </p>
      <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          to={ROUTES.shop}
          className="rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
        >
          Ir al Shop
        </Link>
        <Link
          to={ROUTES.customize}
          className="text-sm font-semibold text-foreground-muted underline underline-offset-2 transition-colors hover:text-purple-light"
        >
          Personaliza tu merch
        </Link>
      </div>
    </div>
  )
}

function CheckoutForm({ lines }: { lines: CheckoutOrderLine[] }) {
  const [contact, setContact] = useState<CheckoutContact>({ fullName: '', phone: '', email: '' })
  const [delivery, setDelivery] = useState<CheckoutDelivery>({
    department: '',
    province: '',
    district: '',
    address: '',
    reference: '',
    notes: '',
  })
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle')
  const showToast = useToastStore((state) => state.showToast)

  const subtotal = lines.reduce((total, { item, product }) => total + item.quantity * product.price, 0)
  const hasMadeToOrder = lines.some(({ product }) => product.fulfillment === 'made-to-order')
  const hasReadyStock = lines.some(({ product }) => product.fulfillment === 'ready-stock')

  const contactErrors = validateContact(contact)
  const deliveryErrors = validateDelivery(delivery)
  const contactComplete = Object.keys(contactErrors).length === 0
  const deliveryComplete = Object.keys(deliveryErrors).length === 0
  const hasErrors = !contactComplete || !deliveryComplete

  function focusFirstError() {
    const firstField = Object.keys(contactErrors)[0] ?? Object.keys(deliveryErrors)[0]
    if (firstField) document.getElementById(firstField)?.focus()
  }

  function buildFormData() {
    return {
      contact: { ...contact, email: contact.email?.trim() || undefined },
      delivery: {
        ...delivery,
        reference: delivery.reference?.trim() || undefined,
        notes: delivery.notes?.trim() || undefined,
      },
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttemptedSubmit(true)
    if (hasErrors) {
      focusFirstError()
      return
    }
    if (!WHATSAPP_NUMBER) return
    const data = buildFormData()
    const message = buildCheckoutWhatsAppMessage(data, lines, subtotal)
    window.open(buildWhatsAppUrl(WHATSAPP_NUMBER, message), '_blank', 'noopener,noreferrer')
  }

  async function handleCopy() {
    setAttemptedSubmit(true)
    if (hasErrors) {
      focusFirstError()
      return
    }
    const data = buildFormData()
    const text = buildCheckoutSummaryText(data, lines, subtotal)
    try {
      await navigator.clipboard.writeText(text)
      showToast('Resumen copiado 💜')
      setCopyState('success')
      setTimeout(() => setCopyState('idle'), 2500)
    } catch {
      setCopyState('error')
    }
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-start lg:gap-14">
      <OrderSummary
        lines={lines}
        subtotal={subtotal}
        hasMadeToOrder={hasMadeToOrder}
        hasReadyStock={hasReadyStock}
        className="order-first lg:order-none lg:sticky lg:top-24"
      />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
        <ProgressIndicator contactComplete={contactComplete} deliveryComplete={deliveryComplete} />

        <ContactSection contact={contact} onChange={setContact} errors={contactErrors} attemptedSubmit={attemptedSubmit} />
        <DeliverySection
          delivery={delivery}
          onChange={setDelivery}
          errors={deliveryErrors}
          attemptedSubmit={attemptedSubmit}
        />

        <PaymentNotice />

        <ReviewSection
          contact={contact}
          delivery={delivery}
          lines={lines}
          subtotal={subtotal}
          formComplete={contactComplete && deliveryComplete}
        />

        <p className="text-xs leading-relaxed text-foreground-muted">
          Usaremos estos datos únicamente para coordinar tu pedido y entrega.
        </p>

        {attemptedSubmit && hasErrors ? (
          <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
            Revisa los campos marcados antes de continuar.
          </p>
        ) : null}

        <div className="flex flex-col gap-3">
          {WHATSAPP_NUMBER ? (
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            >
              SOLICITAR PEDIDO
            </button>
          ) : (
            <p className="rounded-xl border border-border/50 bg-surface/30 px-4 py-3 text-xs text-foreground-muted">
              El canal directo por WhatsApp estará disponible próximamente. Copia el resumen de tu pedido mientras tanto.
            </p>
          )}

          <CopyOrderButton
            onClick={handleCopy}
            copyState={copyState}
            primary={!WHATSAPP_NUMBER}
            label={WHATSAPP_NUMBER ? 'COPIAR RESUMEN' : 'COPIAR RESUMEN DEL PEDIDO'}
          />
        </div>
      </form>
    </div>
  )
}

function CopyOrderButton({
  onClick,
  copyState,
  primary,
  label,
}: {
  onClick: () => void
  copyState: 'idle' | 'success' | 'error'
  primary: boolean
  label: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light ${
          primary
            ? `min-h-12 px-6 py-3.5 text-sm text-foreground ${copyState === 'success' ? 'bg-purple-light' : 'bg-purple hover:bg-purple-light'}`
            : `min-h-11 border px-6 py-3 text-sm ${
                copyState === 'success'
                  ? 'border-purple-light bg-purple/10 text-purple-light'
                  : 'border-border text-foreground-muted hover:border-purple-light hover:text-foreground'
              }`
        }`}
      >
        {copyState === 'success' ? '¡Resumen copiado!' : label}
      </button>
      {copyState === 'error' ? (
        <p className="text-xs text-red-400">No se pudo copiar al portapapeles. Intenta de nuevo.</p>
      ) : null}
    </div>
  )
}

// ── Progress indicator ────────────────────────────────────────────────────────
// Purely a visual read of the current form state — not a wizard, nothing here
// gates navigation or hides sections.

function ProgressIndicator({
  contactComplete,
  deliveryComplete,
}: {
  contactComplete: boolean
  deliveryComplete: boolean
}) {
  const steps = [
    { label: '01 CONTACTO', state: contactComplete ? 'completed' : 'current' },
    { label: '02 ENTREGA', state: !contactComplete ? 'pending' : deliveryComplete ? 'completed' : 'current' },
    { label: '03 REVISIÓN', state: contactComplete && deliveryComplete ? 'current' : 'pending' },
  ] as const

  return (
    <ol aria-hidden="true" className="flex flex-wrap items-center gap-3 text-[11px] font-semibold tracking-[0.12em]">
      {steps.map((step, index) => (
        <li key={step.label} className="flex items-center gap-3">
          {index > 0 ? <span className="h-px w-6 bg-border" /> : null}
          <span
            className={
              step.state === 'completed'
                ? 'text-purple-light'
                : step.state === 'current'
                  ? 'text-foreground'
                  : 'text-foreground-muted/50'
            }
          >
            {step.state === 'completed' ? '✓ ' : ''}
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  )
}

// ── Section: Contacto ─────────────────────────────────────────────────────────

function ContactSection({
  contact,
  onChange,
  errors,
  attemptedSubmit,
}: {
  contact: CheckoutContact
  onChange: (contact: CheckoutContact) => void
  errors: ContactErrors
  attemptedSubmit: boolean
}) {
  return (
    <section id="section-contacto" aria-labelledby="contacto-heading" className="flex flex-col gap-5">
      <h2 id="contacto-heading" className="font-display text-xl font-bold">
        01 · Contacto
      </h2>

      <Field
        id="fullName"
        label="Nombre y apellidos"
        required
        autoComplete="name"
        value={contact.fullName}
        onChange={(value) => onChange({ ...contact, fullName: value })}
        error={attemptedSubmit ? errors.fullName : undefined}
      />
      <Field
        id="phone"
        label="Celular / WhatsApp"
        required
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={contact.phone}
        onChange={(value) => onChange({ ...contact, phone: value })}
        error={attemptedSubmit ? errors.phone : undefined}
      />
      <Field
        id="email"
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        value={contact.email ?? ''}
        onChange={(value) => onChange({ ...contact, email: value })}
        error={attemptedSubmit ? errors.email : undefined}
      />
    </section>
  )
}

// ── Section: Entrega ──────────────────────────────────────────────────────────

function DeliverySection({
  delivery,
  onChange,
  errors,
  attemptedSubmit,
}: {
  delivery: CheckoutDelivery
  onChange: (delivery: CheckoutDelivery) => void
  errors: DeliveryErrors
  attemptedSubmit: boolean
}) {
  return (
    <section id="section-entrega" aria-labelledby="entrega-heading" className="flex flex-col gap-5">
      <h2 id="entrega-heading" className="font-display text-xl font-bold">
        02 · Entrega
      </h2>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field
          id="department"
          label="Departamento"
          required
          autoComplete="address-level1"
          value={delivery.department}
          onChange={(value) => onChange({ ...delivery, department: value })}
          error={attemptedSubmit ? errors.department : undefined}
        />
        <Field
          id="province"
          label="Provincia"
          required
          autoComplete="address-level2"
          value={delivery.province}
          onChange={(value) => onChange({ ...delivery, province: value })}
          error={attemptedSubmit ? errors.province : undefined}
        />
        <Field
          id="district"
          label="Distrito"
          required
          autoComplete="address-level3"
          value={delivery.district}
          onChange={(value) => onChange({ ...delivery, district: value })}
          error={attemptedSubmit ? errors.district : undefined}
        />
      </div>

      <Field
        id="address"
        label="Dirección"
        required
        autoComplete="address-line1"
        value={delivery.address}
        onChange={(value) => onChange({ ...delivery, address: value })}
        error={attemptedSubmit ? errors.address : undefined}
      />
      <Field
        id="reference"
        label="Referencia"
        autoComplete="address-line2"
        value={delivery.reference ?? ''}
        onChange={(value) => onChange({ ...delivery, reference: value })}
      />
      <Field
        id="notes"
        label="Notas de entrega"
        as="textarea"
        value={delivery.notes ?? ''}
        onChange={(value) => onChange({ ...delivery, notes: value })}
      />

      <div className="rounded-xl border border-border bg-surface/50 p-4 text-xs leading-relaxed text-foreground-muted">
        <p>{SHIPPING_COPY}.</p>
        <p className="mt-1.5">El costo de envío se coordina según destino antes de confirmar tu pedido.</p>
      </div>
    </section>
  )
}

// ── Payment ───────────────────────────────────────────────────────────────────

function PaymentNotice() {
  return (
    <section aria-labelledby="pago-heading" className="flex flex-col gap-3">
      <h2 id="pago-heading" className="font-display text-xl font-bold">
        Pago
      </h2>
      <p className="rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm text-foreground-muted">
        El método de pago se coordina al confirmar el pedido.
      </p>
    </section>
  )
}

// ── Section: Revisión ─────────────────────────────────────────────────────────

// Scrolls to a section and focuses its first field — `preventScroll` on the
// focus call keeps the browser's own "scroll focused element into view" from
// fighting the smooth scroll we already triggered.
function editSection(sectionId: string, firstFieldId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  document.getElementById(firstFieldId)?.focus({ preventScroll: true })
}

function ReviewSection({
  contact,
  delivery,
  lines,
  subtotal,
  formComplete,
}: {
  contact: CheckoutContact
  delivery: CheckoutDelivery
  lines: CheckoutOrderLine[]
  subtotal: number
  formComplete: boolean
}) {
  return (
    <section aria-labelledby="revision-heading" className="flex flex-col gap-5">
      <h2 id="revision-heading" className="font-display text-xl font-bold">
        03 · Revisión
      </h2>

      {!formComplete ? (
        <div className="rounded-xl border border-dashed border-border bg-surface/30 p-5 text-sm text-foreground-muted">
          Completa tus datos de contacto y entrega para revisar tu pedido.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <ReviewBlock title="Contacto" onEdit={() => editSection('section-contacto', 'fullName')}>
              <p>{contact.fullName}</p>
              <p>{contact.phone}</p>
              {contact.email ? <p>{contact.email}</p> : null}
            </ReviewBlock>
            <ReviewBlock title="Entrega" onEdit={() => editSection('section-entrega', 'department')}>
              <p>{[delivery.district, delivery.province, delivery.department].filter(Boolean).join(', ')}</p>
              <p>{delivery.address}</p>
              {delivery.reference ? <p>Ref: {delivery.reference}</p> : null}
              {delivery.notes ? <p>Notas: {delivery.notes}</p> : null}
            </ReviewBlock>
          </div>

          <ReviewBlock title="Pedido">
            <ul className="flex flex-col gap-1">
              {lines.map(({ item, product }) => (
                <li key={`${item.productId}-${item.size}-${item.color}`}>
                  {product.name} · {item.color} · Talla {item.size} · x{item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold text-foreground">Subtotal: {formatCurrency(subtotal)}</p>
            <p>Delivery: por coordinar</p>
          </ReviewBlock>
        </>
      )}
    </section>
  )
}

function ReviewBlock({
  title,
  onEdit,
  children,
}: {
  title: string
  onEdit?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/50 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold tracking-[0.1em] text-foreground-muted">{title.toUpperCase()}</span>
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="text-xs font-semibold text-purple-light underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
          >
            Editar
          </button>
        ) : null}
      </div>
      <div className="flex flex-col gap-0.5 text-sm text-foreground-muted">{children}</div>
    </div>
  )
}

// ── Order Summary ─────────────────────────────────────────────────────────────

function OrderSummary({
  lines,
  subtotal,
  hasMadeToOrder,
  hasReadyStock,
  className = '',
}: {
  lines: CheckoutOrderLine[]
  subtotal: number
  hasMadeToOrder: boolean
  hasReadyStock: boolean
  className?: string
}) {
  return (
    <div className={`h-fit rounded-2xl border border-border bg-surface p-6 ${className}`}>
      <h2 className="font-display text-lg font-bold">Resumen del pedido</h2>

      <ul className="mt-4 flex flex-col gap-4">
        {lines.map(({ item, product }) => {
          const badge = product.customizable
            ? 'Personalizado'
            : product.fulfillment === 'made-to-order'
              ? FULFILLMENT_LABEL['made-to-order']
              : null
          return (
            <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                <ProductImage product={product} />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold leading-tight">{product.name}</span>
                  <span className="shrink-0 text-sm font-semibold">
                    {formatCurrency(product.price * item.quantity)}
                  </span>
                </div>
                <span className="text-xs text-foreground-muted">
                  {item.color} · Talla {item.size} · x{item.quantity}
                </span>
                {badge ? (
                  <span className="mt-1 w-fit rounded-full bg-purple/15 px-2 py-0.5 text-[10px] font-semibold tracking-[0.04em] text-purple-light">
                    {badge}
                  </span>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>

      {hasMadeToOrder ? (
        <p className="mt-4 rounded-lg border border-border/60 bg-purple/10 px-3 py-2.5 text-xs leading-relaxed text-lavender">
          {MADE_TO_ORDER_NOTICE}
        </p>
      ) : null}
      {hasReadyStock ? (
        <p className="mt-3 text-xs leading-relaxed text-foreground-muted">{READY_STOCK_NOTICE}</p>
      ) : null}

      <div className="mt-5 border-t border-border pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground-muted">Subtotal de productos</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-foreground-muted">Delivery</span>
          <span className="font-semibold text-purple-light">Por coordinar</span>
        </div>
        <p className="mt-3 text-xs text-foreground-muted">El monto final se confirma al coordinar el delivery.</p>
      </div>
    </div>
  )
}

// ── Field ─────────────────────────────────────────────────────────────────────

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  type = 'text',
  as = 'input',
  autoComplete,
  inputMode,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  type?: string
  as?: 'input' | 'textarea'
  autoComplete?: string
  inputMode?: 'text' | 'tel' | 'email'
}) {
  const errorId = `${id}-error`
  const sharedProps = {
    id,
    name: id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    autoComplete,
    className: `w-full rounded-xl border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-light ${
      error ? 'border-red-500/50' : 'border-border focus:border-purple-light'
    }`,
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-foreground">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-accent">
            *
          </span>
        ) : (
          <span className="font-normal text-foreground-muted">(opcional)</span>
        )}
      </label>
      {as === 'textarea' ? (
        <textarea {...sharedProps} rows={3} />
      ) : (
        <input {...sharedProps} type={type} inputMode={inputMode} />
      )}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}
