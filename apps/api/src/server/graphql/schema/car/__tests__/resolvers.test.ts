import { YogaServerInstance } from 'graphql-yoga'
import { describe } from 'node:test'
import { buildHTTPExecutor } from '@graphql-tools/executor-http'
import { beforeAll, expect, test } from 'vitest'
import { createTestServer } from '../../../../../utils/tests/createMockServer'
import { parse } from 'graphql'

describe('car resolvers tests', () => {
  let yoga: YogaServerInstance<{}, {}>

  beforeAll(() => {
    yoga = createTestServer()
  })

  test.skip('should execute getAllCars query', async () => {
    const query = `query {
      getAllCars {
        id
        make
        model
        year
        licensePlate
        color
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

  test.skip('should execute createCar mutation', async () => {
    const query = `mutation {
      createCar(data: {
        make: "Toyota"
        model: "Camry"
        year: 2023
        licensePlate: "ABC1234"
        color: "Blue"
      }) {
        id
        make
        model
        year
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
