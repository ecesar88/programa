import { sqliteAdapter } from 'src/config/prisma'
import { PrismaClient } from '../../prisma/generated/client'
import { LOG_LEVEL, logger } from '../../utils/logger'

const prisma = new PrismaClient({
  log: ['error', 'info', 'warn'],
  adapter: sqliteAdapter
})

/**
 * Initialize the Prisma client.
 * Connects to the database and performs a simple ping.
 */
async function initPrisma() {
  await prisma.$connect()
  await prisma.$queryRaw`SELECT 1` // simple db ping
  logger({ level: LOG_LEVEL.INFO, message: '[💎]: Prisma Service: Connected' })
}

/**
 * Shutdown the Prisma client.
 */
async function shutdownPrisma() {
  await prisma.$disconnect()
  logger({ level: LOG_LEVEL.INFO, message: '[💎]: Prisma Service: Disconnected' })
}

export { prisma, initPrisma, shutdownPrisma }
