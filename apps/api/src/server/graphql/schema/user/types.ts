import type { Prisma } from '@prisma/client'
import z from 'zod'
import { builder } from '../../builder'

/* --- Interface Definitions --- */

type TypeUser = Prisma.UserGetPayload<Record<never, never>>

/* --- Object Definitions --- */

export const UserRef = builder.objectRef<TypeUser>('User')

export const User = UserRef.implement({
  description: 'An User',
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    username: t.exposeString('username'),
    email: t.exposeString('email'),
    phone: t.exposeString('phone'),
    createdAt: t.field({
      type: 'DateTime',
      resolve: (f) => f.createdAt
    }),
    updatedAt: t.field({
      type: 'DateTime',
      resolve: (f) => f.updateAt
    })
  })
})

/* --- Input Definitions --- */

export const UserCreateInput = builder.inputType('UserCreateInput', {
  fields: (t) => ({
    name: t.string(),
    username: t.string(),
    email: t.string(),
    phone: t.string(),
    password: t.string()
  })
})

export const UserUpdateInput = builder.inputType('UserUpdateInput', {
  fields: (t) => ({
    id: t.string().validate(z.uuid()),
    data: t.field({
      type: UserCreateInput
    })
  })
})
