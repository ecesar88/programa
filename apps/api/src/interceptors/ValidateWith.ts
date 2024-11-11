/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

/* eslint-disable @typescript-eslint/no-explicit-any */
import { attachMiddleware } from '@decorators/express'
import { NextFunction, Request, Response } from 'express'
import z from 'zod'
import { fromError } from 'zod-validation-error'

export function ValidateWith(zodSchema: z.objectInputType<any, any>) {
  return function (
    target: any,
    propertyKey: string
    // _descriptor: PropertyDescriptor
  ): ReturnType<typeof attachMiddleware> {
    return attachMiddleware(
      target,
      propertyKey,
      function (_req: Request, res: Response, next: NextFunction) {
        const originalJson = res.json

        res.json = function (body): any {
          try {
            zodSchema.parse(body)

            originalJson.call(this, body)
            return body
          } catch (error) {
            const formattedError = fromError(error)

            const newBody = {
              message: 'Validation Error',
              errors: formattedError
            }

            originalJson.call(this, newBody)
          }
        }

        next()
      }
    )
  }
}
