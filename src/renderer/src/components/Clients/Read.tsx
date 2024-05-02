import { Client } from '@prisma/client'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useSelectedRowContext } from '../../context/SelectedRowContext'
import { CustomTable } from '../Table'

export const Read = ({
  clients,
  onRowClick
}: {
  clients: Client[]
  onRowClick?: (data: Client, index: number) => void
}): React.ReactNode => {
  const { selectedRow } = useSelectedRowContext<Client>()

  const columnHelper = createColumnHelper<Client>()

  const columns = [
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
      maxSize: 256,
      minSize: 256
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      cell: (info) => info.getValue(),
      header: () => <>Telefone</>,
      maxSize: 256,
      minSize: 256
    })
  ]

  return (
    <CustomTable
      data={clients}
      columns={columns as ColumnDef<Client>[]}
      selectedRow={selectedRow}
      onRowClick={onRowClick}
    />
  )
}
