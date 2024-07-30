import { graphql } from '../codegen/gql'

export const createClientMutationDocument = graphql(/* GraphQL */ `
  mutation createClient($name: String!, $phone: String) {
    createClient(name: $name, phone: $phone) {
      __typename
      id
      name
      phone
    }
  }
`)

export const updateClientMutationDocument = graphql(/* GraphQL */ `
  mutation updateClientById($id: Int!, $data: UserUpdateInput!) {
    updateClient(id: $id, data: $data) {
      __typename
      id
      name
      phone
    }
  }
`)

export const deleteClientByIdMutationDocument = graphql(/* GraphQL */ `
  mutation deleteClientById($id: Int!) {
    deleteClient(id: $id) {
      ... on MutationDeleteClientSuccess {
        data {
          __typename
          id
          name
          phone
        }
      }
      ... on RecordNotFoundError {
        message
      }
    }
  }
`)

export const getAllClientsQueryDocument = graphql(/* GraphQL */ `
  query getAllClients($page: Int) {
    getAllClients(page: $page) {
      __typename
      id
      name
      phone
    }
  }
`)

export const getClientByIdQueryDocument = graphql(/* GraphQL */ `
  query getClientById($id: Int!) {
    getClientById(id: $id) {
      __typename
      ... on RecordNotFoundError {
        __typename
        message
      }

      ... on QueryGetClientByIdSuccess {
        __typename
        data {
          id
          name
          phone
        }
      }
    }
  }
`)
