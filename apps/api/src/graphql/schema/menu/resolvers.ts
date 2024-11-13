import {
  Menu,
  MenuEntry,
  MenuEntryCategory,
  MenuEntryLabel,
  MenuEntryVariant,
  Prisma
} from '@prisma/client'
import { colorizeAsJSON, LOG_TYPE, logger } from '../../../utils/logger'
import { RecordNotFoundError } from '../_errors/errors'
import { FindById, Resolver } from '../sharedTypes'
import { MenuEntryCreateOrUpdateInput } from './types'

type UpdateMenuEntryInput = {
  id: number
  data: (typeof MenuEntryCreateOrUpdateInput)['$inferInput']
}

const prismaDefaultMenuEntryIncludes: Readonly<Prisma.MenuEntryInclude> = {
  variants: true,
  labels: true,
  category: true
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
      include: prismaDefaultMenuEntryIncludes
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

export const create: Resolver<{
  data: (typeof MenuEntryCreateOrUpdateInput)['$inferInput']
}> = async (_parent, args, ctx, _info) => {
  const data = args.data

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
        name: data.name as string,
        description: data.description,

        Menu: {
          connect: {
            id: menu.id
          }
        },

        // Only create a variant if it was passed in (exists)
        ...(data?.variants?.length && {
          variants: {
            createMany: {
              data: data.variants?.map((vr) => vr)
            }
          }
        })
      },
      include: prismaDefaultMenuEntryIncludes
    })
  } catch (_error) {
    throw new Error('Error creating the menu entry')
  }
}

export const update: Resolver<UpdateMenuEntryInput> = async (_parent, args, ctx, _info) => {
  const { id, data } = args

  console.log('daata >>>>>>>> ', data)

  logger({
    level: LOG_TYPE.INFO,
    message: `Updating MenuEntry with id '${id}' with data: `,
    object: colorizeAsJSON(args)
  })

  const menuEntry = await ctx.prisma.menuEntry.findFirst({ where: { id } })

  if (!menuEntry) {
    throw new RecordNotFoundError('MenuEntry')
  }

  try {
    logger({
      level: LOG_TYPE.INFO,
      message: `Updating MenuEntry with id '${id}' with data: `,
      object: colorizeAsJSON(args)
    })

    let updatedMenuEntry:
      | (MenuEntry & {
          labels: MenuEntryLabel[]
          variant: MenuEntryVariant[]
          category: MenuEntryCategory[]
        })
      | Record<never, never> = {}

    await ctx.prisma.$transaction(async (tx) => {
      // Delete all categories
      await tx.menuEntryCategory.deleteMany({
        where: {
          menuEntryId: menuEntry.id
        }
      })

      // Delete all labels
      await tx.menuEntryLabel.deleteMany({
        where: {
          menuEntryId: menuEntry.id
        }
      })

      // Delete all variants
      await tx.menuEntryVariant.deleteMany({
        where: {
          menuEntryId: menuEntry.id
        }
      })

      updatedMenuEntry = await tx.menuEntry.update({
        where: {
          id: menuEntry.id
        },
        data: {
          name: data.name,
          description: data.description,
          ...(data?.variants?.length && {
            variants: {
              createMany: {
                data: data.variants.map((vr) => vr)
              }
            }
          }),
          ...(data?.labels?.length && {
            labels: {
              createMany: {
                data: data.labels.map((lb) => lb)
              }
            }
          }),
          ...(data?.categories?.length && {
            category: {
              createMany: {
                data: data.categories.map((lb) => lb)
              }
            }
          })
        },
        include: prismaDefaultMenuEntryIncludes
      })
    })

    return updatedMenuEntry
  } catch (_error) {
    throw new Error(`Error updating MenuEntry with id ${id}`)
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
      },
      include: prismaDefaultMenuEntryIncludes
    })
  } catch (_error) {
    throw new Error('Prisma error')
  }
}
