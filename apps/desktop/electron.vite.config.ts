import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), swcPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer'),
        '@repo/shared/resolvers': resolve('../../packages/shared/src/resolvers'),
        '@repo/shared/constants': resolve('../../packages/shared/src/constants')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})
