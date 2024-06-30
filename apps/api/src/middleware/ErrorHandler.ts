import { Injectable } from '@decorators/di'
import { ErrorMiddleware } from '@decorators/express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { HttpStatusCode } from '@repo/shared/constants'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { fromError } from 'zod-validation-error'
import { LOG_TYPE, logger } from '../utils/logger'

@Injectable()
export class ErrorHandlerMiddleware implements ErrorMiddleware {
  public use(error: Error, _req: Request, res: Response, next: NextFunction) {
    if (error instanceof ZodError) {
      const formattedError = fromError(error)

      logger({
        level: LOG_TYPE.ERROR,
        message: 'Zod Validation Error',
        object: JSON.stringify(formattedError, null, 2)
      })

      res.status(HttpStatusCode.BAD_REQUEST).send({
        message: 'Validation error',
        error: formattedError
      })

      next()
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
        level: LOG_TYPE.ERROR,
        message: 'Prisma Client Error',
        object: JSON.stringify(error, null, 2)
      })

      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error'
      })

      next()
    }

    logger({
      level: LOG_TYPE.ERROR,
      message: String(error)
    })

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error'
    })

    next()
  }
}
