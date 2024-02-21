import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import { HttpStatusCode } from "../../constants";
import { CreateClientResolver } from "../../resolvers/user.resolver";
import { db } from "../database/prismaClient";
import { LOG_LEVEL, logger } from "../../utils";

class ClientControllerKls {
  getClients = async (_req: Request, res: Response) => {
    // const QTDE_DADOS_PARA_MOSTRAR = 20

    try {
      const clients = await db.client.findMany({
        // skip: QTDE_DADOS_PARA_MOSTRAR * NUMERO_DA_PAGINA,
        // take: QTDE_DADOS_PARA_MOSTRAR,
        orderBy: {
          id: "desc",
        },
      });

      return res.status(HttpStatusCode.OK).send(clients);
    } catch (error) {
      logger({
        level: LOG_LEVEL.ERROR,
        message: "Não foi possivel obter os clientes.",
        object: String(error),
      });

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: "Não foi possivel obter os clientes.",
        error: error,
      });
    }
  };

  createClient = async (req: Request, res: Response) => {
    const clientData: Prisma.ClientCreateInput = req.body;

    try {
      logger({
        level: LOG_LEVEL.INFO,
        message: "Criando novo cliente com dados:",
        object: JSON.stringify(clientData, null, 2),
      });

      CreateClientResolver.parse(clientData);

      const client = await db.client.create({
        data: clientData,
      });

      return res.status(HttpStatusCode.CREATED).send(client);
    } catch (error) {
      logger({
        level: LOG_LEVEL.ERROR,
        message: "Não foi possivel criar o cliente.",
        object: JSON.stringify(error, null, 2),
      });

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: "Não foi possivel criar o cliente.",
        error: error,
      });
    }
  };

  deleteClient = async (req: Request, res: Response) => {
    const idAsString = req.params.clientId;

    try {
      const clientId = z.number().parse(parseInt(idAsString));

      const client = await db.client.delete({
        where: {
          id: clientId,
        },
      });

      return res.status(HttpStatusCode.OK).send(client);
    } catch (error) {
      logger({
        level: LOG_LEVEL.ERROR,
        message: "Não foi possivel deletar o cliente.",
        object: JSON.stringify(error, null, 2),
      });

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: "Não foi possivel deletar o cliente.",
        error: error,
      });
    }
  };

  editClient = async (req: Request, res: Response) => {
    const clientData: Prisma.ClientCreateInput = req.body;
    const idAsString = req.params.clientId;

    try {
      const clientId = z.number().parse(parseInt(idAsString));

      logger({
        level: LOG_LEVEL.INFO,
        message: `Editando cliente com id ${clientId} com dados:`,
        object: JSON.stringify(clientData, null, 2),
      });

      CreateClientResolver.parse(clientData);

      const client = await db.client.update({
        where: {
          id: clientId,
        },
        data: clientData,
      });

      return res.status(HttpStatusCode.OK).send(client);
    } catch (error) {
      logger({
        level: LOG_LEVEL.ERROR,
        message: "Não foi possivel editar o cliente.",
        object: JSON.stringify(error, null, 2),
      });

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: "Não foi possivel editar o cliente.",
        error: error,
      });
    }
  };
}

export const ClientController = new ClientControllerKls();
