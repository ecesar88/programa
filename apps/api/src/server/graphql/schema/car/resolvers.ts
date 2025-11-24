import type { Prisma } from '../../../../prisma/generated/client'
import { unwrapOrThrow } from '../../../../utils/functions'
import type { Resolver } from '../../../../utils/types/shared'
import { logInfo, OPERATION_TYPE } from '../../../../utils/logger'
import { carBusinessService } from './service'
import type { CarCreateInput } from './types'

const namespace = 'Car'

export const queryAll: Resolver = (_parent, _args, ctx, _info) => {
  logInfo({ operation: OPERATION_TYPE.READ, namespace })

  return ctx.prisma.car.findMany({
    orderBy: {
      id: 'desc'
    }
  })
}

export const create: Resolver<{
  data: (typeof CarCreateInput)['$inferInput']
}> = async (_parent, args, ctx, _info) => {
  const { data } = args

  unwrapOrThrow(await carBusinessService.validate(args.data))

  logInfo({ operation: OPERATION_TYPE.CREATE, namespace, args })

  return await ctx.prisma.car.create({
    data: data as Prisma.CarCreateInput
  })
}
