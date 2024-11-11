import { Menu, Prisma } from '@prisma/client'
import { colorizeAsJSON, LOG_TYPE, logger } from '../../../utils/logger'
import { RecordNotFoundError } from '../_errors/errors'
import { FindById, Resolver } from '../sharedTypes'
import { MenuEntryCreateOrUpdateInput } from './types'

type UpdateMenuEntryInput = {
  id: number
  data: (typeof MenuEntryCreateOrUpdateInput)['$inferInput']
}

export const queryAll: Resolver = async (_parent, args, ctx, _info) => {
  logger({
    level: LOG_TYPE.INFO,
    message: `Fetching all menu entries`,
    object: colorizeAsJSON(args)
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
    message: `Fetching menu entry with id '${id}'`,
    object: colorizeAsJSON(args)
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

export const create: Resolver<(typeof MenuEntryCreateOrUpdateInput)['$inferInput']> = async (
  _parent,
  args,
  ctx,
  _info
) => {
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
        message: 'Menu does not exist, creating a new menu',

        object: colorizeAsJSON(args)
      })
    }

    return await ctx.prisma.menuEntry.create({
      data: {
        menuId: menu?.id,
        name: data.name as string,
        description: data.description,
        // Only create a variant if it was passed in (exists)
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

/** @todo - Implement */
export const update: Resolver<UpdateMenuEntryInput> = async (_parent, args, ctx, _info) => {
  const { id, data } = args

  logger({
    level: LOG_TYPE.INFO,
    message: `Updating new client with id '${id}' with data: `,
    object: colorizeAsJSON(args)
  })

  const client = await ctx.prisma.menuEntry.findFirst({ where: { id } })

  if (!client) {
    throw new RecordNotFoundError('Client')
  }

  try {
    logger({
      level: LOG_TYPE.INFO,
      message: `Updating new client with id '${id}' with data: `,
      object: colorizeAsJSON(args)
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
    message: `Deleting menu entry with id: ${id}`,
    object: colorizeAsJSON(args)
  })

  const menuEntryToRemove = await ctx.prisma.menuEntry.findFirst({ where: { id } })

  if (!menuEntryToRemove) {
    throw new RecordNotFoundError(`Menu entry with id ${id}`)
  }

  try {
    return await ctx.prisma.menuEntry.delete({
      where: {
        id: menuEntryToRemove.id
      }
    })
  } catch (_error) {
    throw new Error('Prisma error')
  }
}
