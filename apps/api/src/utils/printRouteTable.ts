import { Table } from 'console-table-printer'
import expressListEndpoints from 'express-list-endpoints'
import { type Express } from 'express'

export const printRouteTable = (express: Express) => {
  const endpoints = expressListEndpoints(express).map((ed) => ({
    path: ed.path,
    methods: ed.methods,
    ...(!ed.middlewares.includes('anonymous')
      ? {
          middlewares: ed.middlewares
        }
      : {})
  }))

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
