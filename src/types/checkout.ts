// Shapes the Checkout UI around what a future `POST /api/orders` body will
// need, without any backend existing yet (Fase 10). Keeping these as their
// own types — rather than inline useState shapes — means the request payload
// can later be built straight from `CheckoutFormData` with no UI rewrite.

export interface CheckoutContact {
  fullName: string
  phone: string
  /** Optional — validated only when provided. */
  email?: string
}

export interface CheckoutDelivery {
  department: string
  province: string
  district: string
  address: string
  reference?: string
  notes?: string
}

export interface CheckoutFormData {
  contact: CheckoutContact
  delivery: CheckoutDelivery
}
