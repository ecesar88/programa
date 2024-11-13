import * as z from 'zod'
import { builder } from '../../builder'
import { RecordNotFoundError } from '../_errors/errors'
import { create, queryAll, queryOne, remove, update } from './resolvers'
import { MenuEntryCreateOrUpdateInputSchema, MenuEntryVariantInputSchema } from './schemas'
import { MenuEntryCreateOrUpdateInput, MenuEntryObject, MenuEntryVariantInput } from './types'

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
      data: t.arg({
        type: MenuEntryCreateOrUpdateInput,
        required: true
      })
    },
    resolve: create
  })
)

builder.mutationField('updateMenuEntry', (t) =>
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
          schema: z.number().positive()
        }
      }),
      data: t.arg({
        type: MenuEntryCreateOrUpdateInput,
        required: true,
        validate: {
          schema: MenuEntryCreateOrUpdateInputSchema
        }
      })
    },
    resolve: update
  })
)

builder.mutationField('deleteMenuEntry', (t) =>
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
          schema: z.number().positive()
        }
      })
    },
    resolve: remove
  })
)
