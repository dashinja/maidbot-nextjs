/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/__tests__/**/*.{test,spec}.(ts|tsx)'],
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components'),
      },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
      { find: '@utilities', replacement: resolve(__dirname, 'src/utilities') },
    ],
  },
})
