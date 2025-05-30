/* eslint-disable @typescript-eslint/no-explicit-any */
import SchemaBuilder from '@pothos/core'
import ErrorsPlugin from '@pothos/plugin-errors'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import TracingPlugin, { isRootField, wrapResolver } from '@pothos/plugin-tracing'
import ZodPlugin from '@pothos/plugin-zod'
import { DateTimeResolver } from 'graphql-scalars'
import { fromError } from 'zod-validation-error'
import { LOG_TYPE, logger } from '../utils/logger'
import { Context } from './context'
import { LengthError, RecordNotFoundError } from './schema/_errors/errors'
import { ZodError } from 'zod'

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
  plugins: [ErrorsPlugin, ZodPlugin, TracingPlugin, SimpleObjectsPlugin],
  errors: {
    defaultTypes: [ZodError, Error, RecordNotFoundError, LengthError]
  },
  // zod: {
  //   // optionally customize how errors are formatted
  //   validationError: (zodError, _args, _context, _info) => {
  //     // the default behavior is to just throw the zod error directly
  //     const formattedError = fromError(zodError)

  //     logger({
  //       level: LOG_TYPE.ERROR,
  //       message: `Zod validation error`
  //     })

  //     throw formattedError
  //   }
  // },
  tracing: {
    // Enable tracing for rootFields by default, other fields need to opt in
    default: (config) => isRootField(config),
    // Log resolver execution duration
    wrap: (resolver, _options, config) =>
      wrapResolver(resolver, (error, duration) => {
        if (error) {
          logger({
            level: LOG_TYPE.ERROR,
            message: String(error)
          })
        }

        logger({
          level: LOG_TYPE.INFO,
          message: `Executed resolver ${config.parentType}.${config.name} in ${duration.toFixed(2)}ms`
        })
      })
  }
})

builder.addScalarType('DateTime', DateTimeResolver)
