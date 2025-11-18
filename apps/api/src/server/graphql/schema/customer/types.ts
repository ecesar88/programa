import type { Prisma } from '@prisma/client'
import z from 'zod'
import { builder } from '../../builder'

/* --- Interface Definitions --- */

type TypeCustomer = Prisma.CustomerGetPayload<Record<never, never>>

/* --- Object Definitions --- */

/* 
  model Customer {
  id String @id @default(uuid())

  customerType       Document @default(CPF)
  document           String?
  inscricaoEstadual  String?
  inscricaoMunicipal String?

  name    String
  // address Address[]
}
*/

export const CustomerRef = builder.objectRef<TypeCustomer>('Customer')

// TODO: Fix this
export const Customer = CustomerRef.implement({
  description: 'An Customer',
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    document: t.exposeString('document'),
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

// 🔹 Input para criação (id não é necessário)
export const UserCreateInput = builder.inputType('UserCreateInput', {
  fields: (t) => ({
    name: t.string(),
    email: t.string(),
    phone: t.string()
  })
})

// 🔹 Input para atualização (id + objeto de dados)
export const UserUpdateInput = builder.inputType('UserUpdateInput', {
  fields: (t) => ({
    id: t.string().validate(z.uuid()),
    data: t.field({
      type: UserCreateInput
    })
  })
})
