/// <reference types="vitest" />
/// <reference types="vitest-dom/extend-expect" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/__tests__/**/*.(ts|tsx)'],
    setupFiles: ["vitest.setup.ts"]
  },
  resolve: {
    alias: [{
      find: "@components",
      replacement: resolve(__dirname, "./components")
    }]
  }
})
