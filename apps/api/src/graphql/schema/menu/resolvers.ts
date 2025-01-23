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
import { Id, Resolver } from '../sharedTypes'
import { MenuEntryCreateOrUpdateInput, MenuEntryLabelInput } from './types'

type UpdateMenuEntryInput = {
  id: number
  data: (typeof MenuEntryCreateOrUpdateInput)['$inferInput']
}

const prismaDefaultMenuEntryIncludes: Readonly<Prisma.MenuEntryInclude> = {
  variants: true,
  labels: true,
  categories: true
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

export const queryOne: Resolver<Id> = async (_parent, args, ctx, _info) => {
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
    let updatedMenuEntry:
      | (MenuEntry & {
          labels: MenuEntryLabel[]
          variant: MenuEntryVariant[]
          categories: MenuEntryCategory[]
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

export const remove: Resolver<Id> = async (_parent, args, ctx, _info) => {
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
    throw new Error(`Error deleting menu entry with id: ${id}`)
  }
}

//**************************************** MENU ENTRY LABEL ****************************************** */
export const queryAllMenuLabels: Resolver = async (_parent, args, ctx, _info) => {
  logger({
    level: LOG_TYPE.INFO,
    message: `Fetching all menu entry labels`,
    object: colorizeAsJSON(args)
  })

  try {
    return await ctx.prisma.menuEntryLabel.findMany({
      orderBy: {
        id: 'desc'
      }
    })
  } catch (_error) {
    throw new Error('Error fetching all menu entry labels')
  }
}

export const searchMenuEntryLabels: Resolver<{ searchTerm: string }> = async (
  _parent,
  args,
  ctx,
  _info
) => {
  logger({
    level: LOG_TYPE.INFO,
    message: `Searching for menu entry labels`,
    object: colorizeAsJSON(args)
  })

  try {
    return await ctx.prisma.menuEntryLabel.findMany({
      orderBy: {
        id: 'desc'
      },
      where: {
        name: { contains: args.searchTerm }
      }
    })
  } catch (error) {
    logger({
      level: LOG_TYPE.ERROR,
      message: 'Error searching for menu entry label',
      object: colorizeAsJSON(JSON.parse(String(error)))
    })

    throw new Error('Error searching for menu entry labels')
  }
}

type CreateOrUpdateMenuEntryLabelArgs = {
  id?: number | null
  data: (typeof MenuEntryLabelInput)['$inferInput']
}

export const createOrUpdateMenuEntryLabel: Resolver<CreateOrUpdateMenuEntryLabelArgs> = async (
  _parent,
  args,
  ctx,
  _info
) => {
  const { id, data } = args

  let menuEntryLabelToUpdate: MenuEntryLabel | null
  if (id) {
    menuEntryLabelToUpdate = await ctx.prisma.menuEntryLabel.findFirst({ where: { id } })

    if (!menuEntryLabelToUpdate) {
      throw new RecordNotFoundError(`MenuEntryLabel with id ${id}`)
    }

    try {
      logger({
        level: LOG_TYPE.INFO,
        message: `Updating menu entry label (of id: ${id}) with data:`,
        object: colorizeAsJSON(args.data)
      })

      return await ctx.prisma.menuEntryLabel.update({
        where: {
          id: menuEntryLabelToUpdate.id
        },
        data
      })
    } catch (error) {
      logger({
        level: LOG_TYPE.ERROR,
        message: 'Error updating menu entry label',
        object: colorizeAsJSON(JSON.parse(String(error)))
      })

      throw new Error('Error updating menu entry label')
    }
  }

  try {
    logger({
      level: LOG_TYPE.INFO,
      message: 'Creating menu entry label with data:',
      object: colorizeAsJSON(args.data)
    })

    return await ctx.prisma.menuEntryLabel.create({
      data
    })
  } catch (error) {
    logger({
      level: LOG_TYPE.ERROR,
      message: 'Error creating menu entry label',
      object: colorizeAsJSON(JSON.parse(String(error)))
    })

    throw new Error('Error creating menu entry label')
  }
}

export const deleteMenuEntryLabel: Resolver<Id> = async (_parent, args, ctx, _info) => {
  const { id } = args

  const menuEntryLabelToRemove = await ctx.prisma.menuEntryLabel.findFirst({ where: { id } })

  if (!menuEntryLabelToRemove) {
    throw new RecordNotFoundError(`MenuEntryLabel with id ${id}`)
  }

  try {
    logger({
      level: LOG_TYPE.INFO,
      message: `Deleting menu entry label with id: ${id}`,
      object: colorizeAsJSON(args)
    })

    return await ctx.prisma.menuEntryLabel.delete({
      where: {
        id
      }
    })
  } catch (error) {
    logger({
      level: LOG_TYPE.ERROR,
      message: `Error deleting menu entry label with id: ${id}`,
      object: colorizeAsJSON(JSON.parse(String(error)))
    })

    throw new Error(`Error deleting MenuEntryLabel with id: ${id}`)
  }
}
