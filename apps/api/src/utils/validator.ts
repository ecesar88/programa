import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodObject, ZodRawShape, z } from 'zod'

export function ZodBodyValidator<T extends ZodRawShape>(schema: ZodObject<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (err) {
      let message = 'Validation Failed'
      let details: any = {}

      if (err instanceof ZodError) {
        message = `Validation failed: ${err.issues.length} errors detected in body`
        details = err.issues
      }

      // const badReqError = new BadRequestError(message)
      // badReqError.details = details

      next(message)
    }
  }
}

export function ZodQueryValidator<T extends ZodRawShape>(schema: ZodObject<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query)
      next()
    } catch (err) {
      let message = 'Query Format Error'
      let details: any = {}

      if (err instanceof ZodError) {
        message = `Validation failed: ${err.issues.length} errors detected in query params`
        details = err.issues
      }

      // const badReqError = new BadRequestError(message)
      // badReqError.details = details

      next(message)
    }
  }
}

export function ZodParamValidator<T extends ZodRawShape>(schema: ZodObject<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params)
      next()
    } catch (err) {
      let message = 'Query Format Error'
      let details: any = {}

      if (err instanceof ZodError) {
        message = `Validation failed: ${err.issues.length} errors detected in url params`
        details = err.issues
      }

      // const badReqError = new BadRequestError(message)
      // badReqError.details = details

      next(message)
    }
  }
}

export function ZodIdValidator(idField = 'id') {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params[idField] = z.number({ coerce: true }).parse(req.params[idField]) as any
      next()
    } catch (err) {
      let message = 'Query Format Error'
      let details: any = {}

      if (err instanceof ZodError) {
        message = err.message
        details = err.issues
      }

      // const badReqError = new BadRequestError(message)
      // badReqError.details = details

      next(message)
    }
  }
}
