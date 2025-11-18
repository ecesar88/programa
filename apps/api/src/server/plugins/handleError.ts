import type { Response } from 'express'
import type { GraphQLError } from 'graphql'
import type { useErrorHandler } from 'graphql-yoga'
import { AuthErrorHandler } from './errorHandlers/handleAuthErrors'
import { GenericErrorHandler } from './errorHandlers/handleGenericError'
import { PrismaErrorHandler } from './errorHandlers/handlePrismaErrors'
import { InputValidationErrorHandler } from './errorHandlers/handleValidationError'

type ContextMeta = { contextValue: { req?: Request & { res?: Response } } }

export const handleError: Parameters<typeof useErrorHandler>['0'] = (handler) => {
  // This callback is called once, containing all GraphQLError emitted during execution phase
  handler.errors.forEach((error) => {
    const graphqlError = error as GraphQLError
    const responseObject = (handler?.context as ContextMeta)?.contextValue?.req?.res

    const handlers = [
      AuthErrorHandler,
      PrismaErrorHandler,
      InputValidationErrorHandler,
      GenericErrorHandler
    ]

    for (const handler of handlers) {
      const handled = new handler().handle(graphqlError, responseObject)
      if (handled) break // stop after first successful handler
    }
  })
}
