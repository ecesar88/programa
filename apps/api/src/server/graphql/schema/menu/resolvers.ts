import {
  MenuEntry,
  MenuEntryCategory,
  MenuEntryLabel,
  MenuEntryVariant,
  Prisma
} from '../../../../prisma/generated/client'
import { colorizeAsJSON, LOG_LEVEL, logger } from '../../../../utils/logger'
import { Id, Resolver } from '../../../../utils/types/shared'
import { RecordNotFoundError } from '../_errors/errors'
import type { MenuEntryCreateOrUpdateInput, MenuEntryLabelInput } from './types'

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
    level: LOG_LEVEL.INFO,
    message: `Fetching all MenuEntries`,
    object: colorizeAsJSON(args as any)
  })

  try {
    return await ctx.prisma.menuEntry.findMany({
      orderBy: {
        id: 'desc'
      },
      include: prismaDefaultMenuEntryIncludes
    })
  } catch (error) {
    logger({
      level: LOG_LEVEL.ERROR,
      message: 'Error fetching all MenuEntries',
      object: colorizeAsJSON(JSON.parse(String(error)))
    })

    throw new Error('Error fetching all MenuEntries')
  }
}

export const queryOne: Resolver<Id<number>> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logger({
    level: LOG_LEVEL.INFO,
    message: `Fetching menu with id '${id}'`,
    object: colorizeAsJSON(args)
  })

  const client = await ctx.prisma.menu.findFirst({
    where: {
      id
    }
  })

  if (!client) {
    throw new RecordNotFoundError(`Menu MenuEntry id ${id}`)
  }

  return client
}

export const create: Resolver<{
  data: (typeof MenuEntryCreateOrUpdateInput)['$inferInput']
}> = async (_parent, args, ctx, _info) => {
  const data = args.data

  logger({
    level: LOG_LEVEL.INFO,
    message: 'Creating new MenuEntry with data:',
    object: colorizeAsJSON(args)
  })

  // Create menu on seeds
  let menu = await ctx.prisma.menu.findFirst({})

  if (!menu) {
    menu = await ctx.prisma.menu.create({})

    logger({
      level: LOG_LEVEL.INFO,
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
}

export const update: Resolver<UpdateMenuEntryInput> = async (_parent, args, ctx, _info) => {
  const { id, data } = args

  logger({
    level: LOG_LEVEL.INFO,
    message: `Updating MenuEntry with id '${id}' with data: `,
    object: colorizeAsJSON(args)
  })

  const menuEntry = await ctx.prisma.menuEntry.findFirst({ where: { id } })

  if (!menuEntry) {
    throw new RecordNotFoundError('MenuEntry')
  }

  let updatedMenuEntry:
    | (MenuEntry & {
        labels: MenuEntryLabel[]
        variant: MenuEntryVariant[]
        categories: MenuEntryCategory[]
      })
    | Record<never, never> = {}

  await ctx.prisma.$transaction(async (tx: typeof ctx.prisma) => {
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
              data: data.categories.map((ct) => ct)
            }
          }
        })
      },
      include: prismaDefaultMenuEntryIncludes
    })
  })

  return updatedMenuEntry
}

export const remove: Resolver<Id<number>> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logger({
    level: LOG_LEVEL.INFO,
    message: `Deleting menu entry with id: ${id}`,
    object: colorizeAsJSON(args)
  })

  const menuEntryToRemove = await ctx.prisma.menuEntry.findFirst({
    where: { id }
  })

  if (!menuEntryToRemove) {
    throw new RecordNotFoundError(`Menu entry with id ${id}`)
  }

  return await ctx.prisma.menuEntry.delete({
    where: {
      id: menuEntryToRemove.id
    },
    include: prismaDefaultMenuEntryIncludes
  })
}

//**************************************** MENU ENTRY LABEL ****************************************** */
export const queryAllMenuLabels: Resolver = async (_parent, args, ctx, _info) => {
  logger({
    level: LOG_LEVEL.INFO,
    message: `Fetching all menu entry labels`,
    object: colorizeAsJSON(args as any)
  })

  return await ctx.prisma.menuEntryLabel.findMany({
    orderBy: {
      id: 'desc'
    }
  })
}

export const searchMenuEntryLabels: Resolver<{ searchTerm: string }> = async (
  _parent,
  args,
  ctx,
  _info
) => {
  logger({
    level: LOG_LEVEL.INFO,
    message: `Searching for menu entry labels`,
    object: colorizeAsJSON(args)
  })

  return await ctx.prisma.menuEntryLabel.findMany({
    orderBy: {
      id: 'desc'
    },
    where: {
      name: { contains: args.searchTerm }
    }
  })
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
    menuEntryLabelToUpdate = await ctx.prisma.menuEntryLabel.findFirst({
      where: { id }
    })

    if (!menuEntryLabelToUpdate) {
      throw new RecordNotFoundError(`MenuEntryLabel with id ${id}`)
    }

    logger({
      level: LOG_LEVEL.INFO,
      message: `Updating menu entry label (of id: ${id}) with data:`,
      object: colorizeAsJSON(args.data)
    })

    return await ctx.prisma.menuEntryLabel.update({
      where: {
        id: menuEntryLabelToUpdate.id
      },
      data
    })
  }

  logger({
    level: LOG_LEVEL.INFO,
    message: 'Creating menu entry label with data:',
    object: colorizeAsJSON(args.data)
  })

  return await ctx.prisma.menuEntryLabel.create({
    data
  })
}

export const deleteMenuEntryLabel: Resolver<Id<number>> = async (_parent, args, ctx, _info) => {
  const { id } = args

  const menuEntryLabelToRemove = await ctx.prisma.menuEntryLabel.findFirst({
    where: { id }
  })

  if (!menuEntryLabelToRemove) {
    throw new RecordNotFoundError(`MenuEntryLabel with id ${id}`)
  }

  logger({
    level: LOG_LEVEL.INFO,
    message: `Deleting MenuEntryLabel with id: ${id}`,
    object: colorizeAsJSON(args)
  })

  return await ctx.prisma.menuEntryLabel.delete({
    where: {
      id
    }
  })
}
