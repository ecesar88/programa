import { Regex } from '@repo/shared/constants'
import * as z from 'zod'
import { builder } from '../../builder'
import { RecordNotFoundError } from '../_errors/errors'
import { create, queryAll, queryOne, remove, search, update } from './resolvers'
import { Client, UserCreateOrUpdateInput } from './types'

builder.queryField('getAllClients', (t) =>
  t.field({
    type: [Client],
    args: {
      page: t.arg({
        type: 'Int',
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
    type: Client,
    errors: {
      types: [RecordNotFoundError]
    },
    args: {
      id: t.arg({
        type: 'Int',
        required: true,
        validate: {
          schema: z.number().positive('Id must be positive')
        }
      })
    },
    resolve: queryOne
  })
)

builder.queryField('searchClients', (t) =>
  t.field({
    type: [Client],
    args: {
      search: t.arg({
        type: 'String',
        required: true,
        validate: {
          schema: z.string()
        }
      })
    },
    resolve: search
  })
)

builder.mutationField('createClient', (t) =>
  t.field({
    type: Client,
    args: {
      name: t.arg({
        type: 'String',
        required: true,
        validate: {
          schema: z.string().min(3)
        }
      }),
      phone: t.arg({
        type: 'String',
        required: false,
        validate: {
          schema: z.string().regex(Regex.PHONE_REGEX, 'Invalid phone format')
        }
      })
    },
    resolve: create
  })
)

builder.mutationField('updateClient', (t) =>
  t.field({
    type: Client,
    args: {
      id: t.arg({
        type: 'Int',
        required: true,
        validate: {
          schema: z.number().nonnegative()
        }
      }),
      data: t.arg({
        type: UserCreateOrUpdateInput,
        required: true
      })
    },
    resolve: update
  })
)

builder.mutationField('deleteClient', (t) =>
  t.field({
    type: Client,
    errors: {
      types: [RecordNotFoundError]
    },
    args: {
      id: t.arg({
        type: 'Int',
        required: true,
        validate: {
          schema: z.number().nonnegative()
        }
      })
    },
    resolve: remove
  })
)
