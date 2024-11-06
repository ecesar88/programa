import { graphql } from '../codegen/gql'

graphql(/* GraphQL */ `
  fragment variant on MenuEntryVariant {
    __typename
    id
    name
    description
    price
  }

  fragment label on MenuEntryLabel {
    __typename
    name
    color
  }

  fragment menuEntry on MenuEntry {
    __typename
    id
    name
    description
    labels {
      ...label
    }
    variant {
      ...variant
    }
  }
`)

export const createMenuEntryMutationDocument = graphql(/* GraphQL */ `
  mutation createMenuEntry(
    $name: String!
    $description: String
    $variant: [MenuEntryVariantInput!]
  ) {
    createMenuEntry(name: $name, description: $description, variant: $variant) {
      ...menuEntry
    }
  }
`)

// export const updateClientMutationDocument = graphql(/* GraphQL */ `
//   mutation updateClientById($id: Int!, $data: UserUpdateInput!) {
//     updateClient(id: $id, data: $data) {
//       __typename
//       id
//       name
//       phone
//     }
//   }
// `)

export const deleteMenuEntryByIdMutationDocument = graphql(/* GraphQL */ `
  mutation deleteMenuEntryById($id: Int!) {
    deleteMenuEntryById(id: $id) {
      ... on BaseError {
        message
      }

      ... on MutationDeleteMenuEntryByIdSuccess {
        data {
          ...menuEntry
        }
      }

      ... on RecordNotFoundError {
        message
      }
    }
  }
`)

export const getAllMenuEntriesQueryDocument = graphql(/* GraphQL */ `
  query getAllMenuEntries($page: Int) {
    getAllMenuEntries(page: $page) {
      ...menuEntry
    }
  }
`)

export const getMenuEntryByIdQueryDocument = graphql(/* GraphQL */ `
  query getMenuEntryById($id: Int!) {
    getMenuEntryById(id: $id) {
      ... on BaseError {
        message
      }

      ... on QueryGetMenuEntryByIdSuccess {
        data {
          ...menuEntry
        }
      }

      ... on RecordNotFoundError {
        message
      }
    }
  }
`)
