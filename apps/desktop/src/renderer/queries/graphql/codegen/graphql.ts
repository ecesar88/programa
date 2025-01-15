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
  message?: Maybe<Scalars['String']['output']>;
};

/** A client/customer on the application */
export type Client = {
  __typename?: 'Client';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type ClientCreateOrUpdateInput = {
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Error = {
  message?: Maybe<Scalars['String']['output']>;
};

export type LengthError = Error & {
  __typename?: 'LengthError';
  message?: Maybe<Scalars['String']['output']>;
  minLength?: Maybe<Scalars['Int']['output']>;
};

/** An entry on the menu */
export type MenuEntry = {
  __typename?: 'MenuEntry';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  labels?: Maybe<Array<MenuEntryLabel>>;
  name?: Maybe<Scalars['String']['output']>;
  variants?: Maybe<Array<MenuEntryVariant>>;
};

/** The category of a specific MenuEntry. This can be used to sort products by type, such as drinks, meats, grains, etc */
export type MenuEntryCategory = {
  __typename?: 'MenuEntryCategory';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type MenuEntryCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Input to create a new MenuEntry */
export type MenuEntryInput = {
  categories?: InputMaybe<Array<MenuEntryCategoryInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  labels?: InputMaybe<Array<MenuEntryLabelInput>>;
  name: Scalars['String']['input'];
  variants?: InputMaybe<Array<MenuEntryVariantInput>>;
};

/** A label on the MenuEntryObject type. This can be used to categorize MenuEntries with different labels. */
export type MenuEntryLabel = {
  __typename?: 'MenuEntryLabel';
  color?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type MenuEntryLabelInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** A variant on the MenuEntry, this can be a different sized or flavored product */
export type MenuEntryVariant = {
  __typename?: 'MenuEntryVariant';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

export type MenuEntryVariantInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createClient?: Maybe<Client>;
  createMenuEntry?: Maybe<MenuEntry>;
  createOrUpdateMenuEntryLabel?: Maybe<MutationCreateOrUpdateMenuEntryLabelResult>;
  deleteClient?: Maybe<MutationDeleteClientResult>;
  deleteMenuEntry?: Maybe<MutationDeleteMenuEntryResult>;
  deleteMenuEntryLabel?: Maybe<MutationDeleteMenuEntryLabelResult>;
  updateClient?: Maybe<Client>;
  updateMenuEntry?: Maybe<MutationUpdateMenuEntryResult>;
};


export type MutationCreateClientArgs = {
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateMenuEntryArgs = {
  data: MenuEntryInput;
};


export type MutationCreateOrUpdateMenuEntryLabelArgs = {
  data: MenuEntryLabelInput;
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteClientArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMenuEntryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMenuEntryLabelArgs = {
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

export type MutationCreateOrUpdateMenuEntryLabelResult = BaseError | LengthError | MutationCreateOrUpdateMenuEntryLabelSuccess | RecordNotFoundError;

export type MutationCreateOrUpdateMenuEntryLabelSuccess = {
  __typename?: 'MutationCreateOrUpdateMenuEntryLabelSuccess';
  data: MenuEntryLabel;
};

export type MutationDeleteClientResult = BaseError | LengthError | MutationDeleteClientSuccess | RecordNotFoundError;

export type MutationDeleteClientSuccess = {
  __typename?: 'MutationDeleteClientSuccess';
  data: Client;
};

export type MutationDeleteMenuEntryLabelResult = BaseError | LengthError | MutationDeleteMenuEntryLabelSuccess | RecordNotFoundError;

export type MutationDeleteMenuEntryLabelSuccess = {
  __typename?: 'MutationDeleteMenuEntryLabelSuccess';
  data: MenuEntryLabel;
};

export type MutationDeleteMenuEntryResult = BaseError | LengthError | MutationDeleteMenuEntrySuccess | RecordNotFoundError;

export type MutationDeleteMenuEntrySuccess = {
  __typename?: 'MutationDeleteMenuEntrySuccess';
  data: MenuEntry;
};

export type MutationUpdateMenuEntryResult = BaseError | LengthError | MutationUpdateMenuEntrySuccess | RecordNotFoundError;

export type MutationUpdateMenuEntrySuccess = {
  __typename?: 'MutationUpdateMenuEntrySuccess';
  data: MenuEntry;
};

export type Query = {
  __typename?: 'Query';
  getAllClients?: Maybe<Array<Client>>;
  getAllMenuEntries?: Maybe<Array<MenuEntry>>;
  getAllMenuEntryLabels?: Maybe<Array<MenuEntryLabel>>;
  getClientById?: Maybe<QueryGetClientByIdResult>;
  getMenuEntryById?: Maybe<QueryGetMenuEntryByIdResult>;
  searchClients?: Maybe<Array<Client>>;
};


export type QueryGetAllClientsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllMenuEntriesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllMenuEntryLabelsArgs = {
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

export type QueryGetClientByIdResult = BaseError | LengthError | QueryGetClientByIdSuccess | RecordNotFoundError;

export type QueryGetClientByIdSuccess = {
  __typename?: 'QueryGetClientByIdSuccess';
  data: Client;
};

export type QueryGetMenuEntryByIdResult = BaseError | LengthError | QueryGetMenuEntryByIdSuccess | RecordNotFoundError;

export type QueryGetMenuEntryByIdSuccess = {
  __typename?: 'QueryGetMenuEntryByIdSuccess';
  data: MenuEntry;
};

export type RecordNotFoundError = Error & {
  __typename?: 'RecordNotFoundError';
  message?: Maybe<Scalars['String']['output']>;
};

export type ClientFragmentFragment = { __typename?: 'Client', id?: number | null, name?: string | null, phone?: string | null } & { ' $fragmentName'?: 'ClientFragmentFragment' };

export type CreateClientMutationVariables = Exact<{
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient?: (
    { __typename?: 'Client' }
    & { ' $fragmentRefs'?: { 'ClientFragmentFragment': ClientFragmentFragment } }
  ) | null };

export type UpdateClientByIdMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: ClientCreateOrUpdateInput;
}>;


export type UpdateClientByIdMutation = { __typename?: 'Mutation', updateClient?: (
    { __typename?: 'Client' }
    & { ' $fragmentRefs'?: { 'ClientFragmentFragment': ClientFragmentFragment } }
  ) | null };

export type DeleteClientByIdMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteClientByIdMutation = { __typename?: 'Mutation', deleteClient?: { __typename?: 'BaseError' } | { __typename?: 'LengthError' } | { __typename?: 'MutationDeleteClientSuccess', data: (
      { __typename?: 'Client' }
      & { ' $fragmentRefs'?: { 'ClientFragmentFragment': ClientFragmentFragment } }
    ) } | { __typename?: 'RecordNotFoundError', message?: string | null } | null };

export type GetAllClientsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllClientsQuery = { __typename?: 'Query', getAllClients?: Array<(
    { __typename?: 'Client' }
    & { ' $fragmentRefs'?: { 'ClientFragmentFragment': ClientFragmentFragment } }
  )> | null };

export type GetClientByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetClientByIdQuery = { __typename?: 'Query', getClientById?: { __typename?: 'BaseError' } | { __typename?: 'LengthError' } | { __typename?: 'QueryGetClientByIdSuccess', data: (
      { __typename?: 'Client' }
      & { ' $fragmentRefs'?: { 'ClientFragmentFragment': ClientFragmentFragment } }
    ) } | { __typename?: 'RecordNotFoundError', message?: string | null } | null };

export type MenuEntryVariant_FragmentFragment = { __typename?: 'MenuEntryVariant', name?: string | null, description?: string | null, price?: number | null } & { ' $fragmentName'?: 'MenuEntryVariant_FragmentFragment' };

export type MenuEntryLabel_FragmentFragment = { __typename?: 'MenuEntryLabel', id?: number | null, name?: string | null, color?: string | null } & { ' $fragmentName'?: 'MenuEntryLabel_FragmentFragment' };

export type MenuEntry_FragmentFragment = { __typename?: 'MenuEntry', id?: number | null, name?: string | null, description?: string | null, labels?: Array<(
    { __typename?: 'MenuEntryLabel' }
    & { ' $fragmentRefs'?: { 'MenuEntryLabel_FragmentFragment': MenuEntryLabel_FragmentFragment } }
  )> | null, variants?: Array<(
    { __typename?: 'MenuEntryVariant' }
    & { ' $fragmentRefs'?: { 'MenuEntryVariant_FragmentFragment': MenuEntryVariant_FragmentFragment } }
  )> | null } & { ' $fragmentName'?: 'MenuEntry_FragmentFragment' };

export type RecordNotFoundError_FragmentFragment = { __typename: 'RecordNotFoundError', message?: string | null } & { ' $fragmentName'?: 'RecordNotFoundError_FragmentFragment' };

export type BaseError_FragmentFragment = { __typename: 'BaseError', message?: string | null } & { ' $fragmentName'?: 'BaseError_FragmentFragment' };

export type CreateMenuEntryMutationVariables = Exact<{
  data: MenuEntryInput;
}>;


export type CreateMenuEntryMutation = { __typename?: 'Mutation', createMenuEntry?: (
    { __typename?: 'MenuEntry' }
    & { ' $fragmentRefs'?: { 'MenuEntry_FragmentFragment': MenuEntry_FragmentFragment } }
  ) | null };

export type UpdateMenuEntryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: MenuEntryInput;
}>;


export type UpdateMenuEntryMutation = { __typename?: 'Mutation', updateMenuEntry?: (
    { __typename?: 'BaseError' }
    & { ' $fragmentRefs'?: { 'BaseError_FragmentFragment': BaseError_FragmentFragment } }
  ) | { __typename?: 'LengthError' } | { __typename?: 'MutationUpdateMenuEntrySuccess', data: (
      { __typename?: 'MenuEntry' }
      & { ' $fragmentRefs'?: { 'MenuEntry_FragmentFragment': MenuEntry_FragmentFragment } }
    ) } | (
    { __typename?: 'RecordNotFoundError' }
    & { ' $fragmentRefs'?: { 'RecordNotFoundError_FragmentFragment': RecordNotFoundError_FragmentFragment } }
  ) | null };

export type DeleteMenuEntryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteMenuEntryMutation = { __typename?: 'Mutation', deleteMenuEntry?: (
    { __typename?: 'BaseError' }
    & { ' $fragmentRefs'?: { 'BaseError_FragmentFragment': BaseError_FragmentFragment } }
  ) | { __typename?: 'LengthError' } | { __typename?: 'MutationDeleteMenuEntrySuccess', data: (
      { __typename?: 'MenuEntry' }
      & { ' $fragmentRefs'?: { 'MenuEntry_FragmentFragment': MenuEntry_FragmentFragment } }
    ) } | (
    { __typename?: 'RecordNotFoundError' }
    & { ' $fragmentRefs'?: { 'RecordNotFoundError_FragmentFragment': RecordNotFoundError_FragmentFragment } }
  ) | null };

export type GetAllMenuEntriesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllMenuEntriesQuery = { __typename?: 'Query', getAllMenuEntries?: Array<(
    { __typename?: 'MenuEntry' }
    & { ' $fragmentRefs'?: { 'MenuEntry_FragmentFragment': MenuEntry_FragmentFragment } }
  )> | null };

export type GetAllMenuEntryLabelsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllMenuEntryLabelsQuery = { __typename?: 'Query', getAllMenuEntryLabels?: Array<(
    { __typename?: 'MenuEntryLabel' }
    & { ' $fragmentRefs'?: { 'MenuEntryLabel_FragmentFragment': MenuEntryLabel_FragmentFragment } }
  )> | null };

export type CreateOrUpdateMenuEntryLabelMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  data: MenuEntryLabelInput;
}>;


export type CreateOrUpdateMenuEntryLabelMutation = { __typename?: 'Mutation', createOrUpdateMenuEntryLabel?: (
    { __typename?: 'BaseError' }
    & { ' $fragmentRefs'?: { 'BaseError_FragmentFragment': BaseError_FragmentFragment } }
  ) | { __typename?: 'LengthError' } | { __typename?: 'MutationCreateOrUpdateMenuEntryLabelSuccess', data: (
      { __typename?: 'MenuEntryLabel' }
      & { ' $fragmentRefs'?: { 'MenuEntryLabel_FragmentFragment': MenuEntryLabel_FragmentFragment } }
    ) } | (
    { __typename?: 'RecordNotFoundError' }
    & { ' $fragmentRefs'?: { 'RecordNotFoundError_FragmentFragment': RecordNotFoundError_FragmentFragment } }
  ) | null };

export type GetMenuEntryByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetMenuEntryByIdQuery = { __typename?: 'Query', getMenuEntryById?: (
    { __typename?: 'BaseError' }
    & { ' $fragmentRefs'?: { 'BaseError_FragmentFragment': BaseError_FragmentFragment } }
  ) | { __typename?: 'LengthError' } | { __typename?: 'QueryGetMenuEntryByIdSuccess', data: (
      { __typename?: 'MenuEntry' }
      & { ' $fragmentRefs'?: { 'MenuEntry_FragmentFragment': MenuEntry_FragmentFragment } }
    ) } | (
    { __typename?: 'RecordNotFoundError' }
    & { ' $fragmentRefs'?: { 'RecordNotFoundError_FragmentFragment': RecordNotFoundError_FragmentFragment } }
  ) | null };

export type DeleteMenuEntryLabelMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteMenuEntryLabelMutation = { __typename?: 'Mutation', deleteMenuEntryLabel?: { __typename?: 'BaseError', message?: string | null } | { __typename?: 'LengthError' } | { __typename?: 'MutationDeleteMenuEntryLabelSuccess', data: { __typename?: 'MenuEntryLabel', id?: number | null, name?: string | null, color?: string | null } } | { __typename?: 'RecordNotFoundError', message?: string | null } | null };

export const ClientFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"clientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]} as unknown as DocumentNode<ClientFragmentFragment, unknown>;
export const MenuEntryLabel_FragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<MenuEntryLabel_FragmentFragment, unknown>;
export const MenuEntryVariant_FragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]} as unknown as DocumentNode<MenuEntryVariant_FragmentFragment, unknown>;
export const MenuEntry_FragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntry_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]} as unknown as DocumentNode<MenuEntry_FragmentFragment, unknown>;
export const RecordNotFoundError_FragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecordNotFoundError_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<RecordNotFoundError_FragmentFragment, unknown>;
export const BaseError_FragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseError_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<BaseError_FragmentFragment, unknown>;
export const CreateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"clientFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"clientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]} as unknown as DocumentNode<CreateClientMutation, CreateClientMutationVariables>;
export const UpdateClientByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateClientById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientCreateOrUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"clientFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"clientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]} as unknown as DocumentNode<UpdateClientByIdMutation, UpdateClientByIdMutationVariables>;
export const DeleteClientByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteClientById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteClientSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"clientFragment"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"clientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]} as unknown as DocumentNode<DeleteClientByIdMutation, DeleteClientByIdMutationVariables>;
export const GetAllClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllClients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllClients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"clientFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"clientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]} as unknown as DocumentNode<GetAllClientsQuery, GetAllClientsQueryVariables>;
export const GetClientByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getClientById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getClientById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetClientByIdSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"clientFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"clientFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]} as unknown as DocumentNode<GetClientByIdQuery, GetClientByIdQueryVariables>;
export const CreateMenuEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMenuEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMenuEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntry_Fragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntry_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"}}]}}]}}]} as unknown as DocumentNode<CreateMenuEntryMutation, CreateMenuEntryMutationVariables>;
export const UpdateMenuEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMenuEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMenuEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseError_Fragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecordNotFoundError_Fragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateMenuEntrySuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntry_Fragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseError_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecordNotFoundError_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntry_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"}}]}}]}}]} as unknown as DocumentNode<UpdateMenuEntryMutation, UpdateMenuEntryMutationVariables>;
export const DeleteMenuEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteMenuEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMenuEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseError_Fragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecordNotFoundError_Fragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteMenuEntrySuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntry_Fragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseError_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecordNotFoundError_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntry_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"}}]}}]}}]} as unknown as DocumentNode<DeleteMenuEntryMutation, DeleteMenuEntryMutationVariables>;
export const GetAllMenuEntriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllMenuEntries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMenuEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntry_Fragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntry_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"}}]}}]}}]} as unknown as DocumentNode<GetAllMenuEntriesQuery, GetAllMenuEntriesQueryVariables>;
export const GetAllMenuEntryLabelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllMenuEntryLabels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMenuEntryLabels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<GetAllMenuEntryLabelsQuery, GetAllMenuEntryLabelsQueryVariables>;
export const CreateOrUpdateMenuEntryLabelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOrUpdateMenuEntryLabel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrUpdateMenuEntryLabel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseError_Fragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecordNotFoundError_Fragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateOrUpdateMenuEntryLabelSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseError_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecordNotFoundError_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<CreateOrUpdateMenuEntryLabelMutation, CreateOrUpdateMenuEntryLabelMutationVariables>;
export const GetMenuEntryByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMenuEntryById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMenuEntryById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseError_Fragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecordNotFoundError_Fragment"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryGetMenuEntryByIdSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntry_Fragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryLabel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntryVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseError_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecordNotFoundError_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MenuEntry_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MenuEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryLabel_Fragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MenuEntryVariant_Fragment"}}]}}]}}]} as unknown as DocumentNode<GetMenuEntryByIdQuery, GetMenuEntryByIdQueryVariables>;
export const DeleteMenuEntryLabelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteMenuEntryLabel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMenuEntryLabel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteMenuEntryLabelSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteMenuEntryLabelMutation, DeleteMenuEntryLabelMutationVariables>;