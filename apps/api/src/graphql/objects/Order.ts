import { extendType, objectType } from 'nexus'

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.int('id')
    t.string('dateTime')
    t.string('address')
    t.string('food')
  }
})


// export const GetAllQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.nonNull.list.field('orders', {
//       type: 'Order',
//       resolve:
//     })
//   },
// })
