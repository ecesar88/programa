import { InjectionToken } from '@decorators/di'
import { Container, ERROR_MIDDLEWARE, attachControllers } from '@decorators/express'
import cors from 'cors'
import dotenv from 'dotenv'
import createExpress from 'express'
import { createYoga } from 'graphql-yoga'
import helmet, { HelmetOptions } from 'helmet'
import { ClientController } from './controllers/client'
import { InfoController } from './controllers/info'
import { OrderController } from './controllers/order'
import { schema } from './graphql/schema'
import { ErrorHandlerMiddleware, HTTPLoggerMiddleware } from './middleware'
import { PrismaService } from './services/prismaService'
import { LOG_LEVEL, logger } from './utils/logger'
import { parseEnv } from './utils/parseEnv'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql'
import { context } from './graphql/context'

dotenv.config()

const SERVER_PORT = parseEnv<number>('SERVER_PORT', process.env.SERVER_PORT)
const SERVER_HOSTNAME = parseEnv<string>('SERVER_HOSTNAME', process.env.SERVER_HOSTNAME)

const helmetOptions: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      'style-src': ["'self'", 'unpkg.com'],
      'script-src': ["'self'", 'unpkg.com', "'unsafe-inline'"],
      'img-src': ["'self'", 'raw.githubusercontent.com']
    }
  }
}

export const PRISMA_SERVICE = new InjectionToken('PrismaService')
;(async function start() {
  const express = createExpress()
  const yoga = createYoga({
    renderGraphiQL,
    logging: 'debug',
    schema: schema,
    context
  })

  express.use(helmet(helmetOptions))
  express.use(createExpress.json())
  express.use(cors({ origin: 'http://localhost:5173' }))
  express.use(HTTPLoggerMiddleware)
  express.use(yoga.graphqlEndpoint, yoga)

  Container.provide([
    {
      provide: ERROR_MIDDLEWARE,
      useClass: ErrorHandlerMiddleware
    },
    {
      provide: PrismaService,
      useClass: PrismaService,
    }
  ])

  await attachControllers(express, [InfoController, ClientController, OrderController])

  express.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
    logger({
      level: LOG_LEVEL.INFO,
      message: `🚀 Server ready on ${SERVER_HOSTNAME}:${SERVER_PORT}`
    })
  })
})().catch(console.error)
