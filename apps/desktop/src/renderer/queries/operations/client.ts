import { gqlClient } from '@renderer/App'
import {
  CreateClientMutationVariables,
  GetAllClientsQuery,
  UpdateClientByIdDocument,
  UpdateClientByIdMutationVariables
} from '../graphql/codegen/graphql'
import {
  createClientMutationDocument,
  deleteClientByIdMutationDocument,
  getAllClientsQueryDocument
} from '../graphql/documents/client'

export const get = async (): Promise<GetAllClientsQuery | undefined> => {
  try {
    // const clients = await server.get<Response<Client[]>>(Endpoints.clients.base)
    // return clients

    // const promise = server.get<Response<Client[]>>(Endpoints.clients.base)

    const promise = gqlClient.request(getAllClientsQueryDocument, { page: 1 })

    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve(promise)
      }, 2500)
    })
  } catch (error) {
    console.error(error)
    return
  }
}

export const create = async (clientData: CreateClientMutationVariables) => {
  try {
    // return server.post<Response<Client>>(Endpoints.clients.base, clientData)
    return gqlClient.request(createClientMutationDocument, clientData)
  } catch (error) {
    console.error(error)
    return
  }
}

export const edit = async ({
  id,
  data
}: {
  id: number
  data: UpdateClientByIdMutationVariables['data']
}) => {
  try {
    // return server.put<Response<Client>>(Endpoints.clients.single(clientId), clientData)
    return gqlClient.request(UpdateClientByIdDocument, { id, data })
  } catch (error) {
    console.error(error)
    return
  }
}

export const purge = async (id: number) => {
  try {
    // return server.delete<Response<Client>>(Endpoints.clients.single(clientId))
    return gqlClient.request(deleteClientByIdMutationDocument, { id })
  } catch (error) {
    console.error(error)
    return
  }
}
