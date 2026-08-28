import { useState } from 'react'
import type { MetaFunction } from 'react-router'
import { Hero } from '@/components/sections/Hero'
import { ArmyPicks } from '@/components/sections/ArmyPicks'
import { BiasSelector } from '@/components/sections/BiasSelector'
import { LimaCollection } from '@/components/sections/LimaCollection'
import { QuickView } from '@/components/product/QuickView'
import { ROUTES } from '@/constants/routes'
import { DEFAULT_DESCRIPTION, pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'
import type { Product } from '@/types/product'

export const meta: MetaFunction = () =>
  buildMeta({ title: pageTitle(), description: DEFAULT_DESCRIPTION, path: ROUTES.home })

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  return (
    <>
      <Hero />
      <ArmyPicks onQuickView={setQuickViewProduct} />
      <BiasSelector onQuickView={setQuickViewProduct} />
      <LimaCollection onQuickView={setQuickViewProduct} />
      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  )
}
