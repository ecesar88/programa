import { Client, Prisma } from "@prisma/client";
import server from "../config/axiosInstance";
import { ENDPOINTS } from "../constants";

export const getClients = async () => {
  try {
    const clients = await server.get<Client[]>(ENDPOINTS.clients);

    return clients;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createClient = async (
  clientData: Prisma.ClientCreateWithoutOrdersInput
) => {
  try {
    const client = await server.post<Client>(ENDPOINTS.clients, clientData);

    return client;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteClient = async (clientId: number) => {
  try {
    const client = await server.delete<Client>(
      `${ENDPOINTS.clients}/${clientId}`
    );

    return client;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
