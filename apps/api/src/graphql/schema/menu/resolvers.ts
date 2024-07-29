import { Menu, Prisma } from '@prisma/client'
import { LOG_TYPE, logger } from '../../../utils/logger'
import { prismaPaginate } from '../../../utils/prismaPaginate'
import { RecordNotFoundError } from '../_errors/errors'
import { FindById, PaginationParam, Resolver } from '../sharedTypes'

type CreateMenuQueryInput = {
  name: string
  price: number
  description?: string | null
}

type UpdateMenuQueryInput = {
  id: number
  data: Partial<Prisma.ClientUpdateInput>
}

export const queryAll: Resolver<PaginationParam> = async (_parent, args, ctx, _info) => {
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

export const queryOne: Resolver<FindById> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Fetching menu entry with id '${id}'`
  })

  let client: Menu | null

  try {
    client = await ctx.prisma.menu.findFirst({
      where: {
        id
      }
    })
  } catch (error) {
    throw new Error('Prisma error')
  }

  if (!client) {
    throw new RecordNotFoundError(`Menu entry with id ${id}`)
  }

  return client
}

export const create: Resolver<CreateMenuQueryInput> = async (_parent, args, ctx, _info) => {
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

export const update: Resolver<UpdateMenuQueryInput> = async (_parent, args, ctx, _info) => {
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
  } catch (error) {
    throw new Error('Prisma error')
  }
}
