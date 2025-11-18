import type { Server as HttpServer } from 'node:http'
import { shutdownServices } from 'src/server/services/_manager'
import { LOG_LEVEL, logger } from './logger'

let isShuttingDown = false

// Shutdown handler
export const shutdown = async (httpServer: HttpServer, signal: NodeJS.Signals) => {
  if (isShuttingDown) return
  isShuttingDown = true

  logger({ level: LOG_LEVEL.INFO, message: `Received ${signal}. Cleaning up...` })

  try {
    // 1. Stop HTTP server
    httpServer.close()
    logger({ level: LOG_LEVEL.INFO, message: '🧹 HTTP server closed' })

    await shutdownServices()
  } catch (err) {
    logger({ level: LOG_LEVEL.ERROR, message: `Shutdown failed: ${err}` })
  } finally {
    process.exitCode = 0
  }

  // 3. Exit
  process.exit(0)
}
