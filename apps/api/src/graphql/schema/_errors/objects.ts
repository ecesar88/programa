import { builder } from '../../builder'
import { LengthError, RecordNotFoundError } from './errors'

export const ErrorInterface = builder.interfaceRef<Error>('Error').implement({
  fields: (t) => ({
    message: t.exposeString('message')
  })
})

builder.objectType(Error, {
  name: 'BaseError',
  interfaces: [ErrorInterface],
  fields: (t) => ({
    message: t.exposeString('message')
  })
})

builder.objectType(RecordNotFoundError, {
  name: 'RecordNotFoundError',
  interfaces: [ErrorInterface],
  fields: (t) => ({
    message: t.exposeString('message')
  })
})

builder.objectType(LengthError, {
  name: 'LengthError',
  interfaces: [ErrorInterface],
  fields: (t) => ({
    minLength: t.exposeInt('minLength')
  })
})
