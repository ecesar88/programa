import { Client } from '@prisma/client'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { Table } from '../Table/Table'

const columnHelper = createColumnHelper<Client>()

export const Read = ({
  clients,
  onRowClick
}: {
  clients: Client[]
  onRowClick?: (data: Client, index: number) => void
}): React.ReactNode => {
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        id: 'id',
        cell: (info) => info.getValue(),
        header: () => <>Id</>,
        maxSize: 80,
        minSize: 80
      }),
      columnHelper.accessor('name', {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <>Nome</>,
        maxSize: 1024,
        minSize: 256
      }),
      columnHelper.accessor('phone', {
        id: 'phone',
        cell: (info) => info.getValue(),
        header: () => <>Telefone</>,
        maxSize: 256,
        minSize: 256
      })
    ],
    []
  )

  return <Table data={clients} columns={columns as ColumnDef<Client>[]} onRowClick={onRowClick} />
}
