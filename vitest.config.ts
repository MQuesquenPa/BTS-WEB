import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

// Deliberately its own minimal config, not merged with vite.config.ts's
// reactRouter() plugin — these tests only import pure functions/stores, never
// render a route, so the framework-mode plugin (route manifest, SSR wiring)
// would be unused complexity here. jsdom is needed because cartStore's
// zustand `persist` middleware calls `localStorage` on every write.
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(rootDir, './src') },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
})
