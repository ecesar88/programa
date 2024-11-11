/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type BaseError = Error & {
  __typename?: 'BaseError';
  message: Maybe<Scalars['String']['output']>;
};

/** Long necks, cool patterns, taller than you. */
export type Client = {
  __typename?: 'Client';
  id: Maybe<Scalars['Int']['output']>;
  name: Maybe<Scalars['String']['output']>;
  phone: Maybe<Scalars['String']['output']>;
};

export type ClientCreateOrUpdateInput = {
  name: Scalars['String']['input'];
  phone: InputMaybe<Scalars['String']['input']>;
};

export type Error = {
  message: Maybe<Scalars['String']['output']>;
};

export type LengthError = Error & {
  __typename?: 'LengthError';
  message: Maybe<Scalars['String']['output']>;
  minLength: Maybe<Scalars['Int']['output']>;
};

/** A entry on the menu */
export type MenuEntry = {
  __typename?: 'MenuEntry';
  description: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['Int']['output']>;
  labels: Maybe<Array<MenuEntryLabel>>;
  name: Maybe<Scalars['String']['output']>;
  variant: Maybe<Array<MenuEntryVariant>>;
};

/** The category of a specific MenuEntry. This can be used to sort products by type, such as drinks and meats */
export type MenuEntryCategory = {
  __typename?: 'MenuEntryCategory';
  id: Maybe<Scalars['Int']['output']>;
  name: Maybe<Scalars['String']['output']>;
};

/** Input to create a new MenuEntry */
export type MenuEntryInput = {
  description: InputMaybe<Scalars['String']['input']>;
  labels: InputMaybe<Array<MenuEntryLabelInput>>;
  name: Scalars['String']['input'];
  variant: InputMaybe<Array<MenuEntryVariantInput>>;
};

/** A label on the MenuEntryObject type. This can be used to categorize MenuEntries with different labels. */
export type MenuEntryLabel = {
  __typename?: 'MenuEntryLabel';
  color: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
};

export type MenuEntryLabelInput = {
  color: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
};

/** A variant on the MenuEntry, this can be a different sized or flavored product */
export type MenuEntryVariant = {
  __typename?: 'MenuEntryVariant';
  description: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['Int']['output']>;
  name: Maybe<Scalars['String']['output']>;
  price: Maybe<Scalars['Float']['output']>;
};

export type MenuEntryVariantInput = {
  description: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  price: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createClient: Maybe<Client>;
  createMenuEntry: Maybe<MenuEntry>;
  deleteClient: Maybe<MutationDeleteClientResult>;
  deleteMenuEntryById: Maybe<MutationDeleteMenuEntryByIdResult>;
  updateClient: Maybe<Client>;
};


export type MutationCreateClientArgs = {
  name: Scalars['String']['input'];
  phone: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateMenuEntryArgs = {
  description: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  variant: InputMaybe<Array<MenuEntryVariantInput>>;
};


export type MutationDeleteClientArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMenuEntryByIdArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateClientArgs = {
  data: ClientCreateOrUpdateInput;
  id: Scalars['Int']['input'];
};

export type MutationDeleteClientResult = BaseError | MutationDeleteClientSuccess | RecordNotFoundError;

export type MutationDeleteClientSuccess = {
  __typename?: 'MutationDeleteClientSuccess';
  data: Client;
};

export type MutationDeleteMenuEntryByIdResult = BaseError | MutationDeleteMenuEntryByIdSuccess | RecordNotFoundError;

export type MutationDeleteMenuEntryByIdSuccess = {
  __typename?: 'MutationDeleteMenuEntryByIdSuccess';
  data: MenuEntry;
};

export type Query = {
  __typename?: 'Query';
  getAllClients: Maybe<Array<Client>>;
  getAllMenuEntries: Maybe<Array<MenuEntry>>;
  getClientById: Maybe<QueryGetClientByIdResult>;
  getMenuEntryById: Maybe<QueryGetMenuEntryByIdResult>;
  searchClients: Maybe<Array<Client>>;
};


export type QueryGetAllClientsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllMenuEntriesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetClientByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetMenuEntryByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySearchClientsArgs = {
  search: Scalars['String']['input'];
};

export type QueryGetClientByIdResult = BaseError | QueryGetClientByIdSuccess | RecordNotFoundError;

export type QueryGetClientByIdSuccess = {
  __typename?: 'QueryGetClientByIdSuccess';
  data: Client;
};

export type QueryGetMenuEntryByIdResult = BaseError | QueryGetMenuEntryByIdSuccess | RecordNotFoundError;

export type QueryGetMenuEntryByIdSuccess = {
  __typename?: 'QueryGetMenuEntryByIdSuccess';
  data: MenuEntry;
};

export type RecordNotFoundError = Error & {
  __typename?: 'RecordNotFoundError';
  message: Maybe<Scalars['String']['output']>;
};

export type CreateClientMutationVariables = Exact<{
  name: Scalars['String']['input'];
  phone: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename: 'Client', id: number | null, name: string | null, phone: string | null } | null };

export type UpdateClientByIdMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: ClientCreateOrUpdateInput;
}>;


export type UpdateClientByIdMutation = { __typename?: 'Mutation', updateClient: { __typename: 'Client', id: number | null, name: string | null, phone: string | null } | null };

