import { rowMetaDataFocusedAtom, selectedRowAtom } from '@renderer/store'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect, useMemo } from 'react'
import { cn } from '../../../utils'
import { Pagination } from './Pagination'
import { SearchBar } from './SearchBar'

export interface Table2HeaderType<T extends object> {
  title: string
  keyName: keyof T
  render?: (rowData: T) => React.ReactNode
}

export interface TableProps<T extends object> {
  columns: ColumnDef<T>[]
  // columns: ColumnHelper<T>
  data: T[]
  onRowClick?: (data: T, index: number) => void
  tableTitle?: string
}

export const Table = <T extends object>(props: TableProps<T>): React.ReactNode => {
  const { data: tableData, columns: tableColumns, onRowClick, tableTitle } = props

  const setSelectedRow = useSetAtom(selectedRowAtom)

  // Clear selected row when the table is umounted
  useEffect(() => {
    return () => {
      setSelectedRow({ data: {}, meta: { index: null } })
    }
  }, [])

  const memoizedTableData = useMemo(() => tableData ?? [], [])
  const memoizedTableColumns = useMemo(() => tableColumns, [])

  const table = useReactTable({
    data: memoizedTableData,
    columns: memoizedTableColumns,
    getCoreRowModel: getCoreRowModel()
  })

  const rowMetaData = useAtomValue(rowMetaDataFocusedAtom)

  return (
    <div className="w-full max-w-[calc(100%)]">
      <div className="mb-3">
        <SearchBar />
      </div>

      {tableTitle ? (
        <div className="flex items-center justify-between rounded-t border border-b-0 border-lightGray2 bg-lightGray5">
          {tableTitle}
        </div>
      ) : null}

      <table className="border-spacing-0 border border-lightGray2 border-b-0 w-full">
        <thead className="bg-lightGray5">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              {...{
                style: {
                  minWidth: table.getTotalSize()
                }
              }}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="border-t-0 border border-b-0 border-lightGray2 px-4 py-2 font-normal text-left text-[16px] last:border-r-0 first:border-l-0"
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        minWidth: header.getSize()
                      }
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                )
              })}

              {(() => {
                return (
                  <th
                    className="border-t-0 border border-b-0 border-lightGray2 px-4 py-2 font-normal text-left text-[16px] last:border-r-0 first:border-l-0"
                    style={{ width: '100%' }}
                  ></th>
                )
              })()}
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
                    ['outline-blue4 outline-2 outline hover:outline-2 hover:outline-blue1 hover:outline z-10']:
                      rowMetaData === parseInt(row.id)
                  }
                )}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={cn(
                        'border border-lightGray2 px-4 py-0 bg-white text-left transition-all',
                        {
                          'bg-cerulean5 bg-opacity-20': rowMetaData === parseInt(row.id)
                        }
                      )}
                      {...{
                        onClick: () => onRowClick?.(row.original, idx),
                        style: {
                          width: `${cell.column.getSize()}px`
                        }
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}

                {(() => {
                  return (
                    <td
                      className="border border-lightGray2 px-4 py-0 bg-lightGray5 text-left"
                      style={{ width: '100%' }}
                    ></td>
                  )
                })()}
              </tr>
            )
          })}
        </tbody>

        <tfoot className="w-full">
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

      <Pagination />
    </div>
  )
}
