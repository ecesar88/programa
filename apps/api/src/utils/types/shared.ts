/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import type { GraphQLResolveInfo } from 'graphql'
import { Result } from 'neverthrow'
import { builder } from 'src/server/graphql/builder'
import type { Context } from 'src/server/graphql/context'

/**
 * @deprecated -- Make this generic
 */
export type PothosFields = Parameters<typeof builder.inputType>['1']['fields']

// Make all types in T required
export type RequiredAll<T> = {
  [P in keyof T]-?: T[P]
}

// Make all types in T required AND not nullable
export type NonNullableRequired<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>
}

export type OkType<R> = R extends Result<infer T, any> ? T : never
export type ErrType<R> = R extends Result<any, infer E> ? E : never

export type Resolver<T = object> = (
  parent: object,
  args: T,
  ctx: Context,
  info: GraphQLResolveInfo
) => any

export type PaginationParam = { page?: number | null }
export type Id<T extends string | number = string> = { id: T }
export type FindByQuery = { search: string }
