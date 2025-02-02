import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { atom } from 'jotai'

export const orderItemsAtom = atom<MenuEntry[]>([
  {
    id: 1,
    name: 'teste',
    description: 'uui'
  },
  {
    id: 2,
    name: 'teste',
    description: 'uui'
  },
  {
    id: 3,
    name: 'teste',
    description: 'uui'
  },
  {
    id: 4,
    name: 'teste',
    description: 'uui'
  },
  {
    id: 5,
    name: 'teste',
    description: 'uui'
  },
  {
    id: 6,
    name: 'teste',
    description: 'uui'
  }
])
