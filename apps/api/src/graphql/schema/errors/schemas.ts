import { builder } from '../../builder'
import { RecordNotFoundError } from './errors'

export const ErrorInterface = builder.interfaceRef<Error>('Error').implement({
  fields: (t) => ({
    message: t.exposeString('message')
  })
})

builder.objectType(Error, {
  name: 'BaseError',
  interfaces: [ErrorInterface]
})

builder.objectType(RecordNotFoundError, {
  name: 'RecordNotFoundError',
  interfaces: [ErrorInterface],
  fields: (t) => ({
    message: t.exposeString('message')
  })
})
