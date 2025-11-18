import type { Response } from 'express'
import type { GraphQLError } from 'graphql'
import { HttpStatusCode } from 'src/constants'
import { AuthError, ERROR_CODES } from 'src/server/graphql/schema/_errors/errors'
import { BaseErrorHandler } from './_baseErrorHandler'

export class AuthErrorHandler extends BaseErrorHandler<GraphQLError> {
  handle(error: GraphQLError, res?: Response): boolean {
    // User is unauthorized, return appropriate response
    if (error?.originalError instanceof AuthError) {
      const errorMessage = error?.originalError?.message
      BaseErrorHandler.sendErrorPayload(
        { message: errorMessage ?? ERROR_CODES.AUTH },
        ERROR_CODES.AUTH,
        res,
        HttpStatusCode.FORBIDDEN
      )

      return true
    }

    return false
  }
}
