import { builder } from '../../builder'

/* --- Interface Definitions --- */

export interface TypeMenuEntryVariant {
  id: number
  name: string
  description: string
  price: number
}

export interface TypeMenuEntryLabel {
  id: number
  name: string
  color: string
}

export interface TypeMenuEntry {
  id: number
  name: string
  description?: string
  variant: TypeMenuEntryVariant[]
  labels: TypeMenuEntryLabel[]
}

export type TypeMenuEntryInput = Omit<TypeMenuEntry, 'id'>

/* --- Object Definitions --- */

const MenuEntryLabelRef = builder.objectRef<TypeMenuEntryLabel>('MenuEntryLabel')
export const MenuEntryLabelObject = MenuEntryLabelRef.implement({
  description:
    'A label on the MenuEntryObject type. This can be used to categorize MenuEntries with different labels.',
  fields: (t) => ({
    name: t.exposeString('name'),
    color: t.exposeString('color')
  })
})

const MenuEntryVariantRef = builder.objectRef<TypeMenuEntryVariant>('MenuEntryVariant')
export const MenuEntryVariantObject = MenuEntryVariantRef.implement({
  description: 'A variant on the MenuEntry, this can be a different sized or flavored product',
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    price: t.exposeFloat('price')
  })
})

const MenuEntryRef = builder.objectRef<TypeMenuEntry>('MenuEntry')
export const MenuEntryObject = MenuEntryRef.implement({
  description: 'A entry on the menu',
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    variant: t.field({
      type: [MenuEntryVariantObject],
      resolve: (t) => t.variant
    }),
    labels: t.field({ type: [MenuEntryLabelObject], resolve: (t) => t.labels })
  })
})

/* --- Inputs Definitions --- */

export const MenuEntryLabelInput = builder.inputType('MenuEntryLabelInput', {
  fields: (t) => ({
    name: t.string(),
    color: t.string()
  })
})

export const MenuEntryVariantInput = builder.inputType('MenuEntryVariantInput', {
  fields: (t) => ({
    price: t.float(),
    name: t.string(),
    description: t.string()
  })
})

export const MenuEntryInput = builder.inputType('MenuEntryInput', {
  description: 'Input to create a new MenuEntry',
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string({ required: false }),
    variant: t.field({
      type: [MenuEntryVariantInput]
    }),
    labels: t.field({
      type: [MenuEntryLabelInput]
    })
  })
})
