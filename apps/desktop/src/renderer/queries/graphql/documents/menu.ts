import { graphql } from '../codegen/gql'

export const createMenuEntryMutationDocument = graphql(/* GraphQL */ `
  mutation createMenuEntry($description: String, $name: String!, $price: Float!) {
    createMenuEntry(description: $description, name: $name, price: $price) {
      __typename
      id
      description
      name
      price
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
      price
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
          price
        }
      }
      ... on RecordNotFoundError {
        message
      }
    }
  }
`)
