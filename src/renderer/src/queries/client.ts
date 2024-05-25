import { Client, Prisma } from '@prisma/client'
import { AxiosResponse } from 'axios'
import server from '../config/axiosInstance'
import { ENDPOINTS } from '../constants'

export const getClients = async (): Promise<AxiosResponse<Client[]>> => {
  try {
    // const clients = await server.get<Client[]>(ENDPOINTS.clients)

    // return clients

    const promise = server.get<Client[]>(ENDPOINTS.clients)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(promise)
      }, 2500)
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createClient = async (
  clientData: Prisma.ClientCreateWithoutOrdersInput
): Promise<AxiosResponse<Client>> => {
  try {
    const client = await server.post<Client>(ENDPOINTS.clients, clientData)

    return client
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const editClient = async (params: {
  clientId: number
  clientData: Prisma.ClientCreateWithoutOrdersInput
}): Promise<AxiosResponse<Client>> => {
  const { clientId, clientData } = params

  try {
    const client = await server.put<Client>(`${ENDPOINTS.clients}/${clientId}`, clientData)

    return client
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteClient = async (clientId: number): Promise<AxiosResponse<Client>> => {
  try {
    const client = await server.delete<Client>(`${ENDPOINTS.clients}/${clientId}`)

    return client
  } catch (error) {
    console.error(error)
    throw error
  }
}
