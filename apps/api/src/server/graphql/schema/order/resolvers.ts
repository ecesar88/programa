import { Menu, Prisma } from '@prisma/client'
import { colorizeAsJSON, LOG_LEVEL, logger } from '../../../../utils/logger'
import { RecordNotFoundError } from '../_errors/errors'
import { OrderCreateOrUpdateInput } from './types'
import { Id, Resolver } from '../../../../utils/types/shared'

// type UpdateMenuEntryInput = {
//   id: number
//   data: (typeof OrderCreateOrUpdateInput)['$inferInput']
// }

const prismaDefaultOrderIncludes: Readonly<Prisma.OrderInclude> = {
  bill: true,
  items: true,
  observations: true
}

export const queryAll: Resolver = async (_parent, args, ctx, _info) => {
  logger({
    level: LOG_LEVEL.INFO,
    message: `Fetching all orders`,
    object: colorizeAsJSON(args as any)
  })

  return await ctx.prisma.order.findMany({
    orderBy: {
      id: 'desc'
    },
    include: prismaDefaultOrderIncludes
  })
}

export const queryOne: Resolver<Id<number>> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logger({
    level: LOG_LEVEL.INFO,
    message: `Fetching order with id '${id}'`,
    object: colorizeAsJSON(args)
  })

  const order = await ctx.prisma.order.findFirst({
    where: {
      id
    }
  })

  if (!order) {
    throw new RecordNotFoundError(`Order with id ${id}`)
  }

  return order
}

export const create: Resolver<{
  data: (typeof OrderCreateOrUpdateInput)['$inferInput']
}> = async (_parent, args, ctx, _info) => {
  const data = args.data

  logger({
    level: LOG_LEVEL.INFO,
    message: 'Creating new order with data:',
    object: colorizeAsJSON(args)
  })

  return await ctx.prisma.order.create({
    data: {
      address: data.address,
      totalPrice: data.totalPrice as number
    },
    include: prismaDefaultOrderIncludes
  })
}

// export const update: Resolver<UpdateMenuEntryInput> = async (_parent, args, ctx, _info) => {
//   const { id, data } = args

//   logger({
//     level: LOG_TYPE.INFO,
//     message: `Updating MenuEntry with id '${id}' with data: `,
//     object: colorizeAsJSON(args)
//   })

//   const menuEntry = await ctx.prisma.menuEntry.findFirst({ where: { id } })

//   if (!menuEntry) {
//     throw new RecordNotFoundError('MenuEntry')
//   }

//   try {
//     let updatedMenuEntry:
//       | (MenuEntry & {
//           labels: MenuEntryLabel[]
//           variant: MenuEntryVariant[]
//           categories: MenuEntryCategory[]
//         })
//       | Record<never, never> = {}

//     await ctx.prisma.$transaction(async (tx) => {
//       // Delete all categories
//       await tx.menuEntryCategory.deleteMany({
//         where: {
//           menuEntryId: menuEntry.id
//         }
//       })

//       // Delete all labels
//       await tx.menuEntryLabel.deleteMany({
//         where: {
//           menuEntryId: menuEntry.id
//         }
//       })

//       // Delete all variants
//       await tx.menuEntryVariant.deleteMany({
//         where: {
//           menuEntryId: menuEntry.id
//         }
//       })

//       updatedMenuEntry = await tx.menuEntry.update({
//         where: {
//           id: menuEntry.id
//         },
//         data: {
//           name: data.name,
//           description: data.description,
//           ...(data?.variants?.length && {
//             variants: {
//               createMany: {
//                 data: data.variants.map((vr) => vr)
//               }
//             }
//           }),
//           ...(data?.labels?.length && {
//             labels: {
//               createMany: {
//                 data: data.labels.map((lb) => lb)
//               }
//             }
//           }),
//           ...(data?.categories?.length && {
//             category: {
//               createMany: {
//                 data: data.categories.map((lb) => lb)
//               }
//             }
//           })
//         },
//         include: prismaDefaultMenuEntryIncludes
//       })
//     })

//     return updatedMenuEntry
//   } catch (_error) {
//     throw new Error(`Error updating MenuEntry with id ${id}`)
//   }
// }

// export const remove: Resolver<Id> = async (_parent, args, ctx, _info) => {
//   const { id } = args

//   logger({
//     level: LOG_TYPE.INFO,
//     message: `Deleting menu entry with id: ${id}`,
//     object: colorizeAsJSON(args)
//   })

//   const menuEntryToRemove = await ctx.prisma.menuEntry.findFirst({ where: { id } })

//   if (!menuEntryToRemove) {
//     throw new RecordNotFoundError(`Menu entry with id ${id}`)
//   }

