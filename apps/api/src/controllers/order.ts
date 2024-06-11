import {
  Body,
  Controller,
  Delete,
  Get,
  Next,
  Params,
  Post,
  Put,
  Status,
} from "@decorators/express";
import { Prisma } from "@prisma/client";
import { HttpStatusCode, QTY_PER_PAGE } from "@repo/shared/constants";
import { CreateOrderResolver } from "@repo/shared/resolvers";
import { type NextFunction } from "express";
import { PrismaService } from "../services/prismaService";
import { LOG_LEVEL, logger } from "../utils/logger";

@Controller("/order")
export class OrderController {
  public constructor(private prisma: PrismaService) {}

  @Status(HttpStatusCode.OK)
  @Get("/")
  async getOrders(@Next() next: NextFunction) {
    try {
      const orders = await this.prisma.order.findMany({
        take: QTY_PER_PAGE,
        orderBy: {
          id: "desc",
        },
      });

      return orders;
    } catch (error) {
      next(error);
    }
  }

  @Status(HttpStatusCode.CREATED)
  @Post("/")
  async create(
    @Next() next: NextFunction,
    @Body() orderData: Prisma.OrderCreateInput
  ) {
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

      return order;
    } catch (error) {
      next(error);
    }
  }

  @Status(HttpStatusCode.OK)
  @Delete("/:orderId")
  async delete(@Next() next: NextFunction, @Params("orderId") orderId: string) {
    try {
      // const orderId = z.number().parse(+orderId);

      const order = await this.prisma.order.delete({
        where: {
          id: +orderId,
        },
      });

      return order;
    } catch (error) {
      next(error);
    }
  }

  @Status(HttpStatusCode.OK)
  @Put("/:orderId")
  async edit(
    @Next() next: NextFunction,
    @Body() orderData: Prisma.OrderCreateInput,
    @Params("orderId") orderId: string
  ) {
    try {
      // const orderId = z.number().parse(parseInt(idAsString));

      logger({
        level: LOG_LEVEL.INFO,
        message: `Editando pedido com id ${orderId} com dados:`,
        object: JSON.stringify(orderData, null, 2),
      });

      CreateOrderResolver.parse(orderData);

      const order = await this.prisma.order.update({
        where: {
          id: +orderId,
        },
        data: orderData,
      });

      return order;
    } catch (error) {
      next(error);
    }
  }
}
