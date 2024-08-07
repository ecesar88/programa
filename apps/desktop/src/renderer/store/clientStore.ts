import { focusAtom } from 'jotai-optics'
import { getSelectedRowAtom } from './universal'

export const selectedRowAtom = getSelectedRowAtom<Record<string, unknown>>()

export const rowDataFocusedAtom = focusAtom(selectedRowAtom, (optic) => optic.prop('data'))
rowDataFocusedAtom.debugLabel = 'rowDataFocusedAtom'

export const rowMetaDataFocusedAtom = focusAtom(selectedRowAtom, (optic) =>
  optic.prop('meta').prop('index')
)

rowMetaDataFocusedAtom.debugLabel = 'rowMetaDataFocusedAtom'
