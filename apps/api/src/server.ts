import { Container, ERROR_MIDDLEWARE, attachControllers } from '@decorators/express'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql' // Not working?
import cors from 'cors'
import dotenv from 'dotenv'
import createExpress from 'express'
import figlet from 'figlet'
import { createYoga, useLogger } from 'graphql-yoga'
import helmet, { HelmetOptions } from 'helmet'
import nodeColorLog from 'node-color-log'
import 'reflect-metadata'
import { ClientController } from './controllers/client'
import { InfoController } from './controllers/info'
import { OrderController } from './controllers/order'
import { context } from './graphql/context'
import { schema } from './graphql/schema'
import { ErrorHandlerMiddleware, HTTPLoggerMiddleware } from './middleware'
import { gqlLogger } from './utils/graphqlLogger'
import { LOG_TYPE, logger } from './utils/logger'
import { parseEnv } from './utils/parseEnv'

dotenv.config()

const SERVER_PORT = parseEnv<number>('SERVER_PORT', process.env.SERVER_PORT)
const SERVER_HOSTNAME = parseEnv<string>('SERVER_HOSTNAME', process.env.SERVER_HOSTNAME)

const helmetOptions: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      'style-src-elem': ["'self'", 'unpkg.com', "'unsafe-inline'"],
      'script-src': ["'self'", 'unpkg.com', "'unsafe-inline'", "'unsafe-eval'"],
      'img-src': ["'self'", 'raw.githubusercontent.com'],
      'worker-src': ['*', 'blob:']
    }
  }
}

;(async function start() {
  const express = createExpress()
  const yoga = createYoga({
    renderGraphiQL,
    logging: 'debug',
    schema,
    context,
    plugins: [
      useLogger({
        logFn: gqlLogger
      })
    ]
  })

  express.use(helmet(helmetOptions))
  express.use(createExpress.json())
  express.use(cors({ origin: 'http://localhost:5173' }))
  express.use(yoga.graphqlEndpoint, yoga)

  express.use(HTTPLoggerMiddleware)

  Container.provide([
    {
      provide: ERROR_MIDDLEWARE,
      useClass: ErrorHandlerMiddleware
    }
  ])

  await attachControllers(express, [InfoController, ClientController, OrderController])

  express.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
    figlet(
      'Kitchen Manager',
      {
        width: 80,
        whitespaceBreak: true
      },
      (_, data) => {
        logger({
          level: LOG_TYPE.INFO,
          message: `🚀 Server ready on ${SERVER_HOSTNAME}:${SERVER_PORT}`
        })

        nodeColorLog.color('yellow').log(data)
      }
    )
  })
})().catch(console.error)
