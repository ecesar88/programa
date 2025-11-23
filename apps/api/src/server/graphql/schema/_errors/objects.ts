import { InputValidationError, StandardSchemaV1 } from '@pothos/plugin-validation'
import { builder } from '../../builder'
import { AuthError, BusinessError, RecordNotFoundError } from './errors'

export const ErrorInterface = builder.interfaceRef<Error>('Error').implement({
  fields: (t) => ({
    message: t.exposeString('message')
  })
})

/**
 * BaseError
 */

builder.objectType(Error, {
  name: 'BaseError',
  description: "Base Error",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    message: t.exposeString('message')
  })
})

/**
 * RecordNotFoundError
 */

builder.objectType(RecordNotFoundError, {
  name: 'RecordNotFoundError',
  description: "Record not found error",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    message: t.exposeString('message')
  })
})

/**
 * AuthError
 */

builder.objectType(AuthError, {
  name: 'AuthError',
  description: "Authentication error",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    message: t.exposeString('message')
  })
})

/**
 * BusinessError
 */

const BusinessValidationErrorRef = builder.objectRef<any>('BusinessValidationError')
const BusinessValidationErrorObj = BusinessValidationErrorRef.implement({
  fields: (t) => ({
    name: t.exposeString('name'),
    failMessage: t.exposeString('failMessage')
  })
})

builder.objectType(BusinessError, {
  name: 'BusinessError',
  description: "Business logic error",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    message: t.exposeString('message'),
    isValid: t.exposeBoolean('isValid'),
    errors: t.field({
      type: [BusinessValidationErrorObj],
      resolve: (t) => t.errors
    })
  })
})

/**
 * InputValidationError
 */

const InputValidationIssue = builder
  .objectRef<StandardSchemaV1.Issue>('InputValidationIssue')
  .implement({
    fields: (t) => ({
      message: t.exposeString('message'),
      path: t.stringList({
        resolve: (issue) => issue.path?.map((p) => String(p))
      })
    })
  })

builder.objectType(InputValidationError, {
  name: 'InputValidationError',
  interfaces: [ErrorInterface],
  fields: (t) => ({
    issues: t.field({
      type: [InputValidationIssue],
      resolve: (err) => err.issues
    })
  })
})
