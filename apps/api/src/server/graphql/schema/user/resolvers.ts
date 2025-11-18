import type { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import { logInfo, OPERATION_TYPE } from '../../../../utils/logger'
import type { Id, Resolver } from 'src/utils/types/shared'
import { RecordNotFoundError } from '../_errors/errors'
import type { UserCreateInput, UserUpdateInput } from './types'

const table = 'User'

const PASSWORD_SALT_ROUNDS = 10

export const getAll: Resolver = (_parent, _args, ctx, _info) => {
  logInfo({ operation: OPERATION_TYPE.READ, table })

  return ctx.prisma.user.findMany()
}

export const getById: Resolver<Id> = (_parent, args, ctx, _info) => {
  const { id } = args
  logInfo({ operation: OPERATION_TYPE.READ, table, id })

  return ctx.prisma.user.findFirst({
    where: {
      id
    }
  })
}

export const create: Resolver<{
  data: (typeof UserCreateInput)['$inferInput']
}> = (_parent, args, ctx, _info) => {
  logInfo({ operation: OPERATION_TYPE.CREATE, table: table })

  const passwordHash = bcrypt.hashSync(args.data.password as string, PASSWORD_SALT_ROUNDS)

  return ctx.prisma.user.create({
    data: {
      ...args.data,
      password: passwordHash
    } as Prisma.UserCreateInput
  })
}

export const update: Resolver<{
  input: (typeof UserUpdateInput)['$inferInput']
}> = async (_parent, args, ctx, _info) => {
  const { id } = args.input

  logInfo({ operation: OPERATION_TYPE.UPDATE, table, args })

  const record = await ctx.prisma.user.findFirst({
    where: {
      id
    }
  })

  if (!record) {
    throw new RecordNotFoundError(table)
  }

  return ctx.prisma.user.update({
    where: {
      id
    },
    data: args.input.data as Prisma.UserUpdateInput
  })
}

export const remove: Resolver<Id> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logInfo({ operation: OPERATION_TYPE.DELETE, table, args, id })

  const record = await ctx.prisma.user.findFirst({
    where: {
      id
    }
  })

  if (!record) throw new RecordNotFoundError(table)

  return ctx.prisma.user.delete({
    where: {
      id
    }
  })
}
