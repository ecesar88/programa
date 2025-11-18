import { LOG_LEVEL, logger } from '../../utils/logger'
import { initPrisma, shutdownPrisma } from './prismaService'

type Service = { name: string; init: () => Promise<void>; shutdown?: () => Promise<void> }
const services: Service[] = [{ name: 'Prisma', init: initPrisma, shutdown: shutdownPrisma }]

export async function initServices() {
  logger({
    level: LOG_LEVEL.INFO,
    message: `[🧩]: Initializing services...`
  })

  for (const { name, init } of services) {
    try {
      logger({
        level: LOG_LEVEL.INFO,
        message: `[🧩]: Initializing ${name} service`
      })

      await init()
    } catch (error) {
      logger({
        level: LOG_LEVEL.ERROR,
        message: `[🧩]: Error initializing ${name} service`,
        object: String(error)
      })
    }
  }

  logger({
    level: LOG_LEVEL.INFO,
    message: '[🧩]: All services initialized'
  })
}

export async function shutdownServices() {
  logger({
    level: LOG_LEVEL.INFO,
    message: `[🧩]: Shutting down services...`
  })

  for (const { name, shutdown } of services) {
    if (!shutdown) continue

    try {
      logger({
        level: LOG_LEVEL.INFO,
        message: `[🧩]: Shutting down ${name} service`
      })

      await shutdown()
    } catch (error) {
      logger({
        level: LOG_LEVEL.ERROR,
        message: `[🧩]: Error shutting down ${name} service`,
        object: String(error)
      })
    }
  }

  logger({
    level: LOG_LEVEL.INFO,
    message: '[🧩]: All services shut down'
  })
}
