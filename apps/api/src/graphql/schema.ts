import { builder } from './builder'

import './schema/errors/errors'
import './schema/errors/schemas'

import { printSchema } from 'graphql'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import './schema/client/operations'
import './schema/client/types'

export const schema = builder.toSchema()

// Write the graphql schema to a file so that we can use it on graphql-codegen
writeFileSync(path.join(__dirname, 'schema.graphql'), printSchema(schema))