export type DeleteClientByIdMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteClientByIdMutation = { __typename?: 'Mutation', deleteClient: { __typename?: 'BaseError' } | { __typename?: 'MutationDeleteClientSuccess', data: { __typename: 'Client', id: number | null, name: string | null, phone: string | null } } | { __typename?: 'RecordNotFoundError', message: string | null } | null };

export type GetAllClientsQueryVariables = Exact<{
  page: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllClientsQuery = { __typename?: 'Query', getAllClients: Array<{ __typename: 'Client', id: number | null, name: string | null, phone: string | null }> | null };

export type GetClientByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetClientByIdQuery = { __typename?: 'Query', getClientById: { __typename: 'BaseError' } | { __typename: 'QueryGetClientByIdSuccess', data: { __typename?: 'Client', id: number | null, name: string | null, phone: string | null } } | { __typename: 'RecordNotFoundError', message: string | null } | null };

export type VariantFragment = { __typename: 'MenuEntryVariant', id: number | null, name: string | null, description: string | null, price: number | null } & { ' $fragmentName'?: 'VariantFragment' };

export type LabelFragment = { __typename: 'MenuEntryLabel', name: string | null, color: string | null } & { ' $fragmentName'?: 'LabelFragment' };

export type MenuEntryFragment = { __typename: 'MenuEntry', id: number | null, name: string | null, description: string | null, labels: Array<(
    { __typename?: 'MenuEntryLabel' }
    & { ' $fragmentRefs'?: { 'LabelFragment': LabelFragment } }
  )> | null, variant: Array<(
    { __typename?: 'MenuEntryVariant' }
    & { ' $fragmentRefs'?: { 'VariantFragment': VariantFragment } }
  )> | null } & { ' $fragmentName'?: 'MenuEntryFragment' };

export type CreateMenuEntryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: InputMaybe<Scalars['String']['input']>;
  variant: InputMaybe<Array<MenuEntryVariantInput> | MenuEntryVariantInput>;
}>;


export type CreateMenuEntryMutation = { __typename?: 'Mutation', createMenuEntry: (
    { __typename?: 'MenuEntry' }
    & { ' $fragmentRefs'?: { 'MenuEntryFragment': MenuEntryFragment } }
  ) | null };

export type DeleteMenuEntryByIdMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteMenuEntryByIdMutation = { __typename?: 'Mutation', deleteMenuEntryById: { __typename?: 'BaseError', message: string | null } | { __typename?: 'MutationDeleteMenuEntryByIdSuccess', data: (
      { __typename?: 'MenuEntry' }
      & { ' $fragmentRefs'?: { 'MenuEntryFragment': MenuEntryFragment } }
    ) } | { __typename?: 'RecordNotFoundError', message: string | null } | null };

export type GetAllMenuEntriesQueryVariables = Exact<{
  page: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllMenuEntriesQuery = { __typename?: 'Query', getAllMenuEntries: Array<(
    { __typename?: 'MenuEntry' }
    & { ' $fragmentRefs'?: { 'MenuEntryFragment': MenuEntryFragment } }
  )> | null };

export type GetMenuEntryByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetMenuEntryByIdQuery = { __typename?: 'Query', getMenuEntryById: { __typename?: 'BaseError', message: string | null } | { __typename?: 'QueryGetMenuEntryByIdSuccess', data: (
      { __typename?: 'MenuEntry' }
      & { ' $fragmentRefs'?: { 'MenuEntryFragment': MenuEntryFragment } }
    ) } | { __typename?: 'RecordNotFoundError', message: string | null } | null };

export const LabelFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"label"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<LabelFragment, unknown>;
export const VariantFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]} as unknown as DocumentNode<VariantFragment, unknown>;
export const MenuEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"menuEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"variant"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"label"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]} as unknown as DocumentNode<MenuEntryFragment, unknown>;
export const CreateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<CreateClientMutation, CreateClientMutationVariables>;
export const UpdateClientByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateClientById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientCreateOrUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<UpdateClientByIdMutation, UpdateClientByIdMutationVariables>;
export const DeleteClientByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteClientById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteClientSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteClientByIdMutation, DeleteClientByIdMutationVariables>;
export const GetAllClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllClients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllClients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<GetAllClientsQuery, GetAllClientsQueryVariables>;
export const GetClientByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getClientById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getClientById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetClientByIdSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetClientByIdQuery, GetClientByIdQueryVariables>;
export const CreateMenuEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMenuEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"variant"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariantInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMenuEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"variant"},"value":{"kind":"Variable","name":{"kind":"Name","value":"variant"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"menuEntry"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"label"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"menuEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"variant"}}]}}]}}]} as unknown as DocumentNode<CreateMenuEntryMutation, CreateMenuEntryMutationVariables>;
export const DeleteMenuEntryByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteMenuEntryById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMenuEntryById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteMenuEntryByIdSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"menuEntry"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"label"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"menuEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"variant"}}]}}]}}]} as unknown as DocumentNode<DeleteMenuEntryByIdMutation, DeleteMenuEntryByIdMutationVariables>;
export const GetAllMenuEntriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllMenuEntries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMenuEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"menuEntry"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"label"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"menuEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"variant"}}]}}]}}]} as unknown as DocumentNode<GetAllMenuEntriesQuery, GetAllMenuEntriesQueryVariables>;
export const GetMenuEntryByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMenuEntryById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMenuEntryById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetMenuEntryByIdSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"menuEntry"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"label"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"menuEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"variant"}}]}}]}}]} as unknown as DocumentNode<GetMenuEntryByIdQuery, GetMenuEntryByIdQueryVariables>;