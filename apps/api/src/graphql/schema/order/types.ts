import { MenuEntry, Order, OrderBill, OrderObservation } from '@prisma/client'
import { builder } from '../../builder'
import { MenuEntryObject } from '../menu/types'

/* --- Interface Definitions --- */

export interface TypeOrder extends Order {
  id: number
  dateTime: Date
  address: string
  // items: MenuEntry[]
  totalPrice: number
  splitOrderPriceBy: number
  bill: OrderBill[]
  observations: OrderObservation[]
}

export interface TypeOrderBill extends OrderBill {
  id: number
  price: number
}

export interface TypeOrderObservation extends OrderObservation {
  id: number
  content: string
}

export type TypeOrderInput = Omit<TypeOrder, 'id'>

/* --- Object Definitions --- */

export const OrderObservationRef = builder.objectRef<TypeOrderObservation>('OrderObservation')
export const OrderObservationObject = OrderObservationRef.implement({
  description: 'The order observation. Example: "No pepper on pizza"',
  fields: (t) => ({
    id: t.exposeInt('id'),
    content: t.exposeString('content')
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
    // items: t.field({
    //   type: [MenuEntryObject],
    //   resolve: (t) => t.items
    // }),
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
