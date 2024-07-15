// import { Prisma } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { GraphQLResolveInfo } from 'graphql'
import { LOG_TYPE, logger } from '../../../utils/logger'
import { prismaPaginate } from '../../../utils/prismaPaginate'
import { Context } from '../../context'
import { RecordNotFoundError } from '../errors/errors'

type Resolver<T> = (parent: {}, args: T, ctx: Context, info: GraphQLResolveInfo) => any

export const queryAll: Resolver<{ page?: number | null }> = async (_parent, args, ctx, _info) => {
  const { page } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Fetching all clients`
  })

  try {
    return ctx.prisma.client.findMany({
      ...prismaPaginate(page),
      orderBy: {
        id: 'desc'
      }
    })
  } catch (e) {
    throw new Error('Error fetching all clients')
  }
}

export const queryOne: Resolver<{ id: number }> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Fetching client with id '${id}'`
  })

  try {
    const client = await ctx.prisma.client.findFirst({
      where: {
        id
      }
    })

    if (!client) {
      throw new RecordNotFoundError(`Client with id ${id}`)
    }

    return client
  } catch (e) {
    throw new Error(String(e))
  }
}

export const create: Resolver<{ name: string; phone?: string | null }> = async (
  _parent,
  args,
  ctx,
  _info
) => {
  const { name, phone, orders } = args as Partial<Prisma.ClientCreateInput>

  logger({
    level: LOG_TYPE.INFO,
    message: 'Creating new client with data:',
    object: JSON.stringify(args, null, 2)
  })

  try {
    return await ctx.prisma.client.create({
      data: {
        name: name as string,
        phone
      }
    })
  } catch (error) {
    throw new Error('Error creating the client')
  }
}

export const update: Resolver<{ id: number; data: Partial<Prisma.ClientUpdateInput> }> = async (
  _parent,
  args,
  ctx,
  _info
) => {
  const { id, data } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Updating new client with id '${id}' with data: `,
    object: JSON.stringify(args.data, null, 2)
  })

  const client = await ctx.prisma.client.findFirst({ where: { id } })

  if (!client) {
    throw new RecordNotFoundError('Client')
  }

  try {
    return await ctx.prisma.client.update({
      where: {
        id
      },
      data
    })
  } catch (e) {
    return {}
    logger({
      level: LOG_TYPE.INFO,
      message: `Updating new client with id '${id}' with data: `,
      object: JSON.stringify(args.data, null, 2)
    })

    throw new Error(`Error updating client with id ${id}`)
  }
}

export const remove: Resolver<{ id: number }> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Deleting client with id: ${id}`
  })

  try {
    const clientToRemove = await ctx.prisma.client.findFirstOrThrow({ where: { id } })

    return await ctx.prisma.client.delete({
      where: {
        id: clientToRemove.id
      }
    })
  } catch (e) {
    throw new Error(`Error deleting client with ID ${id}`)
  }
}
