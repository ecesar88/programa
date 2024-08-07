import { getSelectedRowAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { focusAtom } from 'jotai-optics'

/*
 * This hook is meant to be used to retrieve and modify data from the selectedRow atom from Jotai.
 * This atom is used to transfer data from Read screens to modals, such as the CreateOrEdit overlay in some of the existing screens.
 */
export const useSelectedRow = <T extends object>() => {
  const selectedRowAtom = getSelectedRowAtom<T>()

  // Focus on the selectedRowAtom DATA property
  const rowDataFocusedAtom = focusAtom(selectedRowAtom, (optic) => optic.prop('data'))

  // Focus on the selectedRowAtom META property
  const rowMetaDataFocusedAtom = focusAtom(selectedRowAtom, (optic) => optic.prop('meta'))

  // Get and set from selectedRow DATA property
  const selectedRowDataValue = useAtomValue(rowDataFocusedAtom)
  const setSelectedRowData = useSetAtom(rowDataFocusedAtom)

  // Get and set from selectedRow META property
  const selectedRowMetaValue = useAtomValue(rowMetaDataFocusedAtom)
  const setSelectedRowMeta = useSetAtom(rowMetaDataFocusedAtom)

  // Set on the selectedRowAtom atom value
  const setSelectedRow = useSetAtom(selectedRowAtom)

  const clearSelectedRowAtom = () => setSelectedRow({ data: {} as T, meta: { index: null } })

  selectedRowAtom.debugLabel = 'selectedRowAtom'
  rowDataFocusedAtom.debugLabel = 'rowDataFocusedAtom'
  rowMetaDataFocusedAtom.debugLabel = 'rowMetaDataFocusedAtom'

  return {
    data: {
      get: selectedRowDataValue,
      set: setSelectedRowData
    },
    meta: {
      get: selectedRowMetaValue,
      set: setSelectedRowMeta
    },
    clearAll: clearSelectedRowAtom
  }
}
