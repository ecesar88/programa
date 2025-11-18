import { InputValidationError } from '@pothos/plugin-validation'
import z from 'zod'
import { builder } from '../../builder'
import { create, queryOne, remove, update } from './resolvers'
import { CreateAddressValidationSchema, UpdateAddressValidationSchema } from './schemas'
import { Address, AddressCreateInput, AddressUpdateInput } from './types'

builder.mutationField('createAddress', (t) =>
  t.field({
    type: Address,
    description: 'Create a new address',
    errors: {
      types: [InputValidationError]
    },
    args: {
      data: t
        .arg({
          type: AddressCreateInput,
          required: true
        })
        .validate(CreateAddressValidationSchema)
    },
    resolve: create
  })
)

builder.queryField('address', (t) =>
  t.field({
    type: [Address],
    description: 'Get an address by id',
    args: {
      id: t.arg.string({
        validate: z.uuid(),
        required: true
      })
    },
    resolve: queryOne
  })
)

builder.mutationField('updateAddress', (t) =>
  t.field({
    type: Address,
    description: 'Updates a specific address by id.',
    errors: {
      types: [InputValidationError]
    },
    args: {
      input: t
        .arg({
          type: AddressUpdateInput,
          required: true
        })
        .validate(UpdateAddressValidationSchema)
    },
    resolve: update
  })
)

builder.mutationField('deleteAddress', (t) =>
  t.field({
    type: Address,
    description: 'Delete an address from the system',
    args: {
      id: t.arg.string({
        validate: z.uuid(),
        required: true
      })
    },
    resolve: remove
  })
)
