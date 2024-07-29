// import { Prisma } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { GraphQLResolveInfo } from 'graphql'
import { LOG_TYPE, logger } from '../../../utils/logger'
import { prismaPaginate } from '../../../utils/prismaPaginate'
import { Context } from '../../context'
import { RecordNotFoundError } from '../errors/errors'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Resolver<T> = (parent: object, args: T, ctx: Context, info: GraphQLResolveInfo) => any

export const queryAll: Resolver<{ page?: number | null }> = async (_parent, args, ctx, _info) => {
  const { page } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Fetching all menu entries`
  })

  try {
    return await ctx.prisma.menuEntry.findMany({
      ...prismaPaginate(page),
      orderBy: {
        id: 'desc'
      }
    })
  } catch (e) {
    throw new Error('Error fetching all menu entries')
  }
}

export const queryOne: Resolver<{ id: number }> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Fetching menu entry with id '${id}'`
  })

  try {
    const menuEntry = await ctx.prisma.menuEntry.findFirst({
      where: {
        id
      }
    })

    if (!menuEntry) {
      throw new RecordNotFoundError(`Menu entry with id ${id}`)
    }

    return menuEntry
  } catch (e) {
    throw new Error(String(e))
  }
}

export const create: Resolver<{
  name: string
  price: number
  description?: string | null
}> = async (_parent, args, ctx, _info) => {
  const data = args as Partial<Prisma.MenuEntryCreateInput>

  logger({
    level: LOG_TYPE.INFO,
    message: 'Creating new menu entry with data:',
    object: JSON.stringify(args, null, 2)
  })

  try {
    // Create menu on seeds
    let menu: { id: number } | null

    menu = await ctx.prisma.menu.findFirst({})

    if (!menu) {
      menu = await ctx.prisma.menu.create({})

      logger({
        level: LOG_TYPE.INFO,
        message: 'Menu does not exist, creating a new menu'
      })
    }

    return await ctx.prisma.menuEntry.create({
      data: {
        ...(data as Prisma.MenuEntryUncheckedCreateInput),
        menuId: menu?.id
      }
    })
  } catch (error) {
    throw new Error('Error creating the menu entry')
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
  } catch (e) {
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
    const clientToRemove = await ctx.prisma.client.findFirst({ where: { id } })

    if (!clientToRemove) {
      throw new RecordNotFoundError('Client')
    }

    return await ctx.prisma.client.delete({
      where: {
        id: clientToRemove.id
      }
    })
  } catch (e) {
    throw new Error(`Error deleting client with ID ${id}`)
  }
}
