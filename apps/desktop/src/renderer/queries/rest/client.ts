import { Client, Prisma } from '@prisma/client'
import { Endpoints } from '@renderer/constants/endpoints'
import { AxiosResponse } from 'axios'
import server from '../../config/axiosInstance'
import { Response } from '@renderer/types'

export const get = async (): Promise<AxiosResponse<Response<Client[]>> | undefined> => {
  try {
    // const clients = await server.get<Response<Client[]>>(Endpoints.clients.base)
    // return clients

    const promise = server.get<Response<Client[]>>(Endpoints.clients.base)

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
): Promise<AxiosResponse<Response<Client>> | undefined> => {
  try {
    return server.post<Response<Client>>(Endpoints.clients.base, clientData)
  } catch (error) {
    console.error(error)
    return
  }
}

export const edit = async (params: {
  clientId: number
  clientData: Prisma.ClientCreateWithoutOrdersInput
}): Promise<AxiosResponse<Response<Client>> | undefined> => {
  const { clientId, clientData } = params

  try {
    return server.put<Response<Client>>(Endpoints.clients.single(clientId), clientData)
  } catch (error) {
    console.error(error)
    return
  }
}

export const purge = async (
  clientId: number
): Promise<AxiosResponse<Response<Client>> | undefined> => {
  try {
    return server.delete<Response<Client>>(Endpoints.clients.single(clientId))
  } catch (error) {
    console.error(error)
    return
  }
}
