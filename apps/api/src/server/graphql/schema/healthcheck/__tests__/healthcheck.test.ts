/**
 * Not implemented
 */
import { YogaServerInstance } from 'graphql-yoga'
import { describe } from 'node:test'
// import { instantiateGQLExecutor } from '../../../../../utils/tests/httpExecutor'
import { buildHTTPExecutor } from '@graphql-tools/executor-http'
import { beforeAll, expect, test } from 'vitest'
import { createTestServer } from '../../../../../utils/tests/createMockServer'
import { parse } from 'graphql'

export function sum(a: number, b: number) {
  return a + b
}

describe('healthcheck tests', () => {
  let yoga: YogaServerInstance<{}, {}>

  beforeAll(() => {
    yoga = createTestServer()
  })

  test('should return "ok" when querying for "healthCheck"', async () => {
    const query = `query {
      healthCheck {
        status
      }
    }`

    const executor = buildHTTPExecutor({
      fetch: yoga.fetch
    })

    const response = (await executor({
      document: parse(query)
    })) as { data: { healthCheck: { status: string } } }

    expect(response.data.healthCheck.status).toEqual('ok')
  })
})
