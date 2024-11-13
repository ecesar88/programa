import { graphql } from '../codegen/gql'

export const createClientMutationDocument = graphql(/* GraphQL */ `
  mutation createClient($name: String!, $phone: String) {
    createClient(name: $name, phone: $phone) {
      id
      name
      phone
    }
  }
`)

export const updateClientMutationDocument = graphql(/* GraphQL */ `
  mutation updateClientById($id: Int!, $data: ClientCreateOrUpdateInput!) {
    updateClient(id: $id, data: $data) {
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
      id
      name
      phone
    }
  }
`)

export const getClientByIdQueryDocument = graphql(/* GraphQL */ `
  query getClientById($id: Int!) {
    getClientById(id: $id) {
      ... on RecordNotFoundError {
        message
      }

      ... on QueryGetClientByIdSuccess {
        data {
          id
          name
          phone
        }
      }
    }
  }
`)
