// Pure validation logic for CheckoutPage, split out of the route file so it
// can be unit-tested directly (see checkoutValidation.test.ts) without
// tripping react-refresh/only-export-components on a page module.
import type { CheckoutContact, CheckoutDelivery } from '@/types/checkout'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactErrors = Partial<Record<keyof CheckoutContact, string>>
export type DeliveryErrors = Partial<Record<keyof CheckoutDelivery, string>>

export function validateContact(contact: CheckoutContact): ContactErrors {
  const errors: ContactErrors = {}
  if (!contact.fullName.trim()) errors.fullName = 'Ingresa tu nombre y apellidos.'

  const digits = contact.phone.replace(/[^\d+]/g, '')
  if (!contact.phone.trim()) errors.phone = 'Ingresa tu celular o WhatsApp.'
  else if (!/^\+?\d{7,15}$/.test(digits)) errors.phone = 'Ingresa un número de celular válido.'

  if (contact.email?.trim() && !EMAIL_PATTERN.test(contact.email.trim())) {
    errors.email = 'Ingresa un correo válido.'
  }
  return errors
}

export function validateDelivery(delivery: CheckoutDelivery): DeliveryErrors {
  const errors: DeliveryErrors = {}
  if (!delivery.department.trim()) errors.department = 'Ingresa tu departamento.'
  if (!delivery.province.trim()) errors.province = 'Ingresa tu provincia.'
  if (!delivery.district.trim()) errors.district = 'Ingresa tu distrito.'
  if (!delivery.address.trim()) errors.address = 'Ingresa tu dirección.'
  return errors
}
