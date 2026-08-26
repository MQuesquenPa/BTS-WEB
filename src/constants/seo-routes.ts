/**
 * Single source of truth for "public, indexable, prerenderable" routes.
 * Consumed by `react-router.config.ts` (build-time prerender) and by
 * `scripts/generate-seo-files.ts` (sitemap.xml). Detail routes with dynamic
 * `:slug` params are intentionally excluded until real slugs exist.
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
