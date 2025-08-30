// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
import * as z from 'zod/v4'
import { ClassResponseInterceptor, ValidateWith } from '../interceptors'
import { PrismaService } from '../services/prismaService'
import { InterceptResponse } from '../utils/interceptResponse'
import { LOG_TYPE, logger } from '../utils/logger'
import { prismaPaginate } from '../utils/prismaPaginate'

@ClassResponseInterceptor(InterceptResponse)
@Controller('/clients')
export class ClientController {
  private prisma!: PrismaService

  constructor() {
    this.prisma = container.resolve(PrismaService)
  }

  @Status(HttpStatusCode.OK)
  @Get('/')
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
  @Get('/:cliendId')
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
  @Post('/')
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
  @Delete('/')
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
  @Put('/')
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
