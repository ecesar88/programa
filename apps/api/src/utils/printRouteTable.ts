import { Table } from 'console-table-printer'
import type { Express } from 'express'
import expressListEndpoints from 'express-list-endpoints'
import { ROUTES } from '../server/routes'

export const printRouteTable = (express: Express) => {
  const endpoints = expressListEndpoints(express.router).map((ed) => ({
    path: ed.path,
    methods: ed.methods
  }))

  const table = new Table({
    columns: [
      {
        title: 'REGISTERED ROUTES',
        name: 'path',
        alignment: 'left',
        color: 'green'
      },
      { title: 'METHOD', name: 'methods', alignment: 'right' }
    ]
  })

  table.addRow({ path: ROUTES.GRAPHQL_ROOT, methods: 'POST' }, { color: 'blue', separator: true })
  table.addRow(
    { path: `${ROUTES.INFO}${ROUTES.DOCS}`, methods: 'GET' },
    { color: 'yellow', separator: true }
  )
  table.addRow(
    { path: `${ROUTES.INFO}${ROUTES.DOCS}${ROUTES.VOYAGER}`, methods: 'GET' },
    { color: 'yellow', separator: true }
  )

  endpoints.forEach((ed) => {
    table.addRow(ed, { color: 'yellow', separator: true })
  })

  table.printTable()
}
