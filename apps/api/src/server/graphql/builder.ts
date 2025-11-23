/** biome-ignore-all lint/suspicious/noExplicitAny: dont wan't to explain */
import SchemaBuilder from '@pothos/core'
import ErrorsPlugin from '@pothos/plugin-errors'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import { isRootField, wrapResolver } from '@pothos/plugin-tracing'
import ValidationPlugin from '@pothos/plugin-validation'
import { DateTimeResolver } from 'graphql-scalars'
import { LOG_LEVEL, logger } from '../../utils/logger'
import type { Context } from './context'
import { AuthError } from './schema/_errors/errors'

type SchemaType = {
  DefaultInputFieldRequiredness: true
  Scalars: {
    ID: {
      Output: number | string
      Input: string
    }
    DateTime: {
      Output: Date
      Input: Date
    }
    JSONObject: {
      Output: any
      Input: any
    }
  }
  Context: Context
  AuthScopes: {
    isAuthenticated: boolean
    // isAdmin: boolean;
  }
}

export const builder = new SchemaBuilder<SchemaType>({
  plugins: [ScopeAuthPlugin, ErrorsPlugin, ValidationPlugin],
  defaultInputFieldRequiredness: true, // Make all fields required by default
  errors: {
    unsafelyHandleInputErrors: true
  },
  // Refer to: https://pothos-graphql.dev/docs/plugins/scope-auth#customizing-error-messages
  scopeAuth: {
    treatErrorsAsUnauthorized: true,
    // runScopesOnType: true,
    unauthorizedError: (_parent, _context, info, _result) => {
      const { operation } = info

      const operationType = operation.operation
      const resolverName = operation.name?.value

      logger({
        level: LOG_LEVEL.WARN,
        message: 'Unauthorized'
      })

      return new AuthError(`Not authorized to resolve ${operationType}.${resolverName}`)
    },
    // Recommended when using subscriptions when this is not set, auth checks are run when event is resolved rather than when the subscription is created
    authorizeOnSubscribe: true,
    authScopes: async (context) => ({
      // isPublic: (param) => !!param
      isAuthenticated: !!context.user
      // customPerm: (perm) => context.permissionService.hasPermission(context.User, perm), // scope loader with argument // RBAC
    })
  },
  tracing: {
    // Enable tracing for rootFields by default, other fields need to opt in
    default: (config) => isRootField(config),
    // Log resolver execution duration
    wrap: (resolver, _options, config) =>
      wrapResolver(resolver, (error, duration) => {
        if (error) {
          logger({
            level: LOG_LEVEL.ERROR,
            message: (error as Error)?.message ?? ''
          })
        }

        logger({
          level: LOG_LEVEL.INFO,
          message: `Executed resolver ${config.parentType}.${
            config.name
          } in ${duration.toFixed(2)}ms`
        })
      })
  }
})

builder.addScalarType('DateTime', DateTimeResolver)
