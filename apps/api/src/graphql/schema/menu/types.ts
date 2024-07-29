import { builder } from '../../builder'

export const MenuEntryType = builder.simpleObject('MenuEntry', {
  description: 'A entry in the menu.',
  fields: (t) => ({
    id: t.int(),
    name: t.string(),
    price: t.float(),
    description: t.string()
  })
})

// export const UserUpdateInput = builder.inputType('UserUpdateInput', {
//   fields: (t) => ({
//     name: t.string({ required: true }),
//     phone: t.string()
//   })
// })
