import { type ColorTheme, color, colorize } from 'json-colorizer'
import nodeColorLog from 'node-color-log'

export const jsonColors: ColorTheme = {
  Whitespace: color.gray,
  Brace: color.gray,
  Bracket: color.gray,
  Colon: color.gray,
  Comma: color.gray,
  StringKey: color.whiteBright,
  StringLiteral: color.greenBright,
  NumberLiteral: color.yellowBright,
  BooleanLiteral: color.cyan,
  NullLiteral: color.white
}

export const colorizeAsJSON = (
  json: Record<string, unknown> | string | Array<Record<string, unknown>>
) => colorize(json, { indent: 2, colors: jsonColors })

export enum LOG_LEVEL {
  ERROR,
  WARN,
  INFO
}

export const logger = ({
  level,
  message,
  object
}: {
  level: LOG_LEVEL
  message: string
  object?: string
}) => {
  const dateString = `[${new Date().toISOString()}]`
  const separator = ' :: '
  const logPrefix = '=> '

  const errorLogger = (message: string) =>
    nodeColorLog
      .color('yellow')
      .append(dateString)
      .reset()
      .append(separator)
      .color('red')
      .append(`[ERROR] ${logPrefix}`)
      .reset()
      .log(message)

  const warnLogger = (message: string) =>
    nodeColorLog
      .color('yellow')
      .append(dateString)
      .reset()
      .append(separator)
      .color('yellow')
      .append(`[WARN] ${logPrefix}`)
      .reset()
      .log(message)

  const infoLogger = (message: string) =>
    nodeColorLog
      .color('yellow')
      .append(dateString)
      .reset()
      .append(separator)
      .color('cyan')
      .append(`[INFO] ${logPrefix}`)
      .reset()
      .log(message)

  switch (level) {
    case LOG_LEVEL.ERROR: {
      errorLogger(message)

      if (object && Object.values(object)?.length) {
        nodeColorLog
          .reset()
          .color('red')
          .bold()
          .append('############# ')
          .reset()
          .bold()
          .color('cyan')
          .append('Error: ')
          .reset()
          .log(`${object}`)
      }

      break
    }

    case LOG_LEVEL.WARN: {
      warnLogger(message)

      if (object && Object.values(object)?.length) {
        nodeColorLog
          .reset()
          .color('yellow')
          .bold()
          .append('############# ')
          .reset()
          .bold()
          .color('cyan')
          .append('Params: ')
          .reset()
          .log(`${object}`)
      }

      break
    }

    case LOG_LEVEL.INFO: {
      infoLogger(message)

      if (object && Object.values(object)?.length) {
        nodeColorLog.reset().bold().color('cyan').append('[PARAMS] => ').reset().log(`${object}`)
      }

      break
    }
  }
}

export enum OPERATION_TYPE {
  LOGIN = 'Login',
  UPDATE = 'Updating',
  CREATE = 'Creating',
  DELETE = 'Deleting',
  READ = 'Fetching'
}

export function logInfo({
  operation,
  table,
  args,
  id
}: {
  operation?: OPERATION_TYPE | string
  table?: string
  id?: string
  args?: Record<string, unknown>
}) {
  const msg = `${operation ? ` ${operation}` : ''}${table ? ` ${table}` : ''}`

  if (id) operation += ` with the id: ${id}.`

  logger({
    level: LOG_LEVEL.INFO,
    message: msg,
    ...(args
      ? {
          object: colorizeAsJSON(typeof args === 'object' ? args : String(args))
        }
      : {})
  })
}

export function logError({
  operation,
  table,
  error,
  id
}: {
  operation?: OPERATION_TYPE | string
  table?: string
  error: Error | unknown
  id?: string
}) {
  const msg = `Error in${operation ? ` ${operation}` : ''}${table ? ` ${table}` : ''}`

  if (id) operation += ` with the id: ${id}.`

  logger({
    level: LOG_LEVEL.ERROR,
    message: msg,
    object: String(error)
  })
}

export function logWarn(message: string, args?: Record<string, unknown>) {
  logger({
    level: LOG_LEVEL.WARN,
    message: message,
    ...(args
      ? {
          object: colorizeAsJSON(typeof args === 'object' ? args : String(args))
        }
      : {})
  })
}
