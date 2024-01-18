import { db } from "../database/prismaClient";

export const createClient = async (nome: string) => {
  const client = await db.client.create({
    data: {
      name: nome,
    },
  });

  return client;
};
