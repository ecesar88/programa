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
    "\n  fragment clientFragment on Client {\n    id\n    name\n    phone\n  }\n": types.ClientFragmentFragmentDoc,
    "\n  mutation createClient($name: String!, $phone: String) {\n    createClient(name: $name, phone: $phone) {\n      ...clientFragment\n    }\n  }\n": types.CreateClientDocument,
    "\n  mutation updateClientById($id: Int!, $data: ClientCreateOrUpdateInput!) {\n    updateClient(id: $id, data: $data) {\n      ...clientFragment\n    }\n  }\n": types.UpdateClientByIdDocument,
    "\n  mutation deleteClientById($id: Int!) {\n    deleteClient(id: $id) {\n      ... on MutationDeleteClientSuccess {\n        data {\n          ...clientFragment\n        }\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n    }\n  }\n": types.DeleteClientByIdDocument,
    "\n  query getAllClients($page: Int) {\n    getAllClients(page: $page) {\n      ...clientFragment\n    }\n  }\n": types.GetAllClientsDocument,
    "\n  query getClientById($id: Int!) {\n    getClientById(id: $id) {\n      ... on RecordNotFoundError {\n        message\n      }\n\n      ... on QueryGetClientByIdSuccess {\n        data {\n          ...clientFragment\n        }\n      }\n    }\n  }\n": types.GetClientByIdDocument,
    "\n  fragment MenuEntryVariant_Fragment on MenuEntryVariant {\n    name\n    description\n    price\n  }\n": types.MenuEntryVariant_FragmentFragmentDoc,
    "\n  fragment MenuEntryLabel_Fragment on MenuEntryLabel {\n    id\n    name\n    color\n  }\n": types.MenuEntryLabel_FragmentFragmentDoc,
    "\n  fragment MenuEntry_Fragment on MenuEntry {\n    id\n    name\n    description\n    labels {\n      ...MenuEntryLabel_Fragment\n    }\n    variants {\n      ...MenuEntryVariant_Fragment\n    }\n  }\n": types.MenuEntry_FragmentFragmentDoc,
    "\n  fragment RecordNotFoundError_Fragment on RecordNotFoundError {\n    __typename\n    message\n  }\n": types.RecordNotFoundError_FragmentFragmentDoc,
    "\n  fragment BaseError_Fragment on BaseError {\n    __typename\n    message\n  }\n": types.BaseError_FragmentFragmentDoc,
    "\n  mutation createMenuEntry($data: MenuEntryInput!) {\n    createMenuEntry(data: $data) {\n      ...MenuEntry_Fragment\n    }\n  }\n": types.CreateMenuEntryDocument,
    "\n  mutation updateMenuEntry($id: Int!, $data: MenuEntryInput!) {\n    updateMenuEntry(id: $id, data: $data) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on MutationUpdateMenuEntrySuccess {\n        data {\n          ...MenuEntry_Fragment\n        }\n      }\n    }\n  }\n": types.UpdateMenuEntryDocument,
    "\n  mutation deleteMenuEntry($id: Int!) {\n    deleteMenuEntry(id: $id) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on MutationDeleteMenuEntrySuccess {\n        data {\n          ...MenuEntry_Fragment\n        }\n      }\n    }\n  }\n": types.DeleteMenuEntryDocument,
    "\n  query getAllMenuEntries($page: Int) {\n    getAllMenuEntries(page: $page) {\n      ...MenuEntry_Fragment\n    }\n  }\n": types.GetAllMenuEntriesDocument,
    "\n  query getAllMenuEntryLabels($page: Int) {\n    getAllMenuEntryLabels(page: $page) {\n      ...MenuEntryLabel_Fragment\n    }\n  }\n": types.GetAllMenuEntryLabelsDocument,
    "\n  mutation createOrUpdateMenuEntryLabel($id: Int, $data: MenuEntryLabelInput!) {\n    createOrUpdateMenuEntryLabel(id: $id, data: $data) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on MutationCreateOrUpdateMenuEntryLabelSuccess {\n        data {\n          ...MenuEntryLabel_Fragment\n        }\n      }\n    }\n  }\n": types.CreateOrUpdateMenuEntryLabelDocument,
    "\n  query getMenuEntryById($id: Int!) {\n    getMenuEntryById(id: $id) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on QueryGetMenuEntryByIdSuccess {\n        data {\n          ...MenuEntry_Fragment\n        }\n      }\n    }\n  }\n": types.GetMenuEntryByIdDocument,
    "\n  mutation deleteMenuEntryLabel($id: Int!) {\n    deleteMenuEntryLabel(id: $id) {\n      ... on BaseError {\n        message\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n      ... on MutationDeleteMenuEntryLabelSuccess {\n        data {\n          id\n          name\n          color\n        }\n      }\n    }\n  }\n": types.DeleteMenuEntryLabelDocument,
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
export function graphql(source: "\n  fragment clientFragment on Client {\n    id\n    name\n    phone\n  }\n"): (typeof documents)["\n  fragment clientFragment on Client {\n    id\n    name\n    phone\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createClient($name: String!, $phone: String) {\n    createClient(name: $name, phone: $phone) {\n      ...clientFragment\n    }\n  }\n"): (typeof documents)["\n  mutation createClient($name: String!, $phone: String) {\n    createClient(name: $name, phone: $phone) {\n      ...clientFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateClientById($id: Int!, $data: ClientCreateOrUpdateInput!) {\n    updateClient(id: $id, data: $data) {\n      ...clientFragment\n    }\n  }\n"): (typeof documents)["\n  mutation updateClientById($id: Int!, $data: ClientCreateOrUpdateInput!) {\n    updateClient(id: $id, data: $data) {\n      ...clientFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteClientById($id: Int!) {\n    deleteClient(id: $id) {\n      ... on MutationDeleteClientSuccess {\n        data {\n          ...clientFragment\n        }\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation deleteClientById($id: Int!) {\n    deleteClient(id: $id) {\n      ... on MutationDeleteClientSuccess {\n        data {\n          ...clientFragment\n        }\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllClients($page: Int) {\n    getAllClients(page: $page) {\n      ...clientFragment\n    }\n  }\n"): (typeof documents)["\n  query getAllClients($page: Int) {\n    getAllClients(page: $page) {\n      ...clientFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getClientById($id: Int!) {\n    getClientById(id: $id) {\n      ... on RecordNotFoundError {\n        message\n      }\n\n      ... on QueryGetClientByIdSuccess {\n        data {\n          ...clientFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getClientById($id: Int!) {\n    getClientById(id: $id) {\n      ... on RecordNotFoundError {\n        message\n      }\n\n      ... on QueryGetClientByIdSuccess {\n        data {\n          ...clientFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MenuEntryVariant_Fragment on MenuEntryVariant {\n    name\n    description\n    price\n  }\n"): (typeof documents)["\n  fragment MenuEntryVariant_Fragment on MenuEntryVariant {\n    name\n    description\n    price\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MenuEntryLabel_Fragment on MenuEntryLabel {\n    id\n    name\n    color\n  }\n"): (typeof documents)["\n  fragment MenuEntryLabel_Fragment on MenuEntryLabel {\n    id\n    name\n    color\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MenuEntry_Fragment on MenuEntry {\n    id\n    name\n    description\n    labels {\n      ...MenuEntryLabel_Fragment\n    }\n    variants {\n      ...MenuEntryVariant_Fragment\n    }\n  }\n"): (typeof documents)["\n  fragment MenuEntry_Fragment on MenuEntry {\n    id\n    name\n    description\n    labels {\n      ...MenuEntryLabel_Fragment\n    }\n    variants {\n      ...MenuEntryVariant_Fragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RecordNotFoundError_Fragment on RecordNotFoundError {\n    __typename\n    message\n  }\n"): (typeof documents)["\n  fragment RecordNotFoundError_Fragment on RecordNotFoundError {\n    __typename\n    message\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BaseError_Fragment on BaseError {\n    __typename\n    message\n  }\n"): (typeof documents)["\n  fragment BaseError_Fragment on BaseError {\n    __typename\n    message\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createMenuEntry($data: MenuEntryInput!) {\n    createMenuEntry(data: $data) {\n      ...MenuEntry_Fragment\n    }\n  }\n"): (typeof documents)["\n  mutation createMenuEntry($data: MenuEntryInput!) {\n    createMenuEntry(data: $data) {\n      ...MenuEntry_Fragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateMenuEntry($id: Int!, $data: MenuEntryInput!) {\n    updateMenuEntry(id: $id, data: $data) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on MutationUpdateMenuEntrySuccess {\n        data {\n          ...MenuEntry_Fragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateMenuEntry($id: Int!, $data: MenuEntryInput!) {\n    updateMenuEntry(id: $id, data: $data) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on MutationUpdateMenuEntrySuccess {\n        data {\n          ...MenuEntry_Fragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteMenuEntry($id: Int!) {\n    deleteMenuEntry(id: $id) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on MutationDeleteMenuEntrySuccess {\n        data {\n          ...MenuEntry_Fragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation deleteMenuEntry($id: Int!) {\n    deleteMenuEntry(id: $id) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on MutationDeleteMenuEntrySuccess {\n        data {\n          ...MenuEntry_Fragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllMenuEntries($page: Int) {\n    getAllMenuEntries(page: $page) {\n      ...MenuEntry_Fragment\n    }\n  }\n"): (typeof documents)["\n  query getAllMenuEntries($page: Int) {\n    getAllMenuEntries(page: $page) {\n      ...MenuEntry_Fragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllMenuEntryLabels($page: Int) {\n    getAllMenuEntryLabels(page: $page) {\n      ...MenuEntryLabel_Fragment\n    }\n  }\n"): (typeof documents)["\n  query getAllMenuEntryLabels($page: Int) {\n    getAllMenuEntryLabels(page: $page) {\n      ...MenuEntryLabel_Fragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createOrUpdateMenuEntryLabel($id: Int, $data: MenuEntryLabelInput!) {\n    createOrUpdateMenuEntryLabel(id: $id, data: $data) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on MutationCreateOrUpdateMenuEntryLabelSuccess {\n        data {\n          ...MenuEntryLabel_Fragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createOrUpdateMenuEntryLabel($id: Int, $data: MenuEntryLabelInput!) {\n    createOrUpdateMenuEntryLabel(id: $id, data: $data) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on MutationCreateOrUpdateMenuEntryLabelSuccess {\n        data {\n          ...MenuEntryLabel_Fragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMenuEntryById($id: Int!) {\n    getMenuEntryById(id: $id) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on QueryGetMenuEntryByIdSuccess {\n        data {\n          ...MenuEntry_Fragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMenuEntryById($id: Int!) {\n    getMenuEntryById(id: $id) {\n      ... on BaseError {\n        ...BaseError_Fragment\n      }\n\n      ... on RecordNotFoundError {\n        ...RecordNotFoundError_Fragment\n      }\n\n      ... on QueryGetMenuEntryByIdSuccess {\n        data {\n          ...MenuEntry_Fragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteMenuEntryLabel($id: Int!) {\n    deleteMenuEntryLabel(id: $id) {\n      ... on BaseError {\n        message\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n      ... on MutationDeleteMenuEntryLabelSuccess {\n        data {\n          id\n          name\n          color\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation deleteMenuEntryLabel($id: Int!) {\n    deleteMenuEntryLabel(id: $id) {\n      ... on BaseError {\n        message\n      }\n      ... on RecordNotFoundError {\n        message\n      }\n      ... on MutationDeleteMenuEntryLabelSuccess {\n        data {\n          id\n          name\n          color\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;