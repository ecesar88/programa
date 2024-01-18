import { Prisma } from "@prisma/client";
import { db } from "../database/prismaClient";

export const createClient = async (clientData: Prisma.ClientCreateInput) => {
  try {
    const client = await db.client.create({
      data: clientData,
    });

    return client;
  } catch (error) {
    console.error("Não foi possivel criar o cliente. Erro: ", error);
    return {
      message: "Não foi possivel criar o cliente.",
      error: error,
    };
  }
};
