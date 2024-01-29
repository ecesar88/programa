import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants";
import { db } from "../database/prismaClient";
import { clientSchema } from "../schema/Client.schema";

class ClientControllerKls {
  getClients = async (_req: Request, res: Response) => {
    try {
      const clients = await db.client.findMany();

      return res.status(HttpStatusCode.OK).send(clients);
    } catch (error) {
      console.error("Não foi possivel obter os clientes. Erro: ", error);

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: "Não foi possivel obter os clientes.",
        error: error,
      });
    }
  };

  createClient = async (req: Request, res: Response) => {
    const clientData: Prisma.ClientCreateInput = req.body;

    try {
      clientSchema.parse(clientData);

      const client = await db.client.create({
        data: clientData,
      });

      return res.status(HttpStatusCode.OK).send(client);
    } catch (error) {
      console.error("Não foi possivel criar o cliente. Erro: ", error);

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: "Não foi possivel criar o cliente.",
        error: error,
      });
    }
  };
}

export const ClientController = new ClientControllerKls();
