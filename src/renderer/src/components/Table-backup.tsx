import { HotkeysProvider } from '@blueprintjs/core'
import { Cell, Column, ColumnHeaderCell, SelectionModes, Table2 } from '@blueprintjs/table'

import { useReactTable } from '@tanstack/react-table'

export interface Table2HeaderType<T extends Record<string, any>> {
  title: string
  keyName: keyof T
  render?: (rowData: T) => React.ReactNode
}

export interface Table2Props<T extends Record<string, any>> {
  header: Table2HeaderType<T>[]
  data: T[]
  onRowClick?: (data?: T) => void
  selectedRow?: T
}

export const CustomTable = <T extends Record<string, any>>({ data }: { data: Table2Props<T> }) => {
  const { data: tableData, header: tableHeaders, onRowClick, selectedRow } = data

  const table = useReactTable({
    columns: [{}]
  })

  return (
    <HotkeysProvider>
      <Table2
        enableMultipleSelection={false}
        enableRowHeader={false}
        numRows={tableData?.length}
        selectedRegionTransform={(e) => {
          const index = e.rows?.[0]
          const rowData = tableData[index!] ?? undefined
          onRowClick?.(rowData)

          // if (
          //   selectedRow === undefined ||
          //   (selectedRow !== undefined && !Object.values(selectedRow).length)
          // )
          //   return {
          //     rows: undefined,
          //   };

          return {
            rows: e.rows
          }
        }}
        enableGhostCells
        selectionModes={SelectionModes.ROWS_AND_CELLS}
      >
        {tableHeaders?.map((header) => {
          return (
            <Column
              key={header.title}
              cellRenderer={(idx) => {
                const columnData = tableData[idx]
                const rowData = columnData[header.keyName]

                let renderable

                if (header?.render) {
                  renderable = header?.render(columnData)
                }

                return (
                  <Cell tooltip={rowData}>
                    {(() => {
                      if (renderable) return renderable
                      return tableData[idx][header.keyName]
                    })()}
                  </Cell>
                )
              }}
              columnHeaderCellRenderer={() => <ColumnHeaderCell name={header.title} />}
            />
          )
        })}
      </Table2>
    </HotkeysProvider>
  )
}
