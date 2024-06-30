/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@decorators/di'
import { Prisma, PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../database/prismaClient'
import { LOG_TYPE, logger } from '../utils/logger'
import { CreateOrderResolver, HttpStatusCode, QYT_PER_PAGE } from '@repo/shared'

@Injectable()
export default class OrderObservationControllerKls {
  constructor(private prismaService: PrismaClient) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clients = await this.prismaService.orderObservation.findMany({
        take: QYT_PER_PAGE,
        orderBy: {
          id: 'desc'
        }
      })

      return res.status(HttpStatusCode.OK).send(clients)
    } catch (error) {
      next(error)
    }

    // try {
    //   const clients = await db.orderObservation.findMany({
    //     take: QYT_PER_PAGE,
    //     orderBy: {
    //       id: 'desc'
    //     }
    //   })

    //   return res.status(HttpStatusCode.OK).send(clients)
    // } catch (error) {
    //   next(error)
    // }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const orderData: Prisma.OrderObservationCreateInput = req.body

    try {
      logger({
        level: LOG_TYPE.INFO,
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
        level: LOG_TYPE.INFO,
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
