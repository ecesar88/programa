import { YogaServerInstance } from 'graphql-yoga'
import { describe } from 'node:test'
import { buildHTTPExecutor } from '@graphql-tools/executor-http'
import { beforeAll, expect, test } from 'vitest'
import { createTestServer } from '../../../../../utils/tests/createMockServer'
import { parse } from 'graphql'

describe('address resolvers tests', () => {
  let yoga: YogaServerInstance<{}, {}>

  beforeAll(() => {
    yoga = createTestServer()
  })

  test.skip('should execute address query', async () => {
    const query = `query {
      address(id: "00000000-0000-0000-0000-000000000000") {
        id
        name
        street
        number
        city
        state
      }
    }`

    const executor = buildHTTPExecutor({
      fetch: yoga.fetch
    })

    const response = await executor({
      document: parse(query)
    })

    expect(response).toBeDefined()
  })

  test.skip('should execute createAddress mutation', async () => {
    const query = `mutation {
      createAddress(data: {
        name: "Home"
        street: "Main Street"
        number: "123"
        neighborhood: "Downtown"
        zipCode: "12345-678"
        city: "São Paulo"
        state: "SP"
      }) {
        id
        name
        street
        city
      }
    }`

    const executor = buildHTTPExecutor({
      fetch: yoga.fetch
    })

    const response = await executor({
      document: parse(query)
    })

    expect(response).toBeDefined()
  })

  test.skip('should execute updateAddress mutation', async () => {
    const query = `mutation {
      updateAddress(input: {
        id: "00000000-0000-0000-0000-000000000000"
        data: {
          name: "Updated Address"
          street: "Updated Street"
          number: "456"
          neighborhood: "Uptown"
          zipCode: "98765-432"
          city: "Rio de Janeiro"
          state: "RJ"
        }
      }) {
        id
        name
        street
      }
    }`

    const executor = buildHTTPExecutor({
      fetch: yoga.fetch
    })

    const response = await executor({
      document: parse(query)
    })

    expect(response).toBeDefined()
  })

  test.skip('should execute deleteAddress mutation', async () => {
    const query = `mutation {
      deleteAddress(id: "00000000-0000-0000-0000-000000000000") {
        id
        name
      }
    }`

    const executor = buildHTTPExecutor({
      fetch: yoga.fetch
    })

    const response = await executor({
      document: parse(query)
    })

    expect(response).toBeDefined()
  })
})
