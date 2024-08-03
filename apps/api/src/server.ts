import { Container, ERROR_MIDDLEWARE, attachControllers } from '@decorators/express'
import { useEngine } from '@envelop/core'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql' // Not working?
import cors from 'cors'
import dotenv from 'dotenv'
import Express from 'express'
import figlet from 'figlet'
import { execute, parse, specifiedRules, subscribe, validate } from 'graphql'
import { createYoga, useLogger } from 'graphql-yoga'
import helmet, { HelmetOptions } from 'helmet'
import nodeColorLog from 'node-color-log'
import path from 'node:path'
import 'reflect-metadata'
import { InfoController } from './controllers/info'
import { context } from './graphql/context'
import { schema } from './graphql/schema'
import { ErrorHandlerMiddleware, HTTPLoggerMiddleware } from './middleware'
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

const SERVER_PORT = parseEnv<number>('SERVER_PORT')
const SERVER_HOSTNAME = parseEnv<string>('SERVER_HOSTNAME')
const APP_NAME = parseEnv<string>('APP_NAME')

const PUBLIC_FOLDER_NAME = 'public'
const PUBLIC_FOLDER_PATH = path.join(process.cwd(), PUBLIC_FOLDER_NAME)

;(async function start() {
  const express = Express()
  const yoga = createYoga({
    renderGraphiQL,
    logging: 'debug',
    schema,
    context,
    plugins: [
      useEngine({
        parse,
        validate,
        specifiedRules,
        execute,
        subscribe
      }),
      useLogger({
        logFn: gqlLogger
      })
    ]
  })

  express.use('/info/docs', Express.static(PUBLIC_FOLDER_PATH))
  express.use(helmet(helmetOptions))
  express.use(Express.json())
  express.use(cors({ origin: 'http://localhost:5173' })) // 5173 is the Electron frontend's port
  express.use(yoga.graphqlEndpoint, yoga)

  express.use(HTTPLoggerMiddleware)

  Container.provide([
    {
      provide: ERROR_MIDDLEWARE,
      useClass: ErrorHandlerMiddleware
    }
  ])

  await attachControllers(express, [InfoController])

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
