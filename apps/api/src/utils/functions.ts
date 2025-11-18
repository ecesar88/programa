import { type AuthFailure, AuthScopeFailureType } from '@pothos/plugin-scope-auth'
import type { Result } from 'neverthrow'
import { env } from '../environment/env'

export const isDev = () => env.NODE_ENV === 'development'

// src/server/graphql/builder.ts
// Refer to: https://pothos-graphql.dev/docs/plugins/scope-auth#surfacing-errors-thrown-in-authorization-checks
// Find the first error and re-throw it
export function throwFirstError(failure: AuthFailure) {
  // Check if the failure has an error attached to it and re-throw it
  if ('error' in failure && failure.error) {
    throw failure.error
  }

  // Loop over any/all scopes and see if one of their children has an error to throw
  if (
    failure.kind === AuthScopeFailureType.AnyAuthScopes ||
    failure.kind === AuthScopeFailureType.AllAuthScopes
  ) {
    for (const child of failure.failures) {
      throwFirstError(child)
    }
  }
}

export function unwrapOrThrow<T, E extends Error>(result: Result<T, E>): T {
  if (result.isErr()) throw result.error

  return result.value
}
