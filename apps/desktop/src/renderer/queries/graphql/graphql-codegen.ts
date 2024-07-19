import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type BaseError = Error & {
  __typename?: 'BaseError';
  message?: Maybe<Scalars['String']['output']>;
};

/** Long necks, cool patterns, taller than you. */
export type Client = {
  __typename?: 'Client';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type Error = {
  message?: Maybe<Scalars['String']['output']>;
};

export type LengthError = Error & {
  __typename?: 'LengthError';
  message?: Maybe<Scalars['String']['output']>;
  minLength?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createClient?: Maybe<Client>;
  deleteClient?: Maybe<Client>;
  updateClient?: Maybe<Client>;
};


export type MutationCreateClientArgs = {
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteClientArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateClientArgs = {
  data: UserUpdateInput;
  id: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllClients?: Maybe<Client>;
  getClientById?: Maybe<QueryGetClientByIdResult>;
};


export type QueryGetAllClientsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetClientByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetClientByIdResult = BaseError | QueryGetClientByIdSuccess | RecordNotFoundError;

export type QueryGetClientByIdSuccess = {
  __typename?: 'QueryGetClientByIdSuccess';
  data: Client;
};

export type RecordNotFoundError = Error & {
  __typename?: 'RecordNotFoundError';
  message?: Maybe<Scalars['String']['output']>;
};

export type UserUpdateInput = {
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type GetAllClientsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
}>;


export type GetAllClientsQuery = { __typename?: 'Query', getAllClients?: { __typename: 'Client', id?: number | null, name?: string | null, phone?: string | null } | null };


export const GetAllClientsDocument = gql`
    query getAllClients($page: Int!) {
  getAllClients(page: $page) {
    __typename
    id
    name
    phone
  }
}
    `;

/**
 * __useGetAllClientsQuery__
 *
 * To run a query within a React component, call `useGetAllClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllClientsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllClientsQuery(baseOptions: Apollo.QueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables> & ({ variables: GetAllClientsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
      }
export function useGetAllClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
        }
export function useGetAllClientsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
        }
export type GetAllClientsQueryHookResult = ReturnType<typeof useGetAllClientsQuery>;
export type GetAllClientsLazyQueryHookResult = ReturnType<typeof useGetAllClientsLazyQuery>;
export type GetAllClientsSuspenseQueryHookResult = ReturnType<typeof useGetAllClientsSuspenseQuery>;
export type GetAllClientsQueryResult = Apollo.QueryResult<GetAllClientsQuery, GetAllClientsQueryVariables>;