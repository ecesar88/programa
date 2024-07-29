import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../context'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Resolver<T> = (parent: object, args: T, ctx: Context, info: GraphQLResolveInfo) => any

export type PaginationParam = { page?: number | null }
export type FindById = { id: number }
export type FindByQuery = { search: string }
