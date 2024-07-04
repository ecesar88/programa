import { builder } from '../../builder'

export const ClientType = builder.simpleObject('Client', {
  description: 'Long necks, cool patterns, taller than you.',
  fields: (t) => ({
    id: t.int(),
    name: t.string(),
    phone: t.string({ nullable: true })
  })
})

export const UserUpdateInput = builder.inputType('UserUpdateInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    phone: t.string()
  })
})
