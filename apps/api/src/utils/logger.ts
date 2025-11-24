import { color, colorize, type ColorTheme } from 'json-colorizer'
import nodeColorLog from 'node-color-log'
import stripAnsi from 'strip-ansi'
import winston from 'winston'

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
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
  WARN = 'WARN',
  INFO = 'INFO'
}

/**
 * -----------------------------------
 * WINSTON LOGGER SETUP
 * -----------------------------------
 */
export const fileLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] :: [${level.toUpperCase()}] => ${message}`
    })
  ),
  transports: [
    new winston.transports.File({
      filename: './logs/app.log',
      level: 'info',
      maxsize: 5_000_000,
      maxFiles: 1
    })
  ]
})

/**
 * ------------------------------------------------------
 * Helper: Console logging (your original nodeColorLog)
 * ------------------------------------------------------
 */

const ERROR_LABEL = 'Error'
const PARAMS_LABEL = 'Params: '
const LABEL_PREFIX = '#############'

const consoleLog = (level: LOG_LEVEL, message: string, obj?: any) => {
  const dateString = `[${new Date().toISOString()}]`
  const separator = ' :: '
  const prefix = '=> '

  const colorByLevel: Record<LOG_LEVEL, Parameters<typeof nodeColorLog.color>[0]> = {
    ERROR: 'red',
    WARN: 'yellow',
    INFO: 'cyan',
    DEBUG: 'yellow'
  }

  // --- main line ---
  nodeColorLog
    .color('yellow')
    .append(dateString)
    .reset()
    .append(separator)
    .color(colorByLevel[level])
    .append(`[${level}] ${prefix}`)
    .reset()
    .log(message)

  // --- extra object ---
  if (obj) {
    const label =
      level === LOG_LEVEL.ERROR
        ? ERROR_LABEL
        : level === LOG_LEVEL.WARN
          ? ' ' + PARAMS_LABEL
          : ' ' + PARAMS_LABEL

    nodeColorLog
      .reset()
      .color(level === LOG_LEVEL.ERROR ? 'red' : 'yellow')
      .bold()
      .append(LABEL_PREFIX)
      .reset()
      .bold()
      .color('cyan')
      .append(` ${label}: `)
      .reset()
      .log(typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2))
  }
}

/**
 * ------------------------------------------------------
 * LOGGER (calls console + winston file logger)
 * ------------------------------------------------------
 */
export const logger = ({
  level,
  message,
  object
}: {
  level: LOG_LEVEL
  message: string
  object?: any
}) => {
  // Console (color)
  consoleLog(level, message, object)

  // File (no color)
  const plainMessage =
    message +
    (object
      ? `\n${LABEL_PREFIX} ${PARAMS_LABEL} ${typeof object === 'string' ? object : JSON.stringify(object, null, 2)}`
      : '')

  fileLogger.log({
    level: level.toLowerCase(),
    message: stripAnsi(plainMessage) // ensure no ANSI escapes
  })
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
  namespace,
  args,
  id
}: {
  operation?: OPERATION_TYPE | string
  namespace?: string
  id?: string
  args?: Record<string, unknown>
}) {
  const msg = `${operation ? ` ${operation}` : ''}${namespace ? ` ${namespace}` : ''}`

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
  namespace,
  error,
  id
}: {
  operation?: OPERATION_TYPE | string
  namespace?: string
  error: Error | unknown
  id?: string
}) {
  const msg = `Error in${operation ? ` ${operation}` : ''}${namespace ? ` ${namespace}` : ''}`

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
