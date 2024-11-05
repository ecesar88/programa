import { builder } from '../../builder'

export const MenuEntryVariantInputType = builder.inputType('MenuEntryVariantInput', {
  fields: (t) => ({
    price: t.float(),
    name: t.string(),
    description: t.string()
  })
})

export const MenuEntryVariantType = builder.simpleObject('MenuEntryVariant', {
  fields: (t) => ({
    id: t.int(),
    price: t.float(),
    name: t.string(),
    description: t.string()
  })
})

export const MenuEntryLabelType = builder.simpleObject('MenuEntryLabel', {
  fields: (t) => ({
    name: t.string(),
    color: t.string()
  })
})

export const MenuEntryType = builder.simpleObject('MenuEntry', {
  description: 'An entry in the menu.',
  fields: (t) => ({
    id: t.int(),
    name: t.string(),
    description: t.string(),
    variant: t.field({ type: [MenuEntryVariantType] }),
    labels: t.field({ type: [MenuEntryLabelType] })
  })
})
