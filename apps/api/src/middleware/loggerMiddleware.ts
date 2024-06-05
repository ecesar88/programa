import { HttpStatusCode } from '@repo/shared'
import { NextFunction, Request, Response } from 'express'
import nodeColorLog from 'node-color-log'

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const log = () => {
    const logPrefix = ' => '

    const REQ_METHOD = req.method
    const RES_STATUS = res.statusCode
    const ENDPOINT = req.originalUrl
    const CLIENT_IP = req.ip

    const getAppropriateColorBasedOnResponseCode = (responseCode: HttpStatusCode) => {
      const logger = nodeColorLog.append(new Date().toISOString() + ' ')

      switch (responseCode) {
        case HttpStatusCode.OK: {
          return logger.bgColor('green').color('black')
        }

        case HttpStatusCode.UNAUTHORIZED: {
          return logger.bgColor('yellow').color('black')
        }

        case HttpStatusCode.INTERNAL_SERVER_ERROR: {
          return logger.bgColor('red').color('black')
        }

        case HttpStatusCode.BAD_REQUEST: {
          return logger.bgColor('yellow').color('black')
        }

        default: {
          return nodeColorLog.bgColor('green').color('black')
        }
      }
    }

    getAppropriateColorBasedOnResponseCode(RES_STATUS)
      .append(`[${RES_STATUS}]`)
      .reset()
      .color('green')
      .append(logPrefix)
      .color('yellow')
      .append(REQ_METHOD)
      .color('green')
      .append(` on ${ENDPOINT}`)
      .color('yellow')
      .append(' from ')
      .append(CLIENT_IP)
      .append('\n')
      .log()
  }

  res.on('finish', log)

  next()
}