//   try {
//     return await ctx.prisma.menuEntry.delete({
//       where: {
//         id: menuEntryToRemove.id
//       },
//       include: prismaDefaultMenuEntryIncludes
//     })
//   } catch (_error) {
//     throw new Error(`Error deleting menu entry with id: ${id}`)
//   }
// }

// //**************************************** MENU ENTRY LABEL ****************************************** */
// export const queryAllMenuLabels: Resolver = async (_parent, args, ctx, _info) => {
//   logger({
//     level: LOG_TYPE.INFO,
//     message: `Fetching all menu entry labels`,
//     object: colorizeAsJSON(args)
//   })

//   try {
//     return await ctx.prisma.menuEntryLabel.findMany({
//       orderBy: {
//         id: 'desc'
//       }
//     })
//   } catch (_error) {
//     throw new Error('Error fetching all menu entry labels')
//   }
// }

// export const searchMenuEntryLabels: Resolver<{ searchTerm: string }> = async (
//   _parent,
//   args,
//   ctx,
//   _info
// ) => {
//   logger({
//     level: LOG_TYPE.INFO,
//     message: `Searching for menu entry labels`,
//     object: colorizeAsJSON(args)
//   })

//   try {
//     return await ctx.prisma.menuEntryLabel.findMany({
//       orderBy: {
//         id: 'desc'
//       },
//       where: {
//         name: { contains: args.searchTerm }
//       }
//     })
//   } catch (error) {
//     logger({
//       level: LOG_TYPE.ERROR,
//       message: 'Error searching for menu entry label',
//       object: colorizeAsJSON(JSON.parse(String(error)))
//     })

//     throw new Error('Error searching for menu entry labels')
//   }
// }

// type CreateOrUpdateMenuEntryLabelArgs = {
//   id?: number | null
//   data: (typeof MenuEntryLabelInput)['$inferInput']
// }

// export const createOrUpdateMenuEntryLabel: Resolver<CreateOrUpdateMenuEntryLabelArgs> = async (
//   _parent,
//   args,
//   ctx,
//   _info
// ) => {
//   const { id, data } = args

//   let menuEntryLabelToUpdate: MenuEntryLabel | null
//   if (id) {
//     menuEntryLabelToUpdate = await ctx.prisma.menuEntryLabel.findFirst({ where: { id } })

//     if (!menuEntryLabelToUpdate) {
//       throw new RecordNotFoundError(`MenuEntryLabel with id ${id}`)
//     }

//     try {
//       logger({
//         level: LOG_TYPE.INFO,
//         message: `Updating menu entry label (of id: ${id}) with data:`,
//         object: colorizeAsJSON(args.data)
//       })

//       return await ctx.prisma.menuEntryLabel.update({
//         where: {
//           id: menuEntryLabelToUpdate.id
//         },
//         data
//       })
//     } catch (error) {
//       logger({
//         level: LOG_TYPE.ERROR,
//         message: 'Error updating menu entry label',
//         object: colorizeAsJSON(JSON.parse(String(error)))
//       })

//       throw new Error('Error updating menu entry label')
//     }
//   }

//   try {
//     logger({
//       level: LOG_TYPE.INFO,
//       message: 'Creating menu entry label with data:',
//       object: colorizeAsJSON(args.data)
//     })

//     return await ctx.prisma.menuEntryLabel.create({
//       data
//     })
//   } catch (error) {
//     logger({
//       level: LOG_TYPE.ERROR,
//       message: 'Error creating menu entry label',
//       object: colorizeAsJSON(JSON.parse(String(error)))
//     })

//     throw new Error('Error creating menu entry label')
//   }
// }

// export const deleteMenuEntryLabel: Resolver<Id> = async (_parent, args, ctx, _info) => {
//   const { id } = args

//   const menuEntryLabelToRemove = await ctx.prisma.menuEntryLabel.findFirst({ where: { id } })

//   if (!menuEntryLabelToRemove) {
//     throw new RecordNotFoundError(`MenuEntryLabel with id ${id}`)
//   }

//   try {
//     logger({
//       level: LOG_TYPE.INFO,
//       message: `Deleting menu entry label with id: ${id}`,
//       object: colorizeAsJSON(args)
//     })

//     return await ctx.prisma.menuEntryLabel.delete({
//       where: {
//         id
//       }
//     })
//   } catch (error) {
//     logger({
//       level: LOG_TYPE.ERROR,
//       message: `Error deleting menu entry label with id: ${id}`,
//       object: colorizeAsJSON(JSON.parse(String(error)))
//     })

//     throw new Error(`Error deleting MenuEntryLabel with id: ${id}`)
//   }
// }
