import { prismaPaginate } from '../../utils/prismaPaginate'
import { GenericFieldResolver } from './utils'

export default {
  async queryAll(_root, _args, ctx) {
    // const PAGE_NUMBER = parseInt(pageNumber as string)
    const PAGE_NUMBER = 1

    try {
      return ctx.prisma.order.findMany({
        ...prismaPaginate(PAGE_NUMBER),
        orderBy: {
          id: 'desc'
        }
      })
    } catch (e) {
      throw new Error('Err')
    }
  }

  // async queryOne(_root, args, ctx) {
  //   if (!args.id) {
  //     throw new Error('ID is mandatory')
  //   }

  //   try {
  //     return ctx.prisma.client.findFirstOrThrow({
  //       where: {
  //         id: args.id
  //       }
  //     })
  //   } catch (e) {
  //     throw new Error('Err')
  //   }
  // },

  // async create(_root, _args, ctx) {
  //   return {}
  // }

  // async update(_root, _args, ctx) {
  //   try {
  //   } catch (e) {
  //     throw new Error('Err')
  //   }
  // },

  // async delete(_root, _args, ctx) {
  //   try {
  //   } catch (e) {}
  // }
} satisfies GenericFieldResolver<'Order'>
