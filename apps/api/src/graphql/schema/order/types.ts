import { Prisma } from '@prisma/client'
import { builder } from '../../builder'
import { MenuEntryObject } from '../menu/types'

/* --- Interface Definitions --- */

type TypeOrder = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        menuEntry: {
          include: {
            variants: true
            categories: true
            labels: true
          }
        }
        observations: true
      }
    }
    bill: true
    observations: true
  }
}>

type TypeOrderObservation = TypeOrder['observations'][number]
type TypeOrderEntryObservation = TypeOrder['items'][number]['observations'][number]
type TypeOrderEntry = TypeOrder['items'][number]
type TypeOrderBill = TypeOrder['bill'][number]

export type TypeOrderInput = Omit<TypeOrder, 'id'>

/* --- Object Definitions --- */

export const OrderEntryObservationRef =
  builder.objectRef<TypeOrderEntryObservation>('OrderEntryObservation')

export const OrderEntryObservationObject = OrderEntryObservationRef.implement({
  description: 'The order entry observation. Example: "No pepper on pizza"',
  fields: (t) => ({
    id: t.exposeInt('id'),
    content: t.exposeString('content')
  })
})

export const OrderObservationRef = builder.objectRef<TypeOrderObservation>('OrderObservation')
export const OrderObservationObject = OrderObservationRef.implement({
  description: 'The order observation. Example: "Payment will be in 24x."',
  fields: (t) => ({
    id: t.exposeInt('id'),
    content: t.exposeString('content')
  })
})

export const OrderEntryRef = builder.objectRef<TypeOrderEntry>('OrderEntry')
export const OrderEntryObject = OrderEntryRef.implement({
  description: 'The order entry. Example: "Pizza 4 cheese"',
  fields: (t) => ({
    id: t.exposeInt('id'),
    quantity: t.exposeInt('quantity'),
    menuEntry: t.field({
      type: MenuEntryObject,
      resolve: (t) => t.menuEntry
    })
  })
})

export const OrderBillRef = builder.objectRef<TypeOrderBill>('OrderBill')
export const OrderBillObject = OrderBillRef.implement({
  description:
    'The order bill which contains the price for each bill if the order price was split, or a single total price if it was not.',
  fields: (t) => ({
    id: t.exposeInt('id'),
    price: t.exposeFloat('price')
  })
})

export const OrderRef = builder.objectRef<TypeOrder>('Order')
export const OrderObject = OrderRef.implement({
  description: 'An Order containing one or more MenuEntries',
  fields: (t) => ({
    id: t.exposeInt('id'),
    dateTime: t.expose('dateTime', { type: 'DateTime' }),
    address: t.exposeString('address'),
    splitOrderPriceBy: t.exposeFloat('splitOrderPriceBy'),
    totalPrice: t.exposeFloat('totalPrice'),
    items: t.field({
      type: [OrderEntryObject],
      resolve: (t) => t.items
    }),
    observations: t.field({
      type: [OrderObservationObject],
      resolve: (t) => t.observations
    }),
    bill: t.field({
      type: [OrderBillObject],
      resolve: (t) => t.bill
    })
  })
})

/* --- Input Definitions --- */

export const OrderObservationInput = builder.inputType('OrderObservationInput', {
  fields: (t) => ({
    content: t.string()
  })
})

export const OrderBillInput = builder.inputType('OrderBillInput', {
  fields: (t) => ({
    price: t.float()
  })
})

export const OrderCreateOrUpdateInput = builder.inputType('OrderInput', {
  description: 'Input to create a new Order',
  fields: (t) => ({
    address: t.string({ required: true }),
    totalPrice: t.float({
      defaultValue: 0,
      validate: (value) => value >= 0
    }),
    splitOrderPriceBy: t.int({ defaultValue: 1 }),
    bill: t.field({
      type: [OrderBillInput]
    }),
    observations: t.field({
      required: false,
      type: [OrderObservationInput]
    })
  })
})
