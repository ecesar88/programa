import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import ClientResolver from '../resolvers/ClientResolver'

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
    t.nonNull.list.field('clients', {
      type: 'Client',
      resolve: ClientResolver.queryAll
    })
  }
})

export const GetQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('client', {
      type: 'Client',
      args: {
        id: nonNull(intArg({ description: 'ID of the user' })),
        teste: stringArg()
      },
      resolve: ClientResolver.queryOne
    })
  }
})

export const CreateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('create', {
      type: 'Client',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg())
      },
      resolve: ClientResolver.create
    })
  }
})

export const UpdateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('update', {
      type: 'Client',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg())
      },
      resolve: ClientResolver.create
    })
  }
})

export const DeleteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('delete', {
      type: 'Client',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg())
      },
      resolve: ClientResolver.create
    })
  }
})