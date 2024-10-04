import { Client, Prisma } from '@prisma/client'
import { LOG_TYPE, logger } from '../../../utils/logger'
import { prismaPaginate } from '../../../utils/prismaPaginate'
import { RecordNotFoundError } from '../_errors/errors'
import { FindById, FindByQuery, PaginationParam, Resolver } from '../sharedTypes'

type CreateClientQueryInput = { name: string; phone?: string | null }
type UpdateClientQueryInput = { id: number; data: Partial<Prisma.ClientUpdateInput> }

export const queryAll: Resolver<PaginationParam> = async (_parent, args, ctx, _info) => {
  const { page } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Fetching all clients`
  })

  try {
    const clients = await ctx.prisma.client.findMany({
      ...prismaPaginate(page),
      orderBy: {
        id: 'desc'
      }
    })

    return clients
  } catch (_error) {
    throw new Error('Error fetching all clients')
  }
}

export const queryOne: Resolver<FindById> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Fetching client with id '${id}'`
  })

  let client: Client | null

  try {
    client = await ctx.prisma.client.findFirst({
      where: {
        id
      }
    })
  } catch (_error) {
    throw new Error('Prisma error')
  }

  if (!client) {
    throw new RecordNotFoundError(`Client with id ${id}`)
  }

  return client
}

export const search: Resolver<FindByQuery> = async (_parent, args, ctx, _info) => {
  const { search: searchTerm } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Searching for clients with term '${searchTerm}'`
  })

  let clients: Client[] | null

  try {
    clients = await ctx.prisma.client.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm
            }
          }
        ]
      }
    })
  } catch (_error) {
    throw new Error('Prisma error')
  }

  return clients
}

export const create: Resolver<CreateClientQueryInput> = async (_parent, args, ctx, _info) => {
  const { name, phone } = args as Partial<Prisma.ClientCreateInput>

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
  } catch (_e) {
    throw new Error('Error creating the client')
  }
}

export const update: Resolver<UpdateClientQueryInput> = async (_parent, args, ctx, _info) => {
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
    logger({
      level: LOG_TYPE.INFO,
      message: `Updating new client with id '${id}' with data: `,
      object: JSON.stringify(args.data, null, 2)
    })

    return await ctx.prisma.client.update({
      where: {
        id: client.id
      },
      data
    })
  } catch (_e) {
    throw new Error(`Error updating client with id ${id}`)
  }
}

export const remove: Resolver<FindById> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Deleting client with id: ${id}`
  })

  const clientToRemove = await ctx.prisma.client.findFirst({ where: { id } })

  if (!clientToRemove) {
    throw new RecordNotFoundError(`Client with id ${id}`)
  }

  try {
    return await ctx.prisma.client.delete({
      where: {
        id: clientToRemove.id
      }
    })
  } catch (_error) {
    throw new Error('Prisma error')
  }
}
