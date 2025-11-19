import type { Prisma } from '@prisma/client'
import { Id, Resolver } from '../../../../utils/types/shared'
import { logInfo, OPERATION_TYPE } from '../../../../utils/logger'
import { RecordNotFoundError } from '../_errors/errors'
import type { AddressCreateInput, AddressUpdateInput } from './types'

const namespace = 'Address'

export const create: Resolver<{
  data: (typeof AddressCreateInput)['$inferInput']
}> = async (_parent, args, ctx, _info) => {
  logInfo({ operation: OPERATION_TYPE.CREATE, namespace, args })

  return await ctx.prisma.address.create({
    data: args.data as Prisma.AddressCreateInput
  })
}

export const queryOne: Resolver<Id> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logInfo({ operation: OPERATION_TYPE.READ, namespace, id })

  return await ctx.prisma.address.findMany({
    where: {
      customerId: id
    }
  })
}

export const update: Resolver<{
  input: (typeof AddressUpdateInput)['$inferInput']
}> = async (_parent, args, ctx, _info) => {
  const { id } = args.input

  logInfo({ operation: OPERATION_TYPE.UPDATE, namespace, id })

  const record = await ctx.prisma.address.findFirst({
    where: {
      id
    }
  })

  if (!record) throw new RecordNotFoundError(namespace)

  return await ctx.prisma.address.update({
    where: {
      id
    },
    data: args.input.data as Prisma.AddressUpdateInput
  })
}

export const remove: Resolver<Id> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logInfo({ operation: OPERATION_TYPE.DELETE, namespace, id })

  const record = await ctx.prisma.address.findFirst({
    where: {
      id
    }
  })

  if (!record) throw new RecordNotFoundError(namespace)

  return ctx.prisma.address.delete({
    where: {
      id
    }
  })
}
