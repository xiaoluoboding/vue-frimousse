import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**', 'playground/**', 'dist/**', 'lib/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['./test/setup-jsdom.ts', './test/setup-emojibase.ts'],
      globals: true,
      // Include test files from both src/ and test/ directories
      include: [
        'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        'test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
      ],
      // Better test reporting
      reporters: ['verbose']
    }
  })
)
