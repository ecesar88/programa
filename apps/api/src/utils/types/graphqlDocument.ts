/* eslint-disable @typescript-eslint/no-explicit-any */

export type GQLSelectionFieldArgumentValueKindStringValue = {
  kind: 'StringValue'
  value: string
}

export type GQLSelectionFieldArgumentValueKindListValue = {
  kind: 'ListValue'
  values: any[]
}

export type GQLSelectionFieldArgumentValueKindObjectValue = {
  kind: 'ObjectValue'
  fields: {
    kind: 'ObjectField'
    name: {
      kind: 'Name'
      value: string
    }
    value: {
      kind: string
      value: any
    }
  }
}

export type GQLSelectionFieldArgument = {
  kind: 'Argument'
  name: {
    kind: 'Name'
    value: string
  }
  value:
    | GQLSelectionFieldArgumentValueKindStringValue
    | GQLSelectionFieldArgumentValueKindListValue
    | GQLSelectionFieldArgumentValueKindObjectValue
}

export type GQLSelectionField = {
  kind: 'Field'
  alias?: 'string'
  name: { kind: string; value: string }
  arguments: GQLSelectionFieldArgument[]
  value: { kind: string; value: any }
}

export type GQLSelection = {
  kind: 'SelectionSet'
  selections: GQLSelectionField[]
}

export type GQLDefinition = {
  kind: 'OperationDefinition' | 'FragmentDefinition'
  operation: 'query' | 'mutation'
  name: { kind: string; value: string }
  variableDefinitions: any[]
  directives: any[]
  selectionSet: GQLSelection
}

export type GQLDefinitions = GQLDefinition[]
