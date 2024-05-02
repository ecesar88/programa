import { RowMetadata } from '@renderer/context/SelectedRowContext'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'
import { cn } from '../utils'

export interface Table2HeaderType<T extends object> {
  title: string
  keyName: keyof T
  render?: (rowData: T) => React.ReactNode
}

export interface TableProps<T extends object> {
  columns: ColumnDef<T>[]
  // columns: AccessorFnColumnDef<T>[] | AccessorKeyColumnDef<T>[]
  data: T[]
  selectedRow?: RowMetadata<T>
  onRowClick?: (data: T, index: number) => void
}

export const CustomTable = <T extends object>(props: TableProps<T>): React.ReactNode => {
  const { data: tableData, columns: tableHeaders, selectedRow, onRowClick } = props

  const table = useReactTable({
    data: tableData,
    columns: tableHeaders,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="w-full">
      <table
        className="border-separate border-spacing-0 border border-lightGray2"
        {...{
          style: {
            width: table.getCenterTotalSize()
          }
        }}
      >
        <thead className="bg-lightGray4">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-t-0 border border-b-0 border-lightGray2 px-4 py-2 font-normal text-left text-[16px] last:border-r-0 first:border-l-0"
                  {...{
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize()
                    }
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row, idx) => {
            return (
              <tr
                key={row.id}
                className={cn(
                  'hover:outline',
                  'hover:outline-2',
                  'hover:outline-gray3',
                  'font-normal',
                  'last:border-r-0',
                  'first:border-l-0',
                  {
                    ['outline-blue3 outline-2 outline hover:outline-2 hover:outline-blue1 hover:outline z-10']:
                      selectedRow &&
                      Object.values(selectedRow)?.length &&
                      selectedRow?.meta?.index === parseInt(row.id)
                    // (selectedRow as T & { id: string | number }).id === row.original.id
                  }
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-lightGray2 px-4 py-0 bg-white text-left"
                    {...{
                      onClick: () => onRowClick?.(row.original as T, idx),
                      style: {
                        width: cell.column.getSize()
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>

        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}
