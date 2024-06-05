/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../database/prismaClient'
import { LOG_LEVEL, logger } from '../utils/logger'
import { CreateOrderResolver, HttpStatusCode, QYT_PER_PAGE } from '@repo/shared'

class OrderControllerKls {
  // @ts-ignore
  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clients = await db.order.findMany({
        take: QYT_PER_PAGE,
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
    const orderData: Prisma.OrderCreateInput = req.body

    try {
      logger({
        level: LOG_LEVEL.INFO,
        message: 'Criando novo cliente com dados:',
        object: JSON.stringify(orderData, null, 2)
      })

      CreateOrderResolver.parse(orderData)

      const order = await db.order.create({
        data: orderData
      })

      return res.status(HttpStatusCode.CREATED).send(order)
    } catch (error) {
      next(error)
    }
  }

  // @ts-ignore
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const idAsString = req.params.orderId

    try {
      const orderId = z.number().parse(parseInt(idAsString))

      const order = await db.order.delete({
        where: {
          id: orderId
        }
      })

      return res.status(HttpStatusCode.OK).send(order)
    } catch (error) {
      next(error)
    }
  }

  // @ts-ignore
  edit = async (req: Request, res: Response, next: NextFunction) => {
    const orderData: Prisma.OrderCreateInput = req.body
    const idAsString = req.params.clientId

    try {
      const orderId = z.number().parse(parseInt(idAsString))

      logger({
        level: LOG_LEVEL.INFO,
        message: `Editando pedido com id ${orderId} com dados:`,
        object: JSON.stringify(orderData, null, 2)
      })

      CreateOrderResolver.parse(orderData)

      const order = await db.order.update({
        where: {
          id: orderId
        },
        data: orderData
      })

      return res.status(HttpStatusCode.OK).send(order)
    } catch (error) {
      next(error)
    }
  }
}

export const OrderController = new OrderControllerKls()
