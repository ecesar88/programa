import SchemaBuilder from '@pothos/core'
import ErrorsPlugin from '@pothos/plugin-errors'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'
import { RecordNotFoundError } from './schema/errors/errors'

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
  plugins: [ErrorsPlugin, SimpleObjectsPlugin],
  errors: {
    defaultTypes: [Error, RecordNotFoundError]
  }
})

builder.addScalarType('DateTime', DateTimeResolver)
