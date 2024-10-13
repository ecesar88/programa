import { Menu, Prisma } from '@prisma/client'
import { colorizeAsJSON, LOG_TYPE, logger } from '../../../utils/logger'
import { RecordNotFoundError } from '../_errors/errors'
import { FindById, Resolver } from '../sharedTypes'
import { MenuEntryVariantType } from './types'

type CreateMenuQueryInput = {
  name: string
  description?: string | null
  variant?: (typeof MenuEntryVariantType)['$inferType'][] | null
}

type UpdateMenuQueryInput = {
  id: number
  data: Partial<Prisma.ClientUpdateInput>
}

export const queryAll: Resolver = async (_parent, _args, ctx, _info) => {
  logger({
    level: LOG_TYPE.INFO,
    message: `Fetching all menu entries`
  })

  try {
    return await ctx.prisma.menuEntry.findMany({
      orderBy: {
        id: 'desc'
      },
      include: {
        variant: true,
        labels: true
      }
    })
  } catch (_error) {
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
  } catch (_error) {
    throw new Error('Prisma error')
  }

  if (!client) {
    throw new RecordNotFoundError(`Menu entry with id ${id}`)
  }

  return client
}

export const create: Resolver<CreateMenuQueryInput> = async (_parent, args, ctx, _info) => {
  const data = args

  logger({
    level: LOG_TYPE.INFO,
    message: 'Creating new menu entry with data:',
    object: colorizeAsJSON(args)
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
        menuId: menu?.id,
        name: data.name as string,
        description: data.description,
        // Only create a variant if it exists
        ...(data?.variant?.length && {
          variant: {
            createMany: {
              data: data.variant?.map((vr) => vr) as Prisma.MenuEntryVariantCreateManyMenuEntryInput
            }
          }
        })
      },
      include: {
        variant: true
      }
    })
  } catch (_error) {
    console.log(_error)
    throw new Error('Error creating the menu entry')
  }
}

export const update: Resolver<UpdateMenuQueryInput> = async (_parent, args, ctx, _info) => {
  const { id, data } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Updating new client with id '${id}' with data: `,
    object: colorizeAsJSON(args.data)
  })

  const client = await ctx.prisma.client.findFirst({ where: { id } })

  if (!client) {
    throw new RecordNotFoundError('Client')
  }

  try {
    logger({
      level: LOG_TYPE.INFO,
      message: `Updating new client with id '${id}' with data: `,
      object: colorizeAsJSON(args.data)
    })

    return await ctx.prisma.client.update({
      where: {
        id: client.id
      },
      data
    })
  } catch (_error) {
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
