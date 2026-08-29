// Runs after `react-router build` (see package.json "postbuild"). Writes
// robots.txt and, when VITE_SITE_URL is configured, sitemap.xml directly into
// the build output — never into public/, since their content depends on an
// env value that isn't known at source-control time.
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { loadEnv } from 'vite'
import { getAllIndexableRoutes } from '../src/constants/seo-routes.ts'

const rootDir = path.resolve(import.meta.dirname, '..')
const env = loadEnv('production', rootDir, 'VITE_')
const siteUrl = env.VITE_SITE_URL?.replace(/\/$/, '')

// Matches react-router.config.ts's (default) buildDirectory — keep both in sync.
const outDir = path.join(rootDir, 'build', 'client')

const robotsLines = ['User-agent: *', 'Allow: /']
if (siteUrl) {
  robotsLines.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
} else {
  console.log('[seo] VITE_SITE_URL no configurado — robots.txt se genera sin referencia a sitemap.xml.')
}
writeFileSync(path.join(outDir, 'robots.txt'), `${robotsLines.join('\n')}\n`)

if (siteUrl) {
  const routes = getAllIndexableRoutes()
  const urlEntries = routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`
  writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap)
  console.log(`[seo] sitemap.xml generado con ${routes.length} rutas en ${outDir}.`)
} else {
  console.log('[seo] VITE_SITE_URL no configurado — sitemap.xml NO se genera (evitamos URLs inventadas).')
}
