import type { Prisma } from '@prisma/client'
import { logInfo, OPERATION_TYPE } from '../../../../utils/logger'
import type { Id, Resolver } from 'src/utils/types/shared'
import { RecordNotFoundError } from '../_errors/errors'
import type { ContactCreateInput, ContactUpdateInput } from './types'

const namespace = 'Contact'

const defaultIncludes: Prisma.ContactInclude = {
  address: true,
  email: true,
  phone: true
}

export const create: Resolver<{
  data: (typeof ContactCreateInput)['$inferInput']
}> = async (_parent, args, ctx, _info) => {
  const { address, email, phone } = args.data

  logInfo({ operation: OPERATION_TYPE.CREATE, namespace, args })

  const insertDataClause: Prisma.ContactCreateArgs['data'] = {}

  if (address?.length) {
    insertDataClause.address = {
      createMany: {
        data: address.map((addr) => addr) as Prisma.AddressCreateManyContactInput[]
      }
    }
  }

  if (email?.length) {
    insertDataClause.email = {
      createMany: {
        data: email.map((addr) => addr) as Prisma.EmailCreateManyContactInput[]
      }
    }
  }

  if (phone?.length) {
    insertDataClause.phone = {
      createMany: {
        data: phone.map((addr) => addr) as Prisma.PhoneCreateManyContactInput[]
      }
    }
  }

  return await ctx.prisma.contact.create({
    data: insertDataClause,
    include: defaultIncludes
  })
}

export const queryOne: Resolver<Id> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logInfo({ operation: OPERATION_TYPE.READ, namespace, id })

  const record = await ctx.prisma.contact.findFirst({
    where: {
      id
    }
  })

  if (!record) {
    throw new RecordNotFoundError(namespace)
  }

  return await ctx.prisma.contact.findFirst({
    where: {
      id
    },
    include: {
      address: true,
      email: true,
      phone: true
    }
  })
}

export const update: Resolver<{
  input: (typeof ContactUpdateInput)['$inferInput']
}> = async (_parent, args, ctx, _info) => {
  const { address, phone, email } = args.input.data ?? {}
  const { id } = args.input

  logInfo({ operation: OPERATION_TYPE.UPDATE, namespace, args })

  const record = await ctx.prisma.contact.findFirst({
    where: {
      id
    }
  })

  if (!record) {
    throw new RecordNotFoundError(namespace)
  }

  const updateDataClause: Prisma.ContactUpdateArgs['data'] = {}

  if (address?.length) {
    updateDataClause.address = {
      updateMany: {
        where: { contactId: id },
        data: address.map((addr) => addr) as Prisma.AddressUpdateManyArgs[]
      }
    }
  }

  if (email?.length) {
    updateDataClause.email = {
      updateMany: {
        where: { contactId: id },
        data: email.map((addr) => addr) as Prisma.EmailUpdateManyArgs[]
      }
    }
  }

  if (phone?.length) {
    updateDataClause.phone = {
      updateMany: {
        where: { contactId: id },
        data: phone.map((addr) => addr) as Prisma.PhoneUpdateArgs[]
      }
    }
  }

  return await ctx.prisma.contact.update({
    where: {
      id
    },
    data: updateDataClause,
    include: defaultIncludes
  })
}

export const remove: Resolver<Id> = async (_parent, args, ctx, _info) => {
  const { id } = args

  logInfo({ operation: OPERATION_TYPE.DELETE, namespace, args, id })

  const record = await ctx.prisma.contact.findFirst({
    where: {
      id
    }
  })

  if (!record) {
    throw new RecordNotFoundError(namespace)
  }

  return await ctx.prisma.contact.delete({
    where: {
      id
    }
  })
}
