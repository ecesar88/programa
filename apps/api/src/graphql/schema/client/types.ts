import { builder } from '../../builder'

/* --- Interface Definitions --- */

export interface TypeClient {
  id: number
  name: string
  phone: string
}

/* --- Object Definitions --- */

const ClientRef = builder.objectRef<TypeClient>('Client')

export const Client = ClientRef.implement({
  description: 'Long necks, cool patterns, taller than you.',
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    phone: t.exposeString('phone', { nullable: true })
  })
})

/* --- Inputs Definitions --- */

export const ClientCreateOrUpdateInput = builder.inputType('ClientCreateOrUpdateInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    phone: t.string()
  })
})
