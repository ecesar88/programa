import type { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import { logInfo, OPERATION_TYPE } from '../../../../utils/logger'
import type { Id, Resolver } from 'src/utils/types/shared'
import { RecordNotFoundError } from '../_errors/errors'
import type { UserCreateInput, UserUpdateInput } from './types'

const namespace = 'User'

const PASSWORD_SALT_ROUNDS = 10

export const getAll: Resolver = (_parent, _args, ctx, _info) => {
  logInfo({ operation: OPERATION_TYPE.READ, namespace })

  return ctx.prisma.user.findMany()
}

export const getById: Resolver<Id> = (_parent, args, ctx, _info) => {
  const { id } = args
  logInfo({ operation: OPERATION_TYPE.READ, namespace, id })

  return ctx.prisma.user.findFirst({
    where: {
      id
    }
  })
}

export const create: Resolver<{
  data: (typeof UserCreateInput)['$inferInput']
}> = (_parent, args, ctx, _info) => {
  logInfo({ operation: OPERATION_TYPE.CREATE, namespace })

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

  logInfo({ operation: OPERATION_TYPE.UPDATE, namespace, args })

  const record = await ctx.prisma.user.findFirst({
    where: {
      id
    }
  })

  if (!record) {
    throw new RecordNotFoundError(namespace)
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

  logInfo({ operation: OPERATION_TYPE.DELETE, namespace, args, id })

  const record = await ctx.prisma.user.findFirst({
    where: {
      id
    }
  })

  if (!record) throw new RecordNotFoundError(namespace)

  return ctx.prisma.user.delete({
    where: {
      id
    }
  })
}
