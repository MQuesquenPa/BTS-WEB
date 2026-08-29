import type { Config } from '@react-router/dev/config'
import { getAllIndexableRoutes } from './src/constants/seo-routes.ts'

export default {
  // Keep the existing src/ layout instead of moving everything into app/.
  appDirectory: 'src',
  // No Node server in production: build-time prerender only, served as static files.
  ssr: false,
  prerender: getAllIndexableRoutes(),
} satisfies Config
