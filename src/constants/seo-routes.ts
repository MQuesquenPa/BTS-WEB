// Relative imports (not the `@/*` alias): this file is also loaded by
// react-router.config.ts and scripts/generate-seo-files.ts under
// tsconfig.node.json, which doesn't define the alias.
import { ROUTES } from './routes.ts'
import { PRODUCTS } from '../data/products.ts'

/**
 * Public, indexable, prerenderable routes with no dynamic data — the static
 * shell of the site.
 */
export const PUBLIC_STATIC_ROUTES = [
  '/',
  '/shop',
  '/customize',
  '/members',
  '/lima-2026',
  '/news',
  '/about',
] as const

/**
 * Every public, indexable route the site currently has — static pages plus
 * one entry per real product slug. Single source of truth, consumed by
 * `react-router.config.ts` (build-time prerender) and by
 * `scripts/generate-seo-files.ts` (sitemap.xml), so a new product only ever
 * needs to be added to `src/data/products.ts` — never to a second,
 * hand-maintained route list.
 */
export function getAllIndexableRoutes(): string[] {
  return [...PUBLIC_STATIC_ROUTES, ...PRODUCTS.map((product) => ROUTES.product(product.slug))]
}
