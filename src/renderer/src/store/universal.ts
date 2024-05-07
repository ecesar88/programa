import { atom } from 'jotai'

export interface RowMetadata<T = Record<never, never>> {
  meta: { index: number | null }
  data: T
}

export const rowMetadata = atom<RowMetadata<{}>['meta']>({ index: null })
export const rowData = atom<RowMetadata<any | {}>['data']>({})

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
