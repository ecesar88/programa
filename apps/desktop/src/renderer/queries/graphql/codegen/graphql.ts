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

/** An entry on the menu */
export type MenuEntry = {
  __typename?: 'MenuEntry';
  description: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['Int']['output']>;
  labels: Maybe<Array<MenuEntryLabel>>;
  name: Maybe<Scalars['String']['output']>;
  variants: Maybe<Array<MenuEntryVariant>>;
};

/** The category of a specific MenuEntry. This can be used to sort products by type, such as drinks, meats, grains, etc */
export type MenuEntryCategory = {
  __typename?: 'MenuEntryCategory';
  id: Maybe<Scalars['Int']['output']>;
  name: Maybe<Scalars['String']['output']>;
};

export type MenuEntryCategoryInput = {
  name: InputMaybe<Scalars['String']['input']>;
};

/** Input to create a new MenuEntry */
export type MenuEntryInput = {
  categories: InputMaybe<Array<MenuEntryCategoryInput>>;
  description: InputMaybe<Scalars['String']['input']>;
  labels: InputMaybe<Array<MenuEntryLabelInput>>;
  name: Scalars['String']['input'];
  variants: InputMaybe<Array<MenuEntryVariantInput>>;
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
  deleteMenuEntry: Maybe<MutationDeleteMenuEntryResult>;
  updateClient: Maybe<Client>;
  updateMenuEntry: Maybe<MutationUpdateMenuEntryResult>;
};


export type MutationCreateClientArgs = {
  name: Scalars['String']['input'];
  phone: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateMenuEntryArgs = {
  data: MenuEntryInput;
};


export type MutationDeleteClientArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMenuEntryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateClientArgs = {
  data: ClientCreateOrUpdateInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateMenuEntryArgs = {
  data: MenuEntryInput;
  id: Scalars['Int']['input'];
};

export type MutationDeleteClientResult = BaseError | MutationDeleteClientSuccess | RecordNotFoundError;

export type MutationDeleteClientSuccess = {
  __typename?: 'MutationDeleteClientSuccess';
  data: Client;
};

export type MutationDeleteMenuEntryResult = BaseError | MutationDeleteMenuEntrySuccess | RecordNotFoundError;

export type MutationDeleteMenuEntrySuccess = {
  __typename?: 'MutationDeleteMenuEntrySuccess';
  data: MenuEntry;
};

export type MutationUpdateMenuEntryResult = BaseError | MutationUpdateMenuEntrySuccess | RecordNotFoundError;

export type MutationUpdateMenuEntrySuccess = {
  __typename?: 'MutationUpdateMenuEntrySuccess';
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


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: number | null, name: string | null, phone: string | null } | null };

export type UpdateClientByIdMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: ClientCreateOrUpdateInput;
}>;


export type UpdateClientByIdMutation = { __typename?: 'Mutation', updateClient: { __typename?: 'Client', id: number | null, name: string | null, phone: string | null } | null };

export type DeleteClientByIdMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteClientByIdMutation = { __typename?: 'Mutation', deleteClient: { __typename?: 'BaseError' } | { __typename?: 'MutationDeleteClientSuccess', data: { __typename?: 'Client', id: number | null, name: string | null, phone: string | null } } | { __typename?: 'RecordNotFoundError', message: string | null } | null };

export type GetAllClientsQueryVariables = Exact<{
  page: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllClientsQuery = { __typename?: 'Query', getAllClients: Array<{ __typename?: 'Client', id: number | null, name: string | null, phone: string | null }> | null };

export type GetClientByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetClientByIdQuery = { __typename?: 'Query', getClientById: { __typename?: 'BaseError' } | { __typename?: 'QueryGetClientByIdSuccess', data: { __typename?: 'Client', id: number | null, name: string | null, phone: string | null } } | { __typename?: 'RecordNotFoundError', message: string | null } | null };

export type VariantFragmentFragment = { __typename?: 'MenuEntryVariant', name: string | null, description: string | null, price: number | null } & { ' $fragmentName'?: 'VariantFragmentFragment' };

export type LabelFragmentFragment = { __typename?: 'MenuEntryLabel', name: string | null, color: string | null } & { ' $fragmentName'?: 'LabelFragmentFragment' };

export type MenuEntryFragmentFragment = { __typename?: 'MenuEntry', id: number | null, name: string | null, description: string | null, labels: Array<(
    { __typename?: 'MenuEntryLabel' }
    & { ' $fragmentRefs'?: { 'LabelFragmentFragment': LabelFragmentFragment } }
  )> | null, variants: Array<(
    { __typename?: 'MenuEntryVariant' }
    & { ' $fragmentRefs'?: { 'VariantFragmentFragment': VariantFragmentFragment } }
  )> | null } & { ' $fragmentName'?: 'MenuEntryFragmentFragment' };

export type RecordNotFoundErrorFragmentFragment = { __typename?: 'RecordNotFoundError', message: string | null } & { ' $fragmentName'?: 'RecordNotFoundErrorFragmentFragment' };

export type BaseErrorFragmentFragment = { __typename?: 'BaseError', message: string | null } & { ' $fragmentName'?: 'BaseErrorFragmentFragment' };

export type CreateMenuEntryMutationVariables = Exact<{
  data: MenuEntryInput;
}>;


export type CreateMenuEntryMutation = { __typename?: 'Mutation', createMenuEntry: (
    { __typename?: 'MenuEntry' }
    & { ' $fragmentRefs'?: { 'MenuEntryFragmentFragment': MenuEntryFragmentFragment } }
  ) | null };

export type UpdateMenuEntryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: MenuEntryInput;
}>;


