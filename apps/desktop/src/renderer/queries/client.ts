import { Client, Prisma } from '@prisma/client'
import { Endpoints } from '@renderer/constants/endpoints'
import { AxiosResponse } from 'axios'
import server from '../config/axiosInstance'

export const get = async (): Promise<AxiosResponse<Client[]> | undefined> => {
  try {
    // const clients = await server.get<Client[]>(ENDPOINTS.clients)

    // return clients

    const promise = server.get<Client[]>(Endpoints.clients.base)

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

export const create = async (
  clientData: Prisma.ClientCreateWithoutOrdersInput
): Promise<AxiosResponse<Client> | undefined> => {
  try {
   return server.post<Client>(Endpoints.clients.base, clientData)
  } catch (error) {
    console.error(error)
    return
  }
}

export const edit = async (params: {
  clientId: number
  clientData: Prisma.ClientCreateWithoutOrdersInput
}): Promise<AxiosResponse<Client> | undefined> => {
  const { clientId, clientData } = params

  try {
    return server.put<Client>(Endpoints.clients.single(clientId), clientData)
  } catch (error) {
    console.error(error)
    return
  }
}

export const purge = async (clientId: number): Promise<AxiosResponse<Client> | undefined> => {
  try {
    return server.delete<Client>(Endpoints.clients.single(clientId))
  } catch (error) {
    console.error(error)
    return
  }
}
