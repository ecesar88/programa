import { graphql } from '../codegen/gql'

graphql(/* GraphQL */ `
  fragment clientFragment on Client {
    id
    name
    phone
  }
`)

export const createClientMutationDocument = graphql(/* GraphQL */ `
  mutation createClient($name: String!, $phone: String) {
    createClient(name: $name, phone: $phone) {
      ...clientFragment
    }
  }
`)

export const updateClientMutationDocument = graphql(/* GraphQL */ `
  mutation updateClientById($id: Int!, $data: ClientCreateOrUpdateInput!) {
    updateClient(id: $id, data: $data) {
      ...clientFragment
    }
  }
`)

export const deleteClientByIdMutationDocument = graphql(/* GraphQL */ `
  mutation deleteClientById($id: Int!) {
    deleteClient(id: $id) {
      ... on MutationDeleteClientSuccess {
        data {
          ...clientFragment
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
      ...clientFragment
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
          ...clientFragment
        }
      }
    }
  }
`)
