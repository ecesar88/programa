import * as z from 'zod'
import { builder } from '../../builder'
import { RecordNotFoundError } from '../_errors/errors'
import { create, queryAll, queryOne } from './resolvers'
import { OrderCreateOrUpdateInput, OrderObject } from './types'

builder.queryField('getAllOrders', (t) =>
  t.field({
    type: [OrderObject],
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

builder.queryField('getOrderById', (t) =>
  t.field({
    type: OrderObject,
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

// builder.queryField('searchOrders', (t) =>
//   t.field({
//     type: [OrderObject],
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

builder.mutationField('createOrder', (t) =>
  t.field({
    type: OrderObject,
    args: {
      data: t.arg({
        type: OrderCreateOrUpdateInput,
        required: true
      })
    },
    resolve: create
  })
)

// builder.mutationField('updateOrder', (t) =>
//   t.field({
//     type: OrderObject,
//     errors: {
//       types: [RecordNotFoundError]
//     },
//     args: {
//       id: t.arg({
//         type: 'Int',
//         required: true,
//         validate: {
//           schema: z.number().positive()
//         }
//       }),
//       data: t.arg({
//         type: OrderCreateOrUpdateInput,
//         required: true
//         // TODO: update this both in here and on MenuEntry
//         // validate: {
//         //   schema: MenuEntryCreateOrUpdateInputSchema
//         // }
//       })
//     },
//     resolve: update
//   })
// )

// builder.mutationField('deleteOrder', (t) =>
//   t.field({
//     type: OrderObject,
//     errors: {
//       types: [RecordNotFoundError]
//     },
//     args: {
//       id: t.arg({
//         type: 'Int',
//         required: true,
//         validate: {
//           schema: z.number().positive()
//         }
//       })
//     },
//     resolve: remove
//   })
// )

//**************************************** MENU LABEL ************************************************ */

// builder.mutationField('createOrUpdateOrderObservation', (t) =>
//   t.field({
//     type: OrderObservationObject,
//     errors: {
//       types: [RecordNotFoundError]
//     },
//     args: {
//       id: t.arg({
//         type: 'Int',
//         required: false,

//         validate: {
//           schema: z.number().positive('Id must be a positive integer')
//         }
//       }),
//       data: t.arg({
//         type: CreateOrderObservation,
//         required: true
//       })
//     },
//     resolve: createOrUpdateMenuEntryLabel
//   })
// )

// builder.mutationField('deleteMenuEntryLabel', (t) =>
//   t.field({
//     type: MenuEntryLabelObject,
//     errors: {
//       types: [RecordNotFoundError]
//     },
//     args: {
//       id: t.arg({
//         type: 'Int',
//         required: true,

//         validate: {
//           schema: z.number().positive('Id must be a positive integer')
//         }
//       })
//     },
//     resolve: deleteMenuEntryLabel
//   })
// )
