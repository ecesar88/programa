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
  Status
} from '@decorators/express'
import { Prisma } from '@prisma/client'
import { HttpStatusCode } from '@repo/shared/constants'
import { CreateClientResolver } from '@repo/shared/resolvers'
import type { NextFunction } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ClassResponseInterceptor, ValidateWith } from '../interceptors'
import { HTTP_ROUTES as MakeRoutes } from '../routes'
import { PrismaService } from '../services/prismaService'
import { InterceptResponse } from '../utils/interceptResponse'
import { LOG_TYPE, logger } from '../utils/logger'
import { prismaPaginate } from '../utils/prismaPaginate'

const HTTP_ROUTES = MakeRoutes()

@ClassResponseInterceptor(InterceptResponse)
@Controller(HTTP_ROUTES.client.prefix)
export class ClientController {
  private prisma!: PrismaService

  constructor() {
    this.prisma = container.resolve(PrismaService)
  }

  @Status(HttpStatusCode.OK)
  @Get(HTTP_ROUTES.client.routes.root)
  async get(@Next() next: NextFunction, @Query() pageNumber: string) {
    try {
      return this.prisma.client.findMany({
        ...prismaPaginate(parseInt(pageNumber)),
        orderBy: {
          id: 'desc'
        }
      })
    } catch (error) {
      next()
    }
  }

  @Status(HttpStatusCode.OK)
  @Get(HTTP_ROUTES.client.routes.withId)
  async getOne(@Next() next: NextFunction, @Params('clientId') clientId: string) {
    try {
      const clients = await this.prisma.client.findFirstOrThrow({
        where: {
          id: +clientId
        }
      })

      return clients
    } catch (error) {
      next()
    }
  }

  @ValidateWith(CreateClientResolver)
  @Status(HttpStatusCode.CREATED)
  @Post(HTTP_ROUTES.client.routes.root)
  async create(@Next() next: NextFunction, @Body() clientData: Prisma.ClientCreateInput) {
    try {
      logger({
        level: LOG_TYPE.INFO,
        message: 'Criando novo cliente com dados:',
        object: JSON.stringify(clientData, null, 2)
      })

      const client = await this.prisma.client.create({
        data: clientData
      })

      return client
    } catch (error) {
      next()
    }
  }

  @Status(HttpStatusCode.OK)
  @Delete(HTTP_ROUTES.client.routes.withId)
  async delete(@Next() next: NextFunction, @Params('clientId') clientId: string) {
    const idAsString = String(clientId)

    try {
      const clientId = z.number().parse(parseInt(idAsString))

      const client = await this.prisma.client.delete({
        where: {
          id: clientId
        }
      })

      return client
    } catch (error) {
      next()
    }
  }

  @Status(HttpStatusCode.OK)
  @Put(HTTP_ROUTES.client.routes.withId)
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
        level: LOG_TYPE.INFO,
        message: `Editando cliente com id ${clientId} com dados:`,
        object: JSON.stringify(clientData, null, 2)
      })

      CreateClientResolver.parse(clientData)

      const client = await this.prisma.client.update({
        where: {
          id: +clientId
        },
        data: clientData
      })

      return client
    } catch (error) {
      next()
    }
  }
}
