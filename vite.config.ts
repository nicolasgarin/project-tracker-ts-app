/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/project-tracker-ts-app/",
  test: {
    environment: "jsdom",
    setupFiles: './src/tests/setup.ts'
  },
})
