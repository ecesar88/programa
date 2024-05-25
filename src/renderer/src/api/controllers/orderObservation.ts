/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatusCode, QYT_PER_PAGE } from '../../constants'
import { CreateOrderResolver } from '../../resolvers/order'
import { LOG_LEVEL, logger } from '../../utils'
import { db } from '../database/prismaClient'

class OrderObservationControllerKls {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clients = await db.orderObservation.findMany({
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

  create = async (req: Request, res: Response, next: NextFunction) => {
    const orderData: Prisma.OrderObservationCreateInput = req.body

    try {
      logger({
        level: LOG_LEVEL.INFO,
        message: 'Criando novo cliente com dados:',
        object: JSON.stringify(orderData, null, 2)
      })

      // CreateOrderResolver.parse(orderData)

      const order = await db.orderObservation.create({
        data: orderData
      })

      return res.status(HttpStatusCode.CREATED).send(order)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const idAsString = req.params.orderId

    try {
      const orderId = z.number().parse(parseInt(idAsString))

      const order = await db.orderObservation.delete({
        where: {
          id: orderId
        }
      })

      return res.status(HttpStatusCode.OK).send(order)
    } catch (error) {
      next(error)
    }
  }

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

      const order = await db.orderObservation.update({
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

export const OrderObservationController = new OrderObservationControllerKls()
