import { YogaServerInstance } from 'graphql-yoga'
import { describe } from 'node:test'
import { buildHTTPExecutor } from '@graphql-tools/executor-http'
import { beforeAll, expect, test } from 'vitest'
import { createTestServer } from '../../../../../utils/tests/createMockServer'
import { parse } from 'graphql'

describe('user resolvers tests', () => {
  let yoga: YogaServerInstance<{}, {}>

  beforeAll(() => {
    yoga = createTestServer()
  })

  test.skip('should execute users query', async () => {
    const query = `query {
      users {
        id
        name
        email
        username
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

  test.skip('should execute user query', async () => {
    const query = `query {
      user(id: "00000000-0000-0000-0000-000000000000") {
        id
        name
        email
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

  test.skip('should execute createUser mutation', async () => {
    const query = `mutation {
      createUser(data: {
        name: "Test User"
        username: "testuser"
        email: "test@example.com"
        phone: "1234567890"
        password: "password123"
      }) {
        id
        name
        email
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

  test.skip('should execute updateUser mutation', async () => {
    const query = `mutation {
      updateUser(input: {
        id: "00000000-0000-0000-0000-000000000000"
        data: {
          name: "Updated User"
          username: "updateduser"
          email: "updated@example.com"
          phone: "41999999999"
        }
      }) {
        id
        name
        email
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

  test.skip('should execute deleteUser mutation', async () => {
    const query = `mutation {
      deleteUser(id: "00000000-0000-0000-0000-000000000000") {
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
