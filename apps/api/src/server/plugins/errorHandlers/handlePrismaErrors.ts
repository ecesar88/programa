import { Prisma } from '@prisma/client'
import type { Response } from 'express'
import type { GraphQLError } from 'graphql'
import { HttpStatusCode } from 'src/constants'
import { ERROR_CODES } from 'src/server/graphql/schema/_errors/errors'
import { LOG_LEVEL, logger } from '../../../utils/logger'
import { BaseErrorHandler } from './_baseErrorHandler'

export class PrismaErrorHandler extends BaseErrorHandler<GraphQLError> {
  private extractFieldNameFromMessage(message: string) {
    const fieldRegExp = new RegExp(/fields: \(\`\w+\`\)/gi)
    return message.match(fieldRegExp)
  }

  handle(error: GraphQLError, res: Response) {
    let message: string = ' EMPTY '
    let relevantFieldName: string[] = []

    const originalError = error?.originalError

    // Refer to: https://www.prisma.io/docs/orm/reference/error-reference#error-codes
    if (originalError instanceof Prisma.PrismaClientKnownRequestError) {
      switch (originalError.code) {
        case 'P2001':
        case 'P2003':
        case 'P2004':
        case 'P2012': {
          message = originalError.message
          break
        }

        case 'P2000': {
          message = 'Invalid data type'
          break
        }

        case 'P2005': {
          message = 'Invalid field value for the field type'
          break
        }

        case 'P2002': {
          relevantFieldName = this.extractFieldNameFromMessage(originalError.message) as string[]
          message = 'Unique constraint violation'

          if (relevantFieldName) {
            message += ` on ${relevantFieldName}`
          }
        }
      }

      logger({
        level: LOG_LEVEL.ERROR,
        message: `[Prisma Client Error]: ${message}`,
        object: JSON.stringify(originalError, null, 2)
      })

      BaseErrorHandler.sendErrorPayload(
        {
          message
        },
        ERROR_CODES.PRISMA_CONSTRAINT_VIOLATION,
        res,
        HttpStatusCode.FORBIDDEN
      )

      return true
    }

    return false
  }
}
