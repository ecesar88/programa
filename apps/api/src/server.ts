import { Container, ERROR_MIDDLEWARE, attachControllers } from '@decorators/express'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql' // Not working?
import cors from 'cors'
import dotenv from 'dotenv'
import Express from 'express'
import figlet from 'figlet'
import { createYoga, useLogger } from 'graphql-yoga'
import helmet, { HelmetOptions } from 'helmet'
import nodeColorLog from 'node-color-log'
import path from 'node:path'
import 'reflect-metadata'
import { ClientController } from './controllers/client'
import { InfoController } from './controllers/info'
import { context } from './graphql/context'
import { schema } from './graphql/schema'
import { ErrorHandlerMiddleware, HTTPLoggerMiddleware } from './middleware'
import HTTP_ROUTES from './routes'
import { gqlLogger } from './utils/graphqlLogger'
import { LOG_TYPE, logger } from './utils/logger'
import { parseEnv } from './utils/parseEnv'
import { printRouteTable } from './utils/printRouteTable'

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

dotenv.config()

const SERVER_PORT = parseEnv<number>('SERVER_PORT', process.env.SERVER_PORT)
const SERVER_HOSTNAME = parseEnv<string>('SERVER_HOSTNAME', process.env.SERVER_HOSTNAME)
const APP_NAME = parseEnv<string>('APP_NAME', process.env.APP_NAME)

;(async function start() {
  const express = Express()
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

  express.use(HTTP_ROUTES.info.routes.docs, Express.static(path.join(process.cwd(), 'public')))
  express.use(helmet(helmetOptions))
  express.use(Express.json())
  express.use(cors({ origin: 'http://localhost:5173' }))
  express.use(yoga.graphqlEndpoint, yoga)

  express.use(HTTPLoggerMiddleware)

  Container.provide([
    {
      provide: ERROR_MIDDLEWARE,
      useClass: ErrorHandlerMiddleware
    }
  ])

  await attachControllers(express, [InfoController, ClientController])

  express.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
    figlet(
      APP_NAME,
      {
        width: 80,
        whitespaceBreak: true
      },
      (_, figlet) => {
        logger({
          level: LOG_TYPE.INFO,
          message: `🚀 Server ready on ${SERVER_HOSTNAME}:${SERVER_PORT}`
        })

        nodeColorLog.color('yellow').log(figlet)

        printRouteTable(express)
      }
    )
  })
})().catch(console.error)
