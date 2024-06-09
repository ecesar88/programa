import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../database/prismaClient'
import { LOG_LEVEL, logger } from '../utils/logger'
import { HttpStatusCode, QTY_PER_PAGE } from '@repo/shared/constants'
import { CreateClientResolver } from '@repo/shared/resolvers'

class ClientControllerKls {
  // @ts-ignore
  get = async (req: Request, res: Response, next: NextFunction) => {
    const PAGE_NUMBER = parseInt(req.query.pageNumber as string)

    try {
      const clients = await db.client.findMany({
        ...(PAGE_NUMBER > 0
          ? {
              skip: PAGE_NUMBER === 1 ? 0 : (PAGE_NUMBER - 1) * QTY_PER_PAGE
            }
          : {}),
        take: QTY_PER_PAGE,
        orderBy: {
          id: 'desc'
        }
      })

      return res.status(HttpStatusCode.OK).send(clients)
    } catch (error) {
      next(error)
    }
  }

  // @ts-ignore
  create = async (req: Request, res: Response, next: NextFunction) => {
    const clientData: Prisma.ClientCreateInput = req.body

    try {
      logger({
        level: LOG_LEVEL.INFO,
        message: 'Criando novo cliente com dados:',
        object: JSON.stringify(clientData, null, 2)
      })

      CreateClientResolver.parse(clientData)

      const client = await db.client.create({
        data: clientData
      })

      return res.status(HttpStatusCode.CREATED).send(client)
    } catch (error) {
      next(error)
    }
  }

  // @ts-ignore
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const idAsString = req.params.clientId

    try {
      const clientId = z.number().parse(parseInt(idAsString))

      const client = await db.client.delete({
        where: {
          id: clientId
        }
      })

      return res.status(HttpStatusCode.OK).send(client)
    } catch (error) {
      next(error)
    }
  }

  // @ts-ignore
  edit = async (req: Request, res: Response, next: NextFunction) => {
    const clientData: Prisma.ClientCreateInput = req.body
    const idAsString = req.params.clientId

    try {
      const clientId = z.number().parse(parseInt(idAsString))

      logger({
        level: LOG_LEVEL.INFO,
        message: `Editando cliente com id ${clientId} com dados:`,
        object: JSON.stringify(clientData, null, 2)
      })

      CreateClientResolver.parse(clientData)

      const client = await db.client.update({
        where: {
          id: clientId
        },
        data: clientData
      })

      return res.status(HttpStatusCode.OK).send(client)
    } catch (error) {
      next(error)
    }
  }
}

export const ClientController = new ClientControllerKls()