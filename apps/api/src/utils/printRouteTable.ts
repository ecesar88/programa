import { Table } from 'console-table-printer'
import expressListEndpoints from 'express-list-endpoints'
import { type Express } from 'express'
import { ROUTES } from '../routes'

export const printRouteTable = (express: Express) => {
  const endpoints = expressListEndpoints(express.router).map((ed) => ({
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
      { title: 'REGISTERED ROUTES', name: 'path', alignment: 'left', color: 'green' },
      { title: 'METHOD', name: 'methods', alignment: 'right' }
    ]
  })

  table.addRow({ path: ROUTES.GRAPHQL_ROOT, methods: 'POST' }, { color: 'blue', separator: true })
  table.addRow(
    { path: `${ROUTES.INFO_ROOT}${ROUTES.INFO_DOCS}`, methods: 'GET' },
    { color: 'yellow', separator: true }
  )

  endpoints.forEach((ed) => {
    table.addRow(ed, { color: 'yellow', separator: true })
  })

  table.printTable()
}
