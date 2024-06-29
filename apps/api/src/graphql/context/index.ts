import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../../services/prismaService'

export interface Context {
  prisma: PrismaClient
}

export const context = {
  prisma: new PrismaService()
}
