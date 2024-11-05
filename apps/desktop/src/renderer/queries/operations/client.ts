import { gqlClient } from '@renderer/config/gqlClientConfig'
import {
  CreateClientMutationVariables,
  UpdateClientByIdDocument,
  UserUpdateInput
} from '../graphql/codegen/graphql'
import {
  createClientMutationDocument,
  deleteClientByIdMutationDocument,
  getAllClientsQueryDocument
} from '../graphql/documents/client'

export const get = async () => {
  try {
    return await gqlClient.request(getAllClientsQueryDocument, { page: 1 })
  } catch (error) {
    console.error(error)
    return
  }
}

export const create = async (clientData: CreateClientMutationVariables) => {
  try {
    return await gqlClient.request(createClientMutationDocument, clientData)
  } catch (error) {
    console.error(error)
    return
  }
}

export const edit = async ({ id, data }: { id: number; data: UserUpdateInput }) => {
  try {
    return await gqlClient.request(UpdateClientByIdDocument, { id, data })
  } catch (error) {
    console.error(error)
    return
  }
}

export const purge = async (id: number) => {
  try {
    return await gqlClient.request(deleteClientByIdMutationDocument, { id })
  } catch (error) {
    console.error(error)
    return
  }
}
