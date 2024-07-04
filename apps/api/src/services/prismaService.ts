import { PrismaClient } from '@prisma/client'
import { singleton } from 'tsyringe'
import { LOG_TYPE, logger } from '../utils/logger'

@singleton()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ log: ['query', 'error', 'info', 'warn'] })
    logger({ level: LOG_TYPE.INFO, message: 'Prisma Service: Connected' })
  }
}
