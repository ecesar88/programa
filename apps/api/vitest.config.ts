/// <reference types="vitest/config" />
import { LOG_LEVEL, logger } from './src/utils/logger'
import { defineConfig } from 'vitest/config'

logger({
  level: LOG_LEVEL.INFO,
  message: '[vitest] - config loaded.'
})

export default defineConfig({
  test: {
    globalSetup: './src/utils/tests/setup.ts' // Path to the setup file
  }
})
