import { focusAtom } from 'jotai-optics'
import { getSelectedRowAtom } from './global'

// TODO - research better usage of jotai-optics
export const selectedRowAtom = getSelectedRowAtom<object>()

export const rowDataFocusedAtom = focusAtom(selectedRowAtom, (optic) => optic.prop('data'))
rowDataFocusedAtom.debugLabel = 'rowDataFocusedAtom'

export const rowMetaDataFocusedAtom = focusAtom(selectedRowAtom, (optic) =>
  optic.prop('meta').optional().prop('index')
)

rowMetaDataFocusedAtom.debugLabel = 'rowMetaDataFocusedAtom'
