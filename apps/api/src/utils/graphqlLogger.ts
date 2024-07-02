import nodeColorLog from 'node-color-log'

const parseQueryName = (body: string) => {
  const sanitizedQueryDocumentString: string[] = []
  const lineIsACommentOrIsEmptyPattern = new RegExp(/(^#)|(^$)/)

  body.split('\n').forEach((line) => {
    if (lineIsACommentOrIsEmptyPattern.test(line)) return
    sanitizedQueryDocumentString.push(line)
  })

  const queryName = sanitizedQueryDocumentString[1].replace(/{|\s/gi, '')
  return queryName
}

export const gqlLogger = (eventName: string, args1: any) => {
  // Event could be `execute-start` / `execute-end` / `subscribe-start` / `subscribe-end`
  // `args` will include the arguments passed to execute/subscribe (in case of "start" event) and additional result in case of "end" event.

  const { args } = args1

  const operation = args?.document?.definitions?.[0]?.operation
  const queryOperationType = `${operation.split('')[0].toUpperCase()}${operation.slice(1)}`

  const documentName = args?.document?.definitions?.[0]?.name?.value ?? 'Untitled query'
  const queryName = parseQueryName(args?.document?.definitions?.[0]?.loc.source.body)

  const ip = args.contextValue.req.ip

  // Convert params to JSON, but first we need to add quotation
  // marks (") to the keys, otherwise parsing fails
  const parseParams = (): boolean | Record<string, unknown> => {
    const body = args.document.definitions[0].loc.source.body as string

    // console.log(body)

    const openingParenthesis = body.split('').findIndex((str) => str === '(') + 1
    const closingParenthesis = body.split('').findIndex((str) => str === ')')

    if (openingParenthesis === -1 || closingParenthesis === -1) {
      return false
    }

    const params = `${body.slice(openingParenthesis, closingParenthesis)}`

    let parsedParams: string

    // Check if there are commas, otherwise newlines (\n)
    if (params.includes(',')) {
      parsedParams = params.replace(/\s?,\s?/gi, ',')
    } else {
      // Remove whitespace before or after commas
      parsedParams = params.replace(/\n/gi, ',')
    }

    const checkForCharacters = new RegExp(/(\w|\d)+/)
    const paramsParsedToJSONString = parsedParams
      .split(',')
      .map((token) => {
        if (!checkForCharacters.test(token)) {
          return null
        }

        const [key, value] = token.split(':')

        return `"${key.replace(/\s/g, '')}":${value}`
      })
      .filter((tkn) => tkn !== null) // Remove empty tokens
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
      .append('\nWith Params: ')
      .append(JSON.stringify(parseParams(), null, 2))
      .append('\n')
      .log()
  }
}
