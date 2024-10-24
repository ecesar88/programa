import { color, colorize, ColorTheme } from 'json-colorizer'
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

export const colorizeAsJSON = (json: Record<string, any>) =>
  colorize(json, { indent: 2, colors: jsonColors })

export enum LOG_TYPE {
  ERROR,
  WARN,
  INFO
}

export const logger = ({
  level,
  message,
  object
}: {
  level: LOG_TYPE
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
    case LOG_TYPE.ERROR: {
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

    case LOG_TYPE.WARN: {
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

    case LOG_TYPE.INFO: {
      infoLogger(message)

      if (object && Object.values(object)?.length) {
        nodeColorLog
          .reset()
          .bold()
          .color('cyan')
          .append('[PARAMS] => ')
          .reset()
          .log(`${object}`)
      }

      break
    }
  }
}
