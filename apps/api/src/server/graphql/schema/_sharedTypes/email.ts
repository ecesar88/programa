import type { Prisma } from '@prisma/client'
import { PothosFields } from 'src/utils/types/shared'
import z from 'zod'
import { builder } from '../../builder'

/* --- Interface Definitions --- */

type TypeEmail = Prisma.EmailGetPayload<Record<never, never>>

/* --- Object Definitions --- */

export const EmailRef = builder.objectRef<TypeEmail>('Email')
export const Email = EmailRef.implement({
  description: 'email',
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    value: t.exposeString('value')
  })
})

/* --- Input Definitions --- */

export const EmailCreateInput = builder.inputType('EmailCreateInput', {
  fields: (t) => ({
    name: t.string(),
    value: t.string()
  })
})

export const EmailUpdateInput = builder.inputType('EmailUpdateInput', {
  fields: (t) => ({
    id: t.string().validate(z.uuid()),
    data: t.field({
      type: EmailCreateInput
    })
  })
})

/* --- Zod Schema Definitions --- */

export const CreateEmailValidationSchema = z.object({
  name: z.string(),
  value: z.email()
})
