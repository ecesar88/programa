/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, createStore } from 'jotai'

export const globalStore = createStore()

/*
 *  Selected Row atom:
 *  The row data that is selected when the user clicks on the row on a table
 */
export interface RowMetadata<T = Record<never, never>> {
  meta?: { index: number | null }
  data: T
}

export const rowMetadata = atom<RowMetadata<object>['meta']>({ index: null })
export const rowData = atom<RowMetadata<any | object>['data']>({})

export const getSelectedRowAtom = <T>() => {
  const selectedRowAtom = atom<RowMetadata<T>, [RowMetadata<T>], void>(
    (get) => ({
      meta: get(rowMetadata),
      data: get(rowData)
    }),
    (_get, set, newRowData) => {
      set(rowData, newRowData.data)
      set(rowMetadata, newRowData.meta)
    }
  )

  selectedRowAtom.debugLabel = 'selectedRowAtom'

  return selectedRowAtom
}

rowMetadata.debugLabel = 'rowMetadataAtom'
rowData.debugLabel = 'rowDataAtom'

/*
 *  isLoading atom:
 *  Primarily used to disable the ScreenMenu component buttons' when the screen is on a loading state.
 */
export const isLoadingAtom = atom(false)
isLoadingAtom.debugLabel = 'isLoadingAtom'
