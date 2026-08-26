import js from '@eslint/js'
import { globalIgnores } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // build/client + build/server: production output. .react-router: generated route typegen.
  globalIgnores(['dist', 'build', '.react-router']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
  },
  {
    // React Router route modules (src/root.tsx + every page under src/pages/)
    // export `meta` (and, later, `loader`/`action`/etc.) alongside the default
    // component — that's the framework's convention, not a fast-refresh bug.
    files: ['src/root.tsx', 'src/pages/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowExportNames: ['meta', 'links', 'loader', 'action', 'handle', 'shouldRevalidate', 'ErrorBoundary', 'HydrateFallback'] },
      ],
    },
  },
)
