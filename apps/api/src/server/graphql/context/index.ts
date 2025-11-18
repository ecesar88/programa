import type { PrismaClient, User } from '@prisma/client'
import type { createYoga, YogaInitialContext } from 'graphql-yoga'
import { prisma } from '../../services/prismaService'
import { LOG_LEVEL, logger } from '../../../utils/logger'
import { authenticateUser } from '../schema/auth/service'

export interface Context extends YogaInitialContext {
  prisma: PrismaClient
  user: User | null
}

export const getAuthHeader = (request: Request) => request.headers.get('authorization')

// Refer to: https://the-guild.dev/graphql/yoga-server/docs/features/context#default-context
export const context: Parameters<typeof createYoga>['0']['context'] = async (
  initialContext: YogaInitialContext
) => {
  let user: User | null = null

  const authHeader = getAuthHeader(initialContext.request)
  if (authHeader) {
    try {
      user = await authenticateUser(authHeader)
    } catch (error) {
      logger({
        level: LOG_LEVEL.ERROR,
        message: 'Error authenticating user',
        object: String(error)
      })
    }
  }

  return {
    prisma,
    user
  }
}
