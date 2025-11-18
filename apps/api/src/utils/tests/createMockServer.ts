import { useErrorHandler } from '@envelop/core'
import { createYoga } from 'graphql-yoga'
import { builder } from '../../server/graphql/builder'

import '../../server/graphql/schema/car/operations'
import '../../server/graphql/schema/car/types'

import '../../server/graphql/schema/auth/operations'
import '../../server/graphql/schema/auth/types'

import '../../server/graphql/schema/user/operations'
import '../../server/graphql/schema/user/types'

import '../../server/graphql/schema/address/operations'
import '../../server/graphql/schema/address/types'

import '../../server/graphql/schema/contact/operations'
import '../../server/graphql/schema/contact/types'

import '../../server/graphql/schema/_errors/objects'
import '../../server/graphql/schema/_errors/errors'

import '../../server/graphql/schema/healthcheck/types'

// Function to run a test query
export const createTestServer = () => {
  builder.queryType({})
  builder.mutationType({})

  const schema = builder.toSchema()

  return createYoga({
    schema,
    plugins: [
      useErrorHandler((error) => {
        console.error('Error:', error)
      })
    ]
  })
}
