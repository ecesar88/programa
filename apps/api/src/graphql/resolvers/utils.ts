import { FieldResolver } from 'nexus'
import { Context } from '../context'

export interface GenericFieldResolver<T extends string> {
  queryAll?: FieldResolver<'Query', `queryAll${T}s`>
  queryOne?: FieldResolver<'Query', `queryOne${T}`>
  create?: FieldResolver<'Mutation', `create${T}`>
  update?: FieldResolver<'Mutation', `update${T}`>
  delete?: FieldResolver<'Mutation', `delete${T}`>
}

export const createResolver = <Args extends Object>(root: {}, args: Args, ctx: Context) => {
  return {}
}

