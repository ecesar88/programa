import type { Prisma } from '@prisma/client'
import z from 'zod'
import { builder } from '../../builder'

/* --- Interface Definitions --- */

type TypePhone = Prisma.PhoneGetPayload<Record<never, never>>

/* --- Object Definitions --- */
export const PhoneRef = builder.objectRef<TypePhone>('Phone')

export const Phone = PhoneRef.implement({
  description: 'Phone Number',
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    value: t.exposeString('value')
  })
})

/* --- Input Definitions --- */

export const PhoneCreateInput = builder.inputType('PhoneCreateInput', {
  fields: (t) => ({
    name: t.string(),
    value: t.string()
  })
})

export const PhoneUpdateInput = builder.inputType('PhoneUpdateInput', {
  fields: (t) => ({
    id: t.string().validate(z.uuid()),
    data: t.field({
      type: PhoneCreateInput
    })
  })
})

/* --- Zod Schema Definitions --- */

export const CreatePhoneValidationSchema = z.object({
  name: z.string(),
  value: z.string()
})
