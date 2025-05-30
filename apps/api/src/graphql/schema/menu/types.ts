import { Prisma } from '@prisma/client'
import { builder } from '../../builder'
// import { MenuEntryVariantInputSchema } from './schemas'

/* --- Interface Definitions --- */

type TypeMenuEntry = Prisma.MenuEntryGetPayload<{
  include: {
    categories: true
    variants: true
    labels: true
  }
}>

type TypeMenuEntryCategory = TypeMenuEntry['categories'][number]
type TypeMenuEntryVariant = TypeMenuEntry['variants'][number]
type TypeMenuEntryLabel = TypeMenuEntry['labels'][number]

export type TypeMenuEntryInput = Omit<TypeMenuEntry, 'id'>

/* --- Object Definitions --- */

const MenuEntryLabelRef = builder.objectRef<TypeMenuEntryLabel>('MenuEntryLabel')
export const MenuEntryLabelObject = MenuEntryLabelRef.implement({
  description:
    'A label on the MenuEntryObject type. This can be used to categorize MenuEntries with different labels.',
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    color: t.exposeString('color')
  })
})

export const MenuEntryCategoryRef = builder.objectRef<TypeMenuEntryCategory>('MenuEntryCategory')
export const MenuEntryCategoryObject = MenuEntryCategoryRef.implement({
  description:
    'The category of a specific MenuEntry. This can be used to sort products by type, such as drinks, meats, grains, etc',
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name')
  })
})

export const MenuEntryVariantRef = builder.objectRef<TypeMenuEntryVariant>('MenuEntryVariant')
export const MenuEntryVariantObject = MenuEntryVariantRef.implement({
  description: 'A variant on the MenuEntry, this can be a different sized or flavored product',
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    price: t.exposeFloat('price')
  })
})

export const MenuEntryRef = builder.objectRef<TypeMenuEntry>('MenuEntry')
export const MenuEntryObject = MenuEntryRef.implement({
  description: 'An entry on the menu',
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    variants: t.field({
      type: [MenuEntryVariantObject],
      resolve: (t) => t.variants
    }),
    labels: t.field({ type: [MenuEntryLabelObject], resolve: (t) => t.labels })
  })
})

/* --- Input Definitions --- */

export const MenuEntryVariantInput = builder.inputType('MenuEntryVariantInput', {
  fields: (t) => ({
    name: t.string(),
    description: t.string(),
    price: t.float()
  })
})

export const MenuEntryLabelInput = builder.inputType('MenuEntryLabelInput', {
  fields: (t) => ({
    // id: t.id(), // TODO - fix bug
    name: t.string(),
    color: t.string()
  })
})

export const MenuEntryCategoryInput = builder.inputType('MenuEntryCategoryInput', {
  fields: (t) => ({
    name: t.string()
  })
})

export const MenuEntryCreateOrUpdateInput = builder.inputType('MenuEntryInput', {
  description: 'Input to create a new MenuEntry',
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string({ required: false }),
    variants: t.field({
      required: false,
      type: [MenuEntryVariantInput]
    }),
    labels: t.field({
      required: false,
      type: [MenuEntryLabelInput]
    }),
    categories: t.field({
      required: false,
      type: [MenuEntryCategoryInput]
    })
  })
})
