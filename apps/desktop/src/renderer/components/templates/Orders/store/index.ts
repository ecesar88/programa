import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { atom } from 'jotai'

export const orderItemsAtom = atom<MenuEntry[]>([
  {
    id: 1,
    name: 'teste',
    description: 'uui'
  }
])
