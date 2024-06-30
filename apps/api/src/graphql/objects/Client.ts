import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import ClientResolver from '../resolvers/ClientResolver'

const OpSuffix = 'Client'

export const Client = objectType({
  name: 'Client',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('phone')
    t.list.field('orders', {
      type: 'Order'
    })
  }
})

export const GetAllQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field(`queryAll${OpSuffix}`, {
      type: 'Client',
      args: {
        page: intArg({ default: 1, description: 'The page number' })
      },
      resolve: ClientResolver.queryAll
    })
  }
})

export const GetQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field(`queryOne${OpSuffix}`, {
      type: 'Client',
      args: {
        id: nonNull(intArg({ description: 'ID of the user' }))
      },
      resolve: ClientResolver.queryOne
    })
  }
})

export const CreateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field(`create${OpSuffix}`, {
      type: 'Client',
      args: {
        // id: nonNull(intArg({ description: 'ID of the user' })),
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        phone: nonNull(stringArg())
      },
      resolve: ClientResolver.create
    })
  }
})

export const UpdateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field(`update${OpSuffix}`, {
      type: 'Client',
      /* args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg())
      } */
      resolve: ClientResolver.update
    })
  }
})

export const DeleteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field(`delete${OpSuffix}`, {
      type: 'Client',
      args: {
        id: nonNull(intArg()),
      },
      resolve: ClientResolver.delete
    })
  }
})
