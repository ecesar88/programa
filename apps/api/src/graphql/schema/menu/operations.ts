import * as z from 'zod'
import { builder } from '../../builder'
import { RecordNotFoundError } from '../_errors/errors'
import { create, queryAll, queryOne, remove, update } from './resolvers'
import { MenuEntryType } from './types'

builder.queryField('getAllMenuEntries', (t) =>
  t.field({
    type: [MenuEntryType],
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

builder.queryField('getMenuEntryById', (t) =>
  t.field({
    type: MenuEntryType,
    errors: {
      types: [RecordNotFoundError]
    },
    args: {
      id: t.arg.int({
        required: true,
        validate: {
          schema: z.number().positive('Id must be positive')
        }
      })
    },
    // validate: (value) => value.id,
    resolve: queryOne
  })
)

builder.mutationField('createMenuEntry', (t) =>
  t.field({
    type: MenuEntryType,
    args: {
      name: t.arg.string({
        validate: {
          minLength: 3,
          type: 'string'
        },
        required: true
      }),
      price: t.arg.float({
        required: true,
        validate: {
          schema: z.number().nonnegative()
        }
      }),
      description: t.arg.string({
        required: false,
        validate: {
          minLength: 3,
          type: 'string'
        }
      })
    },
    resolve: create
  })
)

// builder.mutationField('updateMenuEntry', (t) =>
//   t.field({
//     type: MenuEntryType,
//     args: {
//       id: t.arg({
//         type: 'Int',
//         required: true
//       }),
//       data: t.arg({
//         type: UserUpdateInput,
//         required: true
//       })
//     },
//     resolve: update
//   })
// )

// builder.mutationField('deleteMenuEntry', (t) =>
//   t.field({
//     type: MenuEntryType,
//     args: {
//       id: t.arg.int({
//         required: true,
//         validate: {
//           schema: z.number().nonnegative()
//         }
//       })
//     },
//     resolve: remove
//   })
// )
