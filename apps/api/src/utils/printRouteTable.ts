import { Table } from 'console-table-printer'

export const printRouteTable = (
  endpoints: {
    middlewares?: string[] | undefined
    path: string
    methods: string[]
  }[]
) => {
  const table = new Table({
    columns: [
      { title: 'REGISTERED ROUTES', name: 'path', alignment: 'left', color: 'blue' },
      { title: 'METHOD', name: 'methods', alignment: 'left' }
    ]
  })

  endpoints.forEach((ed) => {
    table.addRow(ed, { color: 'yellow', separator: true })
  })

  table.printTable()
}
