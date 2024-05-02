import { Client } from '@prisma/client'
import { useContext } from 'react'
import { SelectedRowContext, SelectedRowContextType } from '../../context/SelectedRowContext'
import { CustomTable } from '../Table'
import { ColumnDef } from '@tanstack/react-table'

export const Read = ({
  clients,
  onRowClick
}: {
  clients: Client[]
  onRowClick?: (data: Client, index: number) => void
}): React.ReactNode => {
  const { selectedRow } = useContext<SelectedRowContextType<Client>>(SelectedRowContext)

  // const columnHelper = createColumnHelper<Client>()

  // const columns = [
  //   columnHelper.accessor('id', {
  //     id: 'id',
  //     cell: (info) => info.getValue(),
  //     header: () => <>Id</>,
  //     maxSize: 80,
  //     minSize: 80
  //   }),
  //   columnHelper.accessor('name', {
  //     id: 'name',
  //     cell: (info) => info.getValue(),
  //     header: () => <>Nome</>,
  //     maxSize: 256,
  //     minSize: 256
  //   }),
  //   columnHelper.accessor('phone', {
  //     id: 'phone',
  //     cell: (info) => info.getValue(),
  //     header: () => <>Telefone</>,
  //     maxSize: 256,
  //     minSize: 256
  //   })
  // ]

  const columns: ColumnDef<Client>[] = [
    {
      id: 'id',
      cell: (info) => info.getValue(),
      header: () => <>Id</>,
      maxSize: 80,
      minSize: 80
    },
    {
      id: 'name',
      cell: (info) => info.getValue(),
      header: () => <>Nome</>,
      maxSize: 256,
      minSize: 256
    },
    {
      id: 'phone',
      cell: (info) => info.getValue(),
      header: () => <>Telefone</>,
      maxSize: 256,
      minSize: 256
    }
  ]

  return (
    <CustomTable
      data={clients}
      columns={columns}
      selectedRow={selectedRow}
      onRowClick={onRowClick}
    />
  )
}
