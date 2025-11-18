// import { OrderEntry } from '@renderer/queries/graphql/codegen/graphql'
// import { atom } from 'jotai'

// export const orderItemsAtom = atom<OrderEntry[]>([])
// orderItemsAtom.debugLabel = 'orderItemsAtom'

import { MenuEntryLabel, MenuEntryVariant } from '@renderer/queries/graphql/codegen/graphql'
import { atom } from 'jotai'

export interface OrderEntryStoreItem {
  id: number // The MenuEntry's id
  quantity: number
  menuEntry: {
    name: string
    description: string
    labels: MenuEntryLabel[]
    variant: MenuEntryVariant
  }
}

export const orderItemsAtom = atom<OrderEntryStoreItem[]>([])
orderItemsAtom.debugLabel = 'orderItemsAtom'
