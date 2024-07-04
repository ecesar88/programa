import SchemaBuilder, { RootFieldBuilder } from '@pothos/core'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import ErrorsPlugin from '@pothos/plugin-errors'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'
import { RecordNotFoundError } from './schema/errors/errors'

console.log('RootFieldBuilder >> ', RootFieldBuilder)

type SchemaType = {
  Scalars: {
    ID: {
      Output: number | string
      Input: string
    }
    DateTime: {
      Output: Date
      Input: Date
    }
    JSONObject: {
      Output: any
      Input: any
    }
  }
  Context: Context
}

export const builder = new SchemaBuilder<SchemaType>({
  plugins: [SimpleObjectsPlugin, ErrorsPlugin],
  errorOptions: {
    defaultTypes: [Error, RecordNotFoundError],
  }
})

builder.queryType({})
builder.mutationType({})

builder.addScalarType('DateTime', DateTimeResolver)
