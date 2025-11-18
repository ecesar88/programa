import type { Response } from 'express'
import { HttpStatusCode } from 'src/constants'
import type { ERROR_CODES } from 'src/server/graphql/schema/_errors/errors'

export abstract class BaseErrorHandler<ErrorType> {
  abstract handle(originalError: ErrorType, response?: Response): boolean

  protected static async sendErrorPayload(
    errorPayload: Record<string, unknown> | Error,
    errorCode: ERROR_CODES,
    res?: Response,
    status?: HttpStatusCode
  ) {
    const response = {
      error: {
        code: errorCode,
        ...errorPayload
      }
    }

    return res?.status(status ?? HttpStatusCode.INTERNAL_SERVER_ERROR).json(response)
  }
}
