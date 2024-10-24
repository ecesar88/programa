import * as z from 'zod'
import { builder } from '../../builder'
import { RecordNotFoundError } from '../_errors/errors'
import { create, queryAll, queryOne, remove } from './resolvers'
import { MenuEntryType, MenuEntryVariantInputType } from './types'

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
    resolve: queryOne
  })
)

// builder.queryField('searchMenuEntries', (t) =>
//   t.field({
//     type: [MenuEntryType],
//     args: {
//       search: t.arg.string({
//         required: true,
//         validate: {
//           schema: z.string()
//         }
//       })
//     },
//     resolve: search
//   })
// )

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
      description: t.arg.string({
        required: false,
        validate: {
          minLength: 3,
          type: 'string'
        }
      }),
      variant: t.arg({ type: [MenuEntryVariantInputType], required: false })
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

builder.mutationField('deleteMenuEntryById', (t) =>
  t.field({
    type: MenuEntryType,
    errors: {
      types: [RecordNotFoundError]
    },
    args: {
      id: t.arg.int({
        required: true,
        validate: {
          schema: z.number().nonnegative().positive()
        }
      })
    },
    resolve: remove
  })
)
