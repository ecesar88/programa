import { InputValidationError } from '@pothos/plugin-validation'
import { authenticateResolver } from '../../../../utils/authenticateResolver'
import z from 'zod'
import { builder } from '../../builder'
import { RecordNotFoundError } from '../_errors/errors'
import { Phone } from '../_sharedTypes/phone'
import { create, queryOne, remove, update } from './resolvers'
import { CreateContactValidationSchema, UpdateContactValidationSchema } from './schemas'
import { Contact, ContactCreateInput, ContactUpdateInput } from './types'

builder.mutationField('createContact', (t) =>
  t.field({
    type: Contact,
    description: 'Create a new contact',
    errors: {
      types: [InputValidationError]
    },
    args: {
      data: t
        .arg({
          type: ContactCreateInput,
          required: true
        })
        .validate(CreateContactValidationSchema)
    },
    resolve: authenticateResolver(create)
  })
)

builder.queryField('contact', (t) =>
  t.field({
    type: [Phone],
    description: 'Get a contact by id',
    errors: {
      types: [RecordNotFoundError]
    },
    args: {
      id: t.arg.string({
        validate: z.uuid(),
        required: true
      })
    },
    resolve: authenticateResolver(queryOne)
  })
)

builder.mutationField('updateContact', (t) =>
  t.field({
    type: Phone,
    description: 'Updates a contact by id.',
    errors: {
      types: [InputValidationError, RecordNotFoundError]
    },
    args: {
      input: t
        .arg({
          type: ContactUpdateInput,
          required: true
        })
        .validate(UpdateContactValidationSchema)
    },
    resolve: authenticateResolver(update)
  })
)

builder.mutationField('deleteContact', (t) =>
  t.field({
    type: Contact,
    description: 'Delete a contact',
    errors: {
      types: [RecordNotFoundError]
    },
    args: {
      id: t.arg.string({
        validate: z.uuid(),
        required: true
      })
    },
    resolve: authenticateResolver(remove)
  })
)
