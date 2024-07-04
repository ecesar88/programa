import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../../services/prismaService'

import { container } from 'tsyringe'

export interface Context {
  prisma: PrismaClient
}

export const context = {
  prisma: container.resolve(PrismaService)
}
