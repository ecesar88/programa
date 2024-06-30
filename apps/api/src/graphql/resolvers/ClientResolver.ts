import { Prisma } from '@prisma/client'
import { LOG_TYPE, logger } from '../../utils/logger'
import { prismaPaginate } from '../../utils/prismaPaginate'
import { GenericFieldResolver } from './utils'

export default {
  async queryAll(_root, args, ctx) {
    const { page } = args as { page: number }

    const PAGE_NUMBER = page

    try {
      return ctx.prisma.client.findMany({
        ...prismaPaginate(PAGE_NUMBER),
        orderBy: {
          id: 'desc'
        }
      })
    } catch (e) {
      throw new Error('Error fetching all clients')
    }
  },

  async queryOne(_root, args, ctx) {
    const { id } = args as { id: number }

    if (!id) {
      throw new Error('ID is mandatory')
    }

    try {
      return ctx.prisma.client.findFirstOrThrow({
        where: {
          id: args.id
        }
      })
    } catch (e) {
      throw new Error('Error fetching the client')
    }
  },

  async create(_root, args, ctx) {
    const { name, phone, orders } = args as Partial<Prisma.ClientCreateInput>

    try {
      logger({
        level: LOG_TYPE.GQL,
        message: 'Creating new client with data:',
        object: JSON.stringify(args, null, 2)
      })

      return await ctx.prisma.client.create({
        data: {
          name: name as string,
          phone
        }
      })
    } catch (error) {
      throw new Error('Error creating the client')
    }
  },

  async update(_root, _args, ctx) {
    return {}
    try {
    } catch (e) {
      throw new Error('Err')
    }
  },

  async delete(_root, _args, ctx) {
    return {}
    try {
    } catch (e) {}
  }
} satisfies GenericFieldResolver<'Client'>
