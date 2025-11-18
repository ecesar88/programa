import { useEngine, useErrorHandler, usePayloadFormatter } from '@envelop/core'
import { useRateLimiter } from '@envelop/rate-limiter'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql'
import cors from 'cors'
import dotenv from 'dotenv'
import Express from 'express'
import figlet from 'figlet'
import { execute, parse, specifiedRules, subscribe, validate } from 'graphql'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import { createYoga, useLogger } from 'graphql-yoga'
import helmet, { type HelmetOptions } from 'helmet'
import nodeColorLog from 'node-color-log'
import path from 'node:path'
import 'reflect-metadata'
import { env } from './environment/env'
import { InfoController } from './server/controllers/info'
import { context } from './server/graphql/context'
import { schema } from './server/graphql/schema'
import { HTTPLoggerMiddleware } from './server/middleware/HTTPLoggerMiddleware'
import { gqlLogger } from './server/plugins/gqlLogger'
import { handleError } from './server/plugins/handleError'
import { payloadFormatter } from './server/plugins/payloadFormatter'
import { ROUTES } from './server/routes'
import { initServices } from './server/services/_manager'
import { isDev } from './utils/functions'
import { LOG_LEVEL, logger } from './utils/logger'
import { printRouteTable } from './utils/printRouteTable'
import { shutdown } from './utils/shutdown'

const helmetOptions: HelmetOptions = {
  contentSecurityPolicy: {
    // TODO - Toggle unsafe directives based on environment. i.e: "development", "production" etc
    directives: {
      'default-src': ["'self'"],
      'style-src': ["'self'", "'unsafe-inline'"],
      'style-src-elem': ["'self'", "'unsafe-inline'", 'unpkg.com'],
      'script-src': ["'self'", "'unpkg.com'", "'unsafe-inline'", "'unsafe-eval'"],
      'img-src': ["'self'", 'raw.githubusercontent.com'],
      'worker-src': ['*', 'blob:']
    }
  }
}

dotenv.config()

const SERVER_PORT = env.SERVER_PORT
const SERVER_HOSTNAME = env.SERVER_HOSTNAME
const APP_NAME = env.APP_NAME

const PUBLIC_FOLDER_NAME = 'public'
const PUBLIC_FOLDER_PATH = path.join(process.cwd(), PUBLIC_FOLDER_NAME)

;(async function bootstrap() {
  // Initialize stand-alone/integration services
  await initServices()

  const express = Express()
  const yoga = createYoga({
    batching: true,
    renderGraphiQL,
    logging: 'debug',
    schema,
    context,
    disposeOnProcessTerminate: true,
    maskedErrors: !isDev(),
    plugins: [
      useEngine({
        parse,
        validate,
        specifiedRules,
        execute,
        subscribe
      }),
      useLogger(gqlLogger),
      useErrorHandler(handleError),
      usePayloadFormatter(payloadFormatter),
      useRateLimiter({
        // @ts-expect-error - 'ctx' is of type 'unknown'.ts(18046)
        identifyFn: (ctx) => ctx.request.ip
      })
    ]
  })

  express.use(Express.json())
  express.use(yoga.graphqlEndpoint, yoga)

  express.use(`${ROUTES.INFO}${ROUTES.DOCS}`, Express.static(PUBLIC_FOLDER_PATH))
  express.use(
    `${ROUTES.INFO}${ROUTES.DOCS}${ROUTES.VOYAGER}`,
    voyagerMiddleware({ endpointUrl: '/graphql' })
  )

  express.use(helmet(helmetOptions))
  express.use(
    cors({
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'null'],
      credentials: true
    })
  )

  express.use(HTTPLoggerMiddleware)

  // Register InfoController
  express.get(`${ROUTES.INFO}${ROUTES.HEALTHCHECK}`, InfoController.get)

  const httpServer = express.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
    figlet(
      APP_NAME,
      {
        width: 80,
        whitespaceBreak: true
      },
      (_, fig) => {
        logger({
          level: LOG_LEVEL.INFO,
          message: `[🚀]: Server ready on ${SERVER_HOSTNAME}:${SERVER_PORT}`
        })

        nodeColorLog.color('yellow').log(fig)

        printRouteTable(express)
      }
    )
  })

  // Shutdown
  process.once('SIGINT', () => shutdown(httpServer, 'SIGINT'))
  process.once('SIGTERM', () => shutdown(httpServer, 'SIGTERM'))
})()
