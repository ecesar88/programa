import nodeColorLog from 'node-color-log'

export enum LOG_TYPE {
  ERROR,
  WARN,
  INFO,
  GQL
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

      if (object) {
        nodeColorLog.log(`Error: ${object}`)
      }

      break
    }

    case LOG_TYPE.WARN: {
      warnLogger(message)

      if (object) {
        nodeColorLog.log(`${object}`)
      }

      break
    }

    case LOG_TYPE.INFO: {
      infoLogger(message)

      if (object) {
        nodeColorLog.log(`${object}`)
      }

      break
    }
  }
}

export const gqlLogger = (_eventName: string, args1: any) => {
  // Event could be `execute-start` / `execute-end` / `subscribe-start` / `subscribe-end`
  // `args` will include the arguments passed to execute/subscribe (in case of "start" event) and additional result in case of "end" event.

  const { args } = args1

  const operation = args?.document?.definitions?.[0]?.operation
  const queryName = args?.document?.definitions?.[0]?.name?.value ?? 'unknown'

  const ip = args.contextValue.req.ip

  // Convert params to JSON, but first we need to add quotation
  // marks (") to the keys, otherwise parsing fails
  const parseParams = (): boolean | Record<string, unknown> => {
    const body = args.document.definitions[0].loc.source.body as string

    const openingParenthesis = body.split('').findIndex((str) => str === '(') + 1
    const closingParenthesis = body.split('').findIndex((str) => str === ')')

    if (openingParenthesis === -1 || closingParenthesis === -1) {
      return false
    }

    const params = `${body.slice(openingParenthesis, closingParenthesis)}`

    // Remove whitespace before or after commas, this way it makes things easier for us
    const paramsWithRemovedWhitespace = params.replace(/\s?,\s?/gi, ',')
    const paramsParsedToJSONString = paramsWithRemovedWhitespace
      .split(',')
      .map((token) => {
        const [key, value] = token.split(':')

        return `"${key}":${value}`
      })
      .join(',')

    const paramsJSON = JSON.parse(`{${paramsParsedToJSONString}}`)
    return paramsJSON
  }

  const dateString = `[${new Date().toISOString()}]`
  const separator = ' :: '
  const logPrefix = '=> '

  const logToConsole = () =>
    nodeColorLog
      .color('yellow')
      .append(dateString)
      .reset()
      .append(separator)
      .color('magenta')
      .append(`[GQL] ${logPrefix}`)
      .reset()
      .color('yellow')
      .append(`${operation.split('')[0].toUpperCase()}${operation.slice(1)}: '${queryName}'`)
      .reset()
      .append(' from ')
      .color('yellow')
      .append(ip)
      .reset()

  const params = parseParams()

  if (params === false) {
    logToConsole().append('\n').log()
  } else {
    logToConsole()
      .append('\n Params: ')
      .append(JSON.stringify(parseParams(), null, 2))
      .append('\n')
      .log()
  }
}