export type UpdateMenuEntryMutation = { __typename?: 'Mutation', updateMenuEntry: (
    { __typename?: 'BaseError' }
    & { ' $fragmentRefs'?: { 'BaseErrorFragmentFragment': BaseErrorFragmentFragment } }
  ) | { __typename?: 'MutationUpdateMenuEntrySuccess', data: (
      { __typename?: 'MenuEntry' }
      & { ' $fragmentRefs'?: { 'MenuEntryFragmentFragment': MenuEntryFragmentFragment } }
    ) } | (
    { __typename?: 'RecordNotFoundError' }
    & { ' $fragmentRefs'?: { 'RecordNotFoundErrorFragmentFragment': RecordNotFoundErrorFragmentFragment } }
  ) | null };

export type DeleteMenuEntryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteMenuEntryMutation = { __typename?: 'Mutation', deleteMenuEntry: (
    { __typename?: 'BaseError' }
    & { ' $fragmentRefs'?: { 'BaseErrorFragmentFragment': BaseErrorFragmentFragment } }
  ) | { __typename?: 'MutationDeleteMenuEntrySuccess', data: (
      { __typename?: 'MenuEntry' }
      & { ' $fragmentRefs'?: { 'MenuEntryFragmentFragment': MenuEntryFragmentFragment } }
    ) } | (
    { __typename?: 'RecordNotFoundError' }
    & { ' $fragmentRefs'?: { 'RecordNotFoundErrorFragmentFragment': RecordNotFoundErrorFragmentFragment } }
  ) | null };

export type GetAllMenuEntriesQueryVariables = Exact<{
  page: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllMenuEntriesQuery = { __typename?: 'Query', getAllMenuEntries: Array<(
    { __typename?: 'MenuEntry' }
    & { ' $fragmentRefs'?: { 'MenuEntryFragmentFragment': MenuEntryFragmentFragment } }
  )> | null };

export type GetMenuEntryByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetMenuEntryByIdQuery = { __typename?: 'Query', getMenuEntryById: (
    { __typename?: 'BaseError' }
    & { ' $fragmentRefs'?: { 'BaseErrorFragmentFragment': BaseErrorFragmentFragment } }
  ) | { __typename?: 'QueryGetMenuEntryByIdSuccess', data: (
      { __typename?: 'MenuEntry' }
      & { ' $fragmentRefs'?: { 'MenuEntryFragmentFragment': MenuEntryFragmentFragment } }
    ) } | (
    { __typename?: 'RecordNotFoundError' }
    & { ' $fragmentRefs'?: { 'RecordNotFoundErrorFragmentFragment': RecordNotFoundErrorFragmentFragment } }
  ) | null };

export const LabelFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"labelFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<LabelFragmentFragment, unknown>;
export const VariantFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variantFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]} as unknown as DocumentNode<VariantFragmentFragment, unknown>;
export const MenuEntryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"menuEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"labelFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"variantFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"labelFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variantFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]} as unknown as DocumentNode<MenuEntryFragmentFragment, unknown>;
export const RecordNotFoundErrorFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"recordNotFoundErrorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<RecordNotFoundErrorFragmentFragment, unknown>;
export const BaseErrorFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"baseErrorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<BaseErrorFragmentFragment, unknown>;
export const CreateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<CreateClientMutation, CreateClientMutationVariables>;
export const UpdateClientByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateClientById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientCreateOrUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<UpdateClientByIdMutation, UpdateClientByIdMutationVariables>;
export const DeleteClientByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteClientById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteClientSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteClientByIdMutation, DeleteClientByIdMutationVariables>;
export const GetAllClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllClients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllClients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<GetAllClientsQuery, GetAllClientsQueryVariables>;
export const GetClientByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getClientById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getClientById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetClientByIdSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetClientByIdQuery, GetClientByIdQueryVariables>;
export const CreateMenuEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMenuEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMenuEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"menuEntryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"labelFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variantFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"menuEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"labelFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"variantFragment"}}]}}]}}]} as unknown as DocumentNode<CreateMenuEntryMutation, CreateMenuEntryMutationVariables>;
export const UpdateMenuEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMenuEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMenuEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"baseErrorFragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"recordNotFoundErrorFragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateMenuEntrySuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"menuEntryFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"labelFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variantFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"baseErrorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"recordNotFoundErrorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"menuEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"labelFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"variantFragment"}}]}}]}}]} as unknown as DocumentNode<UpdateMenuEntryMutation, UpdateMenuEntryMutationVariables>;
export const DeleteMenuEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteMenuEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMenuEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"baseErrorFragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"recordNotFoundErrorFragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteMenuEntrySuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"menuEntryFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"labelFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variantFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"baseErrorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"recordNotFoundErrorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"menuEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"labelFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"variantFragment"}}]}}]}}]} as unknown as DocumentNode<DeleteMenuEntryMutation, DeleteMenuEntryMutationVariables>;
export const GetAllMenuEntriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllMenuEntries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMenuEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"menuEntryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"labelFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variantFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"menuEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"labelFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"variantFragment"}}]}}]}}]} as unknown as DocumentNode<GetAllMenuEntriesQuery, GetAllMenuEntriesQueryVariables>;
export const GetMenuEntryByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMenuEntryById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMenuEntryById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"baseErrorFragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"recordNotFoundErrorFragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetMenuEntryByIdSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"menuEntryFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"labelFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"variantFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"baseErrorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"recordNotFoundErrorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"menuEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"labelFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"variantFragment"}}]}}]}}]} as unknown as DocumentNode<GetMenuEntryByIdQuery, GetMenuEntryByIdQueryVariables>;