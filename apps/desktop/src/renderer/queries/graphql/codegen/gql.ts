/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createClient($name: String!, $phone: String) {\n    createClient(name: $name, phone: $phone) {\n      __typename\n      id\n      name\n      phone\n    }\n  }\n": types.CreateClientDocument,
    "\n  mutation updateClientById($id: Int!, $data: UserUpdateInput!) {\n    updateClient(id: $id, data: $data) {\n      __typename\n      id\n      name\n      phone\n    }\n  }\n": types.UpdateClientByIdDocument,
    "\n  mutation deleteClientById($id: Int!) {\n    deleteClient(id: $id) {\n      ... on MutationDeleteClientSuccess {\n        data {\n          __typename\n          id\n          name\n          phone\n        }\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n    }\n  }\n": types.DeleteClientByIdDocument,
    "\n  query getAllClients($page: Int) {\n    getAllClients(page: $page) {\n      __typename\n      id\n      name\n      phone\n    }\n  }\n": types.GetAllClientsDocument,
    "\n  query getClientById($id: Int!) {\n    getClientById(id: $id) {\n      __typename\n      ... on RecordNotFoundError {\n        __typename\n        message\n      }\n\n      ... on QueryGetClientByIdSuccess {\n        __typename\n        data {\n          id\n          name\n          phone\n        }\n      }\n    }\n  }\n": types.GetClientByIdDocument,
    "\n  mutation createMenuEntry($description: String, $name: String!, $price: Float!) {\n    createMenuEntry(description: $description, name: $name, price: $price) {\n      __typename\n      id\n      description\n      name\n      price\n    }\n  }\n": types.CreateMenuEntryDocument,
    "\n  query getAllMenuEntries($page: Int) {\n    getAllMenuEntries(page: $page) {\n      __typename\n      id\n      description\n      name\n      price\n    }\n  }\n": types.GetAllMenuEntriesDocument,
    "\n  query getMenuEntryById($id: Int!) {\n    getMenuEntryById(id: $id) {\n      ... on BaseError {\n        message\n      }\n      ... on QueryGetMenuEntryByIdSuccess {\n        data {\n          __typename\n          id\n          description\n          name\n          price\n        }\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n    }\n  }\n": types.GetMenuEntryByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createClient($name: String!, $phone: String) {\n    createClient(name: $name, phone: $phone) {\n      __typename\n      id\n      name\n      phone\n    }\n  }\n"): (typeof documents)["\n  mutation createClient($name: String!, $phone: String) {\n    createClient(name: $name, phone: $phone) {\n      __typename\n      id\n      name\n      phone\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateClientById($id: Int!, $data: UserUpdateInput!) {\n    updateClient(id: $id, data: $data) {\n      __typename\n      id\n      name\n      phone\n    }\n  }\n"): (typeof documents)["\n  mutation updateClientById($id: Int!, $data: UserUpdateInput!) {\n    updateClient(id: $id, data: $data) {\n      __typename\n      id\n      name\n      phone\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteClientById($id: Int!) {\n    deleteClient(id: $id) {\n      ... on MutationDeleteClientSuccess {\n        data {\n          __typename\n          id\n          name\n          phone\n        }\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation deleteClientById($id: Int!) {\n    deleteClient(id: $id) {\n      ... on MutationDeleteClientSuccess {\n        data {\n          __typename\n          id\n          name\n          phone\n        }\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllClients($page: Int) {\n    getAllClients(page: $page) {\n      __typename\n      id\n      name\n      phone\n    }\n  }\n"): (typeof documents)["\n  query getAllClients($page: Int) {\n    getAllClients(page: $page) {\n      __typename\n      id\n      name\n      phone\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getClientById($id: Int!) {\n    getClientById(id: $id) {\n      __typename\n      ... on RecordNotFoundError {\n        __typename\n        message\n      }\n\n      ... on QueryGetClientByIdSuccess {\n        __typename\n        data {\n          id\n          name\n          phone\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getClientById($id: Int!) {\n    getClientById(id: $id) {\n      __typename\n      ... on RecordNotFoundError {\n        __typename\n        message\n      }\n\n      ... on QueryGetClientByIdSuccess {\n        __typename\n        data {\n          id\n          name\n          phone\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createMenuEntry($description: String, $name: String!, $price: Float!) {\n    createMenuEntry(description: $description, name: $name, price: $price) {\n      __typename\n      id\n      description\n      name\n      price\n    }\n  }\n"): (typeof documents)["\n  mutation createMenuEntry($description: String, $name: String!, $price: Float!) {\n    createMenuEntry(description: $description, name: $name, price: $price) {\n      __typename\n      id\n      description\n      name\n      price\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllMenuEntries($page: Int) {\n    getAllMenuEntries(page: $page) {\n      __typename\n      id\n      description\n      name\n      price\n    }\n  }\n"): (typeof documents)["\n  query getAllMenuEntries($page: Int) {\n    getAllMenuEntries(page: $page) {\n      __typename\n      id\n      description\n      name\n      price\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMenuEntryById($id: Int!) {\n    getMenuEntryById(id: $id) {\n      ... on BaseError {\n        message\n      }\n      ... on QueryGetMenuEntryByIdSuccess {\n        data {\n          __typename\n          id\n          description\n          name\n          price\n        }\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMenuEntryById($id: Int!) {\n    getMenuEntryById(id: $id) {\n      ... on BaseError {\n        message\n      }\n      ... on QueryGetMenuEntryByIdSuccess {\n        data {\n          __typename\n          id\n          description\n          name\n          price\n        }\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;