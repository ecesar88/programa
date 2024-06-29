import { objectType } from 'nexus'

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.int('id')
    t.string('dateTime')
    t.string('address')
    t.string('food')
  }
})
