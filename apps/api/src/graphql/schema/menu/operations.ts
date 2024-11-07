import * as z from 'zod'
import { builder } from '../../builder'
import { RecordNotFoundError } from '../_errors/errors'
import { create, queryAll, queryOne, remove } from './resolvers'
import { MenuEntryObject, MenuEntryVariantInput } from './types'

builder.queryField('getAllMenuEntries', (t) =>
  t.field({
    type: [MenuEntryObject],
    args: {
      page: t.arg({
        type: 'Int',
        defaultValue: 1,
        validate: {
          schema: z.number().positive('Page must be a positive integer')
        }
      })
    },
    resolve: queryAll
  })
)

builder.queryField('getMenuEntryById', (t) =>
  t.field({
    type: MenuEntryObject,
    errors: {
      types: [RecordNotFoundError]
    },
    args: {
      id: t.arg({
        type: 'Int',
        required: true,
        validate: {
          schema: z.number().positive('Id must be a positive integer')
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

// create operations/resolvers: createVariant, editVariant, deleteVariant

builder.mutationField('createMenuEntry', (t) =>
  t.field({
    type: MenuEntryObject,
    args: {
      name: t.arg({
        type: 'String',
        required: true,
        validate: {
          minLength: 3,
          type: 'string'
        }
      }),
      description: t.arg({
        type: 'String',
        required: false,
        validate: {
          minLength: 3,
          type: 'string'
        }
      }),
      variant: t.arg({ type: [MenuEntryVariantInput], required: false })
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
    type: MenuEntryObject,
    errors: {
      types: [RecordNotFoundError]
    },
    args: {
      id: t.arg({
        type: 'Int',
        required: true,
        validate: {
          schema: z.number().nonnegative().positive()
        }
      })
    },
    resolve: remove
  })
)
