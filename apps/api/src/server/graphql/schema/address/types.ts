import type { Prisma } from '@prisma/client'
import z from 'zod'
import { builder } from '../../builder'

/* --- Interface Definitions --- */

type TypeAddress = Prisma.AddressGetPayload<Record<never, never>>

/* --- Object Definitions --- */

export const AddressRef = builder.objectRef<TypeAddress>('Address')

export const Address = AddressRef.implement({
  description: 'Address',
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    street: t.exposeString('street'),
    number: t.exposeString('number'),
    neighborhood: t.exposeString('neighborhood'),
    complement: t.exposeString('complement'),
    zipCode: t.exposeString('zipCode'),
    city: t.exposeString('city'),
    state: t.exposeString('state')
  })
})

/* --- Input Definitions --- */

export const AddressCreateInput = builder.inputType('AddressCreateInput', {
  fields: (t) => ({
    name: t.string(),
    street: t.string(),
    number: t.string(),
    neighborhood: t.string(),
    complement: t.string(),
    zipCode: t.string(),
    city: t.string(),
    state: t.string()
  })
})

export const AddressUpdateInput = builder.inputType('AddressUpdateInput', {
  fields: (t) => ({
    id: t.string().validate(z.uuid()),
    data: t.field({
      type: AddressCreateInput
    })
  })
})
