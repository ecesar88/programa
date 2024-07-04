import { builder } from '../../builder'
import { RecordNotFoundError } from '../errors/errors'
import { create, queryAll, queryOne, remove, update } from './resolvers'
import { ClientType, UserUpdateInput } from './types'

builder.queryField('getAllClients', (t) =>
  t.field({
    type: ClientType,
    args: {
      page: t.arg({
        type: 'Int',
        defaultValue: 1
      })
    },
    resolve: queryAll
  })
)

builder.queryField('getClientById', (t) =>
  t.field({
    type: ClientType,
    // errors: {
    //   types: [RecordNotFoundError]
    // },
    args: {
      id: t.arg({
        type: 'Int',
        required: true
      })
    },
    resolve: queryOne
  })
)

builder.mutationField('createClient', (t) =>
  t.field({
    type: ClientType,
    args: {
      name: t.arg({
        type: 'String',
        required: true
      }),
      phone: t.arg({
        type: 'String',
        required: false
      })
    },
    resolve: create
  })
)

builder.mutationField('updateClient', (t) =>
  t.field({
    type: ClientType,
    errors: {
      types: [RecordNotFoundError]
    },
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
