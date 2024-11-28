import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../context'

export type Resolver<T = object> = (
  parent: object,
  args: T,
  ctx: Context,
  info: GraphQLResolveInfo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => any

export type PaginationParam = { page?: number | null }
export type Id = { id: number }
export type FindByQuery = { search: string }
