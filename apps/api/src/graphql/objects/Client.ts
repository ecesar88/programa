import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const Client = objectType({
  name: 'Client',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('phone')
    // t.list.field('orders', {
    //   type: ''
    // })
  }
})

export const ClientQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('clients', {
      type: 'Client',
      async resolve(_root, _args, ctx) {
        const clients = await ctx.prisma.client.findMany()
        return clients
      }
    })
  }
})

export const ClientMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createClient', {
      type: 'Client',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg())
      },
      resolve(_root, args, _ctx) {
        console.log(args)
        // ctx.prisma.client.create({ data: { name } })
        return {}
      }
    })
  }
})
