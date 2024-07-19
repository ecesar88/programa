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


