import React, { createContext, useContext, useState } from 'react'

export interface RowMetadata<T extends object> {
  meta?: { index: number }
  data?: T
}

export interface SelectedRowContextType<T extends object> {
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
  const [selectedRow, setSelectedRow] = useState<RowMetadata<T>>({})

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
