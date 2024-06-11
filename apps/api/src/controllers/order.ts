/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Controller, Get } from "@decorators/express";
import { Prisma } from "@prisma/client";
import { HttpStatusCode, QTY_PER_PAGE } from "@repo/shared/constants";
import { CreateOrderResolver } from "@repo/shared/resolvers";
import { z } from "zod";
import { LOG_LEVEL, logger } from "../utils/logger";
import { PrismaService } from "../services/prismaService";
import { type NextFunction, type Response, type Request } from "express";

@Controller("/order")
export class OrderController {
  public constructor(private prisma: PrismaService) {}

  @Get("/")
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await this.prisma.order.findMany({
        take: QTY_PER_PAGE,
        orderBy: {
          id: "desc",
        },
      });

      return res.status(HttpStatusCode.OK).send(clients);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const orderData: Prisma.OrderCreateInput = req.body;

    try {
      logger({
        level: LOG_LEVEL.INFO,
        message: "Criando novo cliente com dados:",
        object: JSON.stringify(orderData, null, 2),
      });

      CreateOrderResolver.parse(orderData);

      const order = await this.prisma.order.create({
        data: orderData,
      });

      return res.status(HttpStatusCode.CREATED).send(order);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const idAsString = req.params.orderId;

    try {
      const orderId = z.number().parse(parseInt(idAsString));

      const order = await this.prisma.order.delete({
        where: {
          id: orderId,
        },
      });

      return res.status(HttpStatusCode.OK).send(order);
    } catch (error) {
      next(error);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    const orderData: Prisma.OrderCreateInput = req.body;
    const idAsString = req.params.clientId;

    try {
      const orderId = z.number().parse(parseInt(idAsString));

      logger({
        level: LOG_LEVEL.INFO,
        message: `Editando pedido com id ${orderId} com dados:`,
        object: JSON.stringify(orderData, null, 2),
      });

      CreateOrderResolver.parse(orderData);

      const order = await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: orderData,
      });

      return res.status(HttpStatusCode.OK).send(order);
    } catch (error) {
      next(error);
    }
  };
}
