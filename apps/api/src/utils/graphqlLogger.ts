import nodeColorLog from 'node-color-log'

const removeCommentsAndEmptyLines = (queryString: string): string[] => {
  const lineIsACommentOrIsEmptyPattern = new RegExp(/(^#)|(^$)/)

  return queryString
    .split('\n')
    .map((line) => {
      if (lineIsACommentOrIsEmptyPattern.test(line)) return null
      return line
    })
    .filter((token): token is string => token !== null)
}

const parseQueryName = (body: string) =>
  removeCommentsAndEmptyLines(body)[1].replace(/\s/gi, '').replace(/{$/, '')

type EventName = 'execute-start' | 'execute-end' | 'subscribe-start' | 'subscribe-end'

export const gqlLogger = (eventName: EventName, args1: any) => {
  // Event could be `execute-start` / `execute-end` / `subscribe-start` / `subscribe-end`
  // `args` will include the arguments passed to execute/subscribe (in case of "start" event) and additional result in case of "end" event.

  // Do not log end events, only start ones, that's when the request first hits the server
  if (eventName === 'execute-end' || eventName === 'subscribe-end') {
    return
  }

  const { args } = args1

  const operation = args?.document?.definitions?.[0]?.operation
  const queryOperationType = `${operation.split('')[0].toUpperCase()}${operation.slice(1)}`

  const documentName = args?.document?.definitions?.[0]?.name?.value ?? 'Root'
  const queryName = parseQueryName(args?.document?.definitions?.[0]?.loc.source.body)

  const ip = args.contextValue.req.ip

  // Convert params to JSON, but first we need to add quotation
  // marks (") to the keys, otherwise parsing fails
  const parseParams = (): boolean | Record<string, unknown> => {
    const body = args.document.definitions[0].loc.source.body as string
    const cleanQuery = removeCommentsAndEmptyLines(body)[1]

    const openingParenthesis = cleanQuery.split('').findIndex((str) => str === '(') + 1 // Parameters start
    const closingParenthesis = cleanQuery.split('').findIndex((str) => str === ')') // Parameters end

    if (openingParenthesis === -1 || closingParenthesis === -1) {
      return false
    }

    const fixJson = (badJSON: string) => {
      return (
        badJSON
          // Replace ":" with "@colon@" if it's between double-quotes
          .replace(/:\s*"([^"]*)"/g, function (_match, p1) {
            return ': "' + p1.replace(/:/g, '@colon@') + '"'
          })

          // Replace ":" with "@colon@" if it's between single-quotes
          .replace(/:\s*'([^']*)'/g, function (_match, p1) {
            return ': "' + p1.replace(/:/g, '@colon@') + '"'
          })

          // Add double-quotes around any tokens before the remaining ":"
          .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

          // Turn "@colon@" back into ":"
          .replace(/@colon@/g, ':')
      )
    }

    const params = `{${cleanQuery.slice(openingParenthesis, closingParenthesis)}}`
    return JSON.parse(fixJson(params))
  }

  const dateString = `[${new Date().toISOString()}]`
  const separator = ' :: '
  const logPrefix = '=> '

  const logToConsole = () =>
    nodeColorLog
      .append('\n')
      .color('yellow')
      .append(dateString)
      .reset()
      .append(separator)
      .color('magenta')
      .append(`[GQL] ${logPrefix}`)
      .color('yellow')
      .append(`${eventName} - ${queryOperationType}: `)
      .color('green')
      .append(`'${documentName}'`)
      .color('yellow')
      .append(' > ')
      .color('green')
      .append(`'${queryName}'`)
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
      .append('\nParams: ')
      .append(JSON.stringify(parseParams(), null, 2))
      .append('\n')
      .log()
  }
}
