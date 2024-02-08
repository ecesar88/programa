import { Client } from "@prisma/client";
import server from "../config/axiosInstance";

export const getClients = async () => {
  try {
    const clients = await server.get<Client[]>("/clients");

    return clients;
  } catch (error) {
    console.error(error);
  }
};
