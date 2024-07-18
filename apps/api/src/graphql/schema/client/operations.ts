import { Regex } from '@repo/shared/constants'
import * as z from 'zod'
import { builder } from '../../builder'
import { RecordNotFoundError } from '../errors/errors'
import { create, queryAll, queryOne, remove, update } from './resolvers'
import { ClientType, UserUpdateInput } from './types'

builder.queryField('getAllClients', (t) =>
  t.field({
    type: ClientType,
    args: {
      page: t.arg.int({
        validate: {
          int: true,
          nonnegative: true
        },
        defaultValue: 1
      })
    },
    resolve: queryAll
  })
)

builder.queryField('getClientById', (t) =>
  t.field({
    type: ClientType,
    errors: {
      types: [RecordNotFoundError]
    },
    args: {
      id: t.arg.int({
        required: true,
        validate: {
          schema: z.number().positive('Id must be positive')
        }
      }),
    },
    // validate: (value) => value.id,
    resolve: queryOne
  })
)

builder.mutationField('createClient', (t) =>
  t.field({
    type: ClientType,
    args: {
      name: t.arg.string({
        validate: {
          minLength: 3,
          type: 'string'
        },
        required: true
      }),
      phone: t.arg.string({
        validate: {
          schema: z.string().regex(Regex.PHONE_REGEX, 'Invalid phone format')
        },
        required: false
      })
    },
    resolve: create
  })
)

builder.mutationField('updateClient', (t) =>
  t.field({
    type: ClientType,
    args: {
      id: t.arg({
        type: 'Int',
        required: true
      }),
      data: t.arg({
        type: UserUpdateInput,
        required: true
      })
    },
    resolve: update
  })
)

builder.mutationField('deleteClient', (t) =>
  t.field({
    type: ClientType,
    args: {
      id: t.arg({
        type: 'Int',
        required: true
      })
    },
    resolve: remove
  })
)
