import { AuthError } from '../server/graphql/schema/_errors/errors'
import { Role } from '../constants/role'
import { colorizeAsJSON, LOG_LEVEL, logger } from './logger'
import { Resolver } from './types/shared'

export function authenticateResolver<T = object>(
  resolver: Resolver<T>,
  allowedRoles?: Array<keyof typeof Role>
): Resolver {
  return (parent, args, context, info) => {
    const { operation } = info
    const user = context?.user

    const operationType = operation.operation
    const resolverName = operation.name?.value

    if (!user) {
      logger({
        level: LOG_LEVEL.WARN,
        message: 'Unauthorized',
        object: colorizeAsJSON({
          operation: operationType,
          resolverName,
          reason: 'USER_NOT_AUTHENTICATED'
        })
      })

      return new AuthError(
        `Not authorized to resolve ${operationType}.${resolverName}: NOT_AUTHENTICATED.`
      )
    }

    const { role: userRole } = user

    if (userRole && allowedRoles) {
      const hasPermissionToResolve = allowedRoles.includes(userRole)

      if (!hasPermissionToResolve) {
        return new AuthError(
          `Not authorized to resolve ${operationType}.${resolverName}: FORBIDDEN.`
        )
      }
    }

    return resolver(parent, args as T, context, info)
  }
}
