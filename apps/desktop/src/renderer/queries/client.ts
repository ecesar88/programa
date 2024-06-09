import { Client, Prisma } from '@prisma/client'
import { AxiosResponse } from 'axios'
import server from '../config/axiosInstance'
import { Endpoints } from '@renderer/constants/endpoints'

export const get = async (): Promise<AxiosResponse<Client[]>> => {
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
    throw error
  }
}

export const create = async (
  clientData: Prisma.ClientCreateWithoutOrdersInput
): Promise<AxiosResponse<Client>> => {
  try {
    const client = await server.post<Client>(Endpoints.clients.base, clientData)

    return client
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const edit = async (params: {
  clientId: number
  clientData: Prisma.ClientCreateWithoutOrdersInput
}): Promise<AxiosResponse<Client>> => {
  const { clientId, clientData } = params

  try {
    const client = await server.put<Client>(Endpoints.clients.single(clientId), clientData)

    return client
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const purge = async (clientId: number): Promise<AxiosResponse<Client>> => {
  try {
    const client = await server.delete<Client>(Endpoints.clients.single(clientId))

    return client
  } catch (error) {
    console.error(error)
    throw error
  }
}
