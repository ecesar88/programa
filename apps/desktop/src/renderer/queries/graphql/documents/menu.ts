import { graphql } from '../codegen/gql'

graphql(/* GraphQL */ `
  fragment variant on MenuEntryVariant {
    __typename
    name
    description
    price
  }

  fragment label on MenuEntryLabel {
    __typename
    name
    color
  }
`)

export const createMenuEntryMutationDocument = graphql(/* GraphQL */ `
  mutation createMenuEntry(
    $name: String!
    $description: String
    $variant: [MenuEntryVariantInput!]
  ) {
    createMenuEntry(name: $name, description: $description, variant: $variant) {
      __typename
      id
      description
      name
      variant {
        ...variant
      }
      labels {
        ...label
      }
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

// export const deleteClientByIdMutationDocument = graphql(/* GraphQL */ `
//   mutation deleteClientById($id: Int!) {
//     deleteClient(id: $id) {
//       __typename
//       id
//       name
//       phone
//     }
//   }
// `)

export const getAllMenuEntriesQueryDocument = graphql(/* GraphQL */ `
  query getAllMenuEntries($page: Int) {
    getAllMenuEntries(page: $page) {
      __typename
      id
      description
      name
      variant {
        ...variant
      }
      labels {
        ...label
      }
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
          __typename
          id
          description
          name
          variant {
            ...variant
          }
        }
      }
      ... on RecordNotFoundError {
        message
      }
    }
  }
`)
