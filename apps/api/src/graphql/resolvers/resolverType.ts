import { FieldResolver } from 'nexus'

export interface GenericFieldResolver<T extends string> {
  queryAll?: FieldResolver<'Query', `${T}s`>
  queryOne?: FieldResolver<'Query', `${T}s`>
  create: FieldResolver<'Mutation', `create${T}`>
  update?: FieldResolver<'Mutation', `update${T}`>
  delete?: FieldResolver<'Mutation', `delete${T}`>
}
