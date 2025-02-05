import { OrderEntry } from '@renderer/queries/graphql/codegen/graphql'
import { atom } from 'jotai'

export const orderItemsAtom = atom<OrderEntry[]>([])
orderItemsAtom.debugLabel = 'orderItemsAtom'
