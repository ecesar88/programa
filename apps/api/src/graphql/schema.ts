import { builder } from './builder'

import { printSchema } from 'graphql'
import { writeFileSync } from 'node:fs'
import path from 'node:path'

import './schema/client/operations'
import './schema/client/types'

import './schema/errors/errors'
import './schema/errors/objects'

builder.queryType({})
builder.mutationType({})

export const schema = builder.toSchema()

// Write the graphql schema to a file so that we can use it on graphql-codegen
writeFileSync(path.join(__dirname, 'schema.graphql'), printSchema(schema))
