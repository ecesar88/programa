import { atom } from 'jotai'
import React, { createContext, useContext, useState } from 'react'

export interface RowMetadata<T = Record<never, never>> {
  meta: { index: number | null }
  data: T
}

export interface SelectedRowContextType<T> {
  selectedRow: RowMetadata<T>
  setSelectedRow: React.Dispatch<React.SetStateAction<RowMetadata<T>>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectedRowContext = createContext<SelectedRowContextType<any>>(null!)

const SelectedRowContextProvider = <T extends object>({
  children
}: {
  children: React.ReactNode
}): React.ReactNode => {
  const [selectedRow, setSelectedRow] = useState<RowMetadata<T>>({} as any)

  return (
    <SelectedRowContext.Provider
      value={{
        selectedRow,
        setSelectedRow
      }}
    >
      {children}
    </SelectedRowContext.Provider>
  )
}

export { SelectedRowContext, SelectedRowContextProvider }

export const useSelectedRowContext = <T extends object>(): SelectedRowContextType<T> =>
  useContext(SelectedRowContext) as SelectedRowContextType<T>

export const rowMetadata = atom<RowMetadata<{}>['meta']>({ index: null })
export const rowData = atom<RowMetadata<any | {}>['data']>({})

rowMetadata.debugLabel = 'rowMetadataAtom'
rowData.debugLabel = 'rowDataAtom'


export const getSelectedRowAtom = <T,>() => {
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

  selectedRowAtom.debugLabel = 'selectedRowAtom, time:' + new Date().getTime()

  return selectedRowAtom
}
