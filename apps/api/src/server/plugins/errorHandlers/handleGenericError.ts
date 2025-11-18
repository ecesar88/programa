import type { Response } from 'express'
import type { GraphQLError } from 'graphql'
import { HttpStatusCode } from 'src/constants'
import { ERROR_CODES } from 'src/server/graphql/schema/_errors/errors'
import { isDev } from 'src/utils/functions'
import { colorizeAsJSON, LOG_LEVEL, logger } from '../../../utils/logger'
import { BaseErrorHandler } from './_baseErrorHandler'

export class GenericErrorHandler extends BaseErrorHandler<GraphQLError> {
  private isDevelopment = isDev()

  handle(error: GraphQLError, res?: Response) {
    logger({
      level: LOG_LEVEL.ERROR,
      message: '[Error]',
      object: colorizeAsJSON(JSON.stringify(error ?? []))
    })

    BaseErrorHandler.sendErrorPayload(
      {
        name: error.name,
        message: error.message,
        path: error.path,
        ...(this.isDevelopment && {
          stack: error.stack
        })
      },
      ERROR_CODES.GENERIC_ERROR,
      res,
      HttpStatusCode.INTERNAL_SERVER_ERROR
    )

    return true
  }
}
