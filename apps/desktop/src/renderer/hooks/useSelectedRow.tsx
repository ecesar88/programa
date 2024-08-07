import { selectedRowAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { focusAtom } from 'jotai-optics'
import { useEffect, useMemo } from 'react'

type useSelectedRowOptions = {
  clearOnUmount: boolean
}

/**
 * This hook is meant to be used to retrieve and modify data from the selectedRow atom from Jotai.
 * This atom is used to transfer data from Read screens to modals, such as the CreateOrEdit overlay in some of the existing screens.
 */
export const useSelectedRow = <T extends object>(options?: useSelectedRowOptions) => {
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

  selectedRowAtom.debugLabel = 'selectedRowAtom'
  rowDataFocusedAtom.debugLabel = 'rowDataFocusedAtom'
  rowMetaDataFocusedAtom.debugLabel = 'rowMetaDataFocusedAtom'

  const atoms = useMemo(() => {
    return {
      selectedRowAtom,
      rowDataFocusedAtom,
      rowMetaDataFocusedAtom,
      selectedRowDataValue,
      setSelectedRowData,
      selectedRowMetaValue,
      setSelectedRowMeta,
      setSelectedRow
    }
  }, [])

  const clearSelectedRowAtom = () => setSelectedRow({ data: {} as T, meta: { index: null } })

  useEffect(() => {
    return () => {
      if (!options?.clearOnUmount) return
      // setSelectedRowData({} as T)
      // setSelectedRowMeta({} as any)
      clearSelectedRowAtom()
    }
  }, [options?.clearOnUmount])

  return {
    data: {
      get: atoms.selectedRowDataValue,
      set: atoms.setSelectedRowData
    },
    meta: {
      get: atoms.selectedRowMetaValue,
      set: atoms.setSelectedRowMeta
    },
    clearAll: clearSelectedRowAtom
  }
}
