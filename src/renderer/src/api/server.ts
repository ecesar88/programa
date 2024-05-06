import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { LOG_LEVEL, logger, parseEnv } from '../utils'
import { errorHandlerMiddleware, loggerMiddleware } from './middleware'
import { ClientRouter, OrderRouter } from './routes'

dotenv.config()

const app = express()

app.use(helmet())

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173'
  })
)

app.use(loggerMiddleware)

app.get('/info', (_req, res) => {
  res.send('Version 0.0.1')
})

app.use(ClientRouter)
app.use(OrderRouter)

app.use(errorHandlerMiddleware)

const SERVER_PORT = parseEnv<number>('SERVER_PORT', process.env.SERVER_PORT)!
const SERVER_HOSTNAME = parseEnv<string>('SERVER_HOSTNAME', process.env.SERVER_HOSTNAME)!

app.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
  logger({
    level: LOG_LEVEL.INFO,
    message: `Servidor rodando na porta ${SERVER_PORT}\n`
  })
})
