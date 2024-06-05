import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { fromError } from 'zod-validation-error'
import { LOG_LEVEL, logger } from '../utils/logger'
import { HttpStatusCode } from '@shared/constants'

export function errorHandlerMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response<any, Record<string, any>> {
  if (error instanceof ZodError) {
    const formattedError = fromError(error)

    logger({
      level: LOG_LEVEL.ERROR,
      message: 'Zod Validation Error',
      object: JSON.stringify(formattedError, null, 2)
    })

    return res.status(HttpStatusCode.BAD_REQUEST).send({
      message: 'Validation error',
      error: formattedError
    })
  }

  // Refer to: https://www.prisma.io/docs/orm/reference/error-reference#error-codes
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2001':
      case 'P2002':
      case 'P2003':
      case 'P2004':
      case 'P2012': {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: error.message
        })

        break
      }

      case 'P2000': {
        res.status(HttpStatusCode.BAD_REQUEST).send({
          message: 'Invalid data type'
        })

        break
      }

      case 'P2005': {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: "Invalid field value for the field's type"
        })

        break
      }
    }

    logger({
      level: LOG_LEVEL.ERROR,
      message: 'Prisma Client Error',
      object: JSON.stringify(error, null, 2)
    })

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
      message: 'Algo deu errado :/'
    })
  }

  logger({
    level: LOG_LEVEL.ERROR,
    message: String(error)
  })

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
    message: 'Algo deu errado :/'
  })
}
