import { expect, test } from 'vitest'

/**
 * Not implemented
 */

export function sum(a: number, b: number) {
  return a + b
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

// TODO - Update tests to simulate auth as well

// Skipping all tests for now
// describe.skip('auth resolvers tests', () => {
//   let yoga: YogaServerInstance<{}, {}>

//   beforeAll(() => {
//     yoga = createTestServer()
//   })

//   test.skip('should execute login mutation', async () => {
//     const query = `mutation {
//       login(data: { email: "test@example.com", password: "password123" }) {
//         token
//         refreshToken
//       }
//     }`

//     const executor = buildHTTPExecutor({
//       fetch: yoga.fetch
//     })

//     const response = await executor({
//       document: parse(query)
//     })

//     expect(response).toBeDefined()
//   })

//   test.skip('should execute refreshToken mutation', async () => {
//     const query = `mutation {
//       refreshToken(data: { refreshToken: "test-token" }) {
//         token
//         refreshToken
//       }
//     }`

//     const executor = buildHTTPExecutor({
//       fetch: yoga.fetch
//     })

//     const response = await executor({
//       document: parse(query)
//     })

//     expect(response).toBeDefined()
//   })

//   test.skip('should execute me query', async () => {
//     const query = `query {
//       me {
//         id
//         name
//         email
//       }
//     }`

//     const executor = buildHTTPExecutor({
//       fetch: yoga.fetch
//     })

//     const response = await executor({
//       document: parse(query)
//     })

//     expect(response).toBeDefined()
//   })
// })
