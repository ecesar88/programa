import {
  Body,
  Controller,
  Delete,
  Get,
  Next,
  Params,
  Post,
  Put,
  Query,
  Status,
} from "@decorators/express";
import { Prisma } from "@prisma/client";
import { HttpStatusCode, QTY_PER_PAGE } from "@repo/shared/constants";
import { CreateClientResolver } from "@repo/shared/resolvers";
import type { NextFunction } from "express";
import { z } from "zod";
import { ValidateWith } from "../middleware";
import { PrismaService } from "../services/prismaService";
import { LOG_LEVEL, logger } from "../utils/logger";

@Controller("/clients")
export class ClientController {
  public constructor(private prisma: PrismaService) {}

  @Status(HttpStatusCode.OK)
  @Get("/")
  async get(@Next() next: NextFunction, @Query() pageNumber: string) {
    const PAGE_NUMBER = parseInt(pageNumber as string);

    try {
      return this.prisma.client.findMany({
        ...(PAGE_NUMBER > 0
          ? {
              skip: PAGE_NUMBER === 1 ? 0 : (PAGE_NUMBER - 1) * QTY_PER_PAGE,
            }
          : {}),
        take: QTY_PER_PAGE,
        orderBy: {
          id: "desc",
        },
      });
    } catch (error) {
      next();
    }
  }

  @Status(HttpStatusCode.OK)
  @Get("/:clientId")
  async getOne(
    @Next() next: NextFunction,
    @Params("clientId") clientId: string
  ) {
    try {
      const clients = await this.prisma.client.findFirstOrThrow({
        where: {
          id: +clientId,
        },
      });

      return clients;
    } catch (error) {
      next();
    }
  }

  @Status(HttpStatusCode.CREATED)
  @ValidateWith(CreateClientResolver)
  @Post("/")
  async create(
    @Next() next: NextFunction,
    @Body() clientData: Prisma.ClientCreateInput
  ) {
    try {
      logger({
        level: LOG_LEVEL.INFO,
        message: "Criando novo cliente com dados:",
        object: JSON.stringify(clientData, null, 2),
      });

      const client = await this.prisma.client.create({
        data: clientData,
      });

      return client;
    } catch (error) {
      next();
    }
  }

  @Status(HttpStatusCode.OK)
  @Delete("/:clientId")
  async delete(
    @Next() next: NextFunction,
    @Params("clientId") clientId: string
  ) {
    const idAsString = String(clientId);

    try {
      const clientId = z.number().parse(parseInt(idAsString));

      const client = await this.prisma.client.delete({
        where: {
          id: clientId,
        },
      });

      return client;
    } catch (error) {
      next();
    }
  }

  @Status(HttpStatusCode.OK)
  @Put("/:clientId")
  async edit(
    @Next() next: NextFunction,
    @Body() clientData: Prisma.ClientCreateInput,
    @Params() clientId: string
  ) {
    try {
      // (function validateClientId() {
      //   return z.number().parse(clientId);
      // })();

      logger({
        level: LOG_LEVEL.INFO,
        message: `Editando cliente com id ${clientId} com dados:`,
        object: JSON.stringify(clientData, null, 2),
      });

      CreateClientResolver.parse(clientData);

      const client = await this.prisma.client.update({
        where: {
          id: +clientId,
        },
        data: clientData,
      });

      return client;
    } catch (error) {
      next();
    }
  }
}
