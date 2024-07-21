import { Client } from '@renderer/queries/graphql/codegen/graphql'
import { focusAtom } from 'jotai-optics'
import { getSelectedRowAtom } from './universal'

export const selectedRowAtom = getSelectedRowAtom<Client | Record<never, never>>()

export const rowDataFocusedAtom = focusAtom(selectedRowAtom, (optic) => optic.prop('data'))
rowDataFocusedAtom.debugLabel = 'rowDataFocusedAtom'

export const rowMetaDataFocusedAtom = focusAtom(selectedRowAtom, (optic) =>
  optic.prop('meta').prop('index')
)

rowMetaDataFocusedAtom.debugLabel = 'rowMetaDataFocusedAtom'
