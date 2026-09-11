import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from './cartStore'

beforeEach(() => {
  useCartStore.setState({ items: [] })
})

describe('cartStore', () => {
  it('merges quantity when the same product/size/color is added again', () => {
    useCartStore.getState().addItem({ productId: 'p1', size: 'M', color: 'Negro', quantity: 1 })
    useCartStore.getState().addItem({ productId: 'p1', size: 'M', color: 'Negro', quantity: 2 })

    expect(useCartStore.getState().items).toEqual([{ productId: 'p1', size: 'M', color: 'Negro', quantity: 3 }])
  })

  it('creates a separate line for a different size', () => {
    useCartStore.getState().addItem({ productId: 'p1', size: 'M', color: 'Negro', quantity: 1 })
    useCartStore.getState().addItem({ productId: 'p1', size: 'L', color: 'Negro', quantity: 1 })

    expect(useCartStore.getState().items).toHaveLength(2)
  })

  it('creates a separate line for a different color', () => {
    useCartStore.getState().addItem({ productId: 'p1', size: 'M', color: 'Negro', quantity: 1 })
    useCartStore.getState().addItem({ productId: 'p1', size: 'M', color: 'Purple', quantity: 1 })

    expect(useCartStore.getState().items).toHaveLength(2)
  })

  it('removes the line entirely when quantity is updated to 0', () => {
    useCartStore.getState().addItem({ productId: 'p1', size: 'M', color: 'Negro', quantity: 1 })
    useCartStore.getState().updateQuantity({ productId: 'p1', size: 'M', color: 'Negro' }, 0)

    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('itemCount sums quantities across every line', () => {
    useCartStore.getState().addItem({ productId: 'p1', size: 'M', color: 'Negro', quantity: 2 })
    useCartStore.getState().addItem({ productId: 'p2', size: 'Único', color: 'Purple', quantity: 3 })

    expect(useCartStore.getState().itemCount()).toBe(5)
  })

  it('removeItem drops only the matching line', () => {
    useCartStore.getState().addItem({ productId: 'p1', size: 'M', color: 'Negro', quantity: 1 })
    useCartStore.getState().addItem({ productId: 'p2', size: 'Único', color: 'Purple', quantity: 1 })
    useCartStore.getState().removeItem({ productId: 'p1', size: 'M', color: 'Negro' })

    expect(useCartStore.getState().items).toEqual([{ productId: 'p2', size: 'Único', color: 'Purple', quantity: 1 }])
  })
})
