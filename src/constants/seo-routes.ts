// Relative imports (not the `@/*` alias): this file is also loaded by
// react-router.config.ts and scripts/generate-seo-files.ts under
// tsconfig.node.json, which doesn't define the alias.
import { ROUTES } from './routes.ts'
import { MEMBERS } from '../data/members.ts'
import { PRODUCTS } from '../data/products.ts'

/**
 * Public, indexable, prerenderable routes with no dynamic data — the static
 * shell of the site. `/news` is intentionally excluded while News is paused
 * for the MVP (Fase 10) — the route itself still exists and is reachable
 * client-side, it's just out of the build-time prerender and out of
 * sitemap.xml (both single-sourced from this list). Add it back when News
 * relaunches.
 */
export const PUBLIC_STATIC_ROUTES = [
  '/',
  '/shop',
  '/customize',
  '/members',
  '/lima-2026',
  '/about',
] as const

/**
 * Every public, indexable route the site currently has — static pages plus
 * one entry per real product slug and one per member. Single source of
 * truth, consumed by `react-router.config.ts` (build-time prerender) and by
 * `scripts/generate-seo-files.ts` (sitemap.xml), so a new product or member
 * only ever needs to be added to `src/data/products.ts` / `src/data/members.ts`
 * — never to a second, hand-maintained route list.
 */
export function getAllIndexableRoutes(): string[] {
  return [
    ...PUBLIC_STATIC_ROUTES,
    ...PRODUCTS.map((product) => ROUTES.product(product.slug)),
    ...MEMBERS.map((member) => ROUTES.memberDetail(member.slug)),
  ]
}
