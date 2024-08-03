/* eslint-disable @typescript-eslint/no-explicit-any */
import nodeColorLog from 'node-color-log'
import {
  capitalize,
  findIndexOfFirstLineThatIsAnOperation,
  fixJson,
  removeCommentsAndEmptyLines
} from './misc'

type EventName = 'execute-start' | 'execute-end' | 'subscribe-start' | 'subscribe-end'

export const gqlLogger = (eventName: EventName, args1: any) => {
  // Event could be `execute-start` / `execute-end` / `subscribe-start` / `subscribe-end`
  // `args` will include the arguments passed to execute/subscribe (in case of "start" event) and additional result in case of "end" event.

  // Do not log end events, only start ones, that's when the request first hits the server
  if (eventName === 'execute-end' || eventName === 'subscribe-end') {
    return
  }

  const { args } = args1

  const body = args.document.definitions[0].loc.source.body as string
  const cleanQuery = removeCommentsAndEmptyLines(body)

  const operation = args?.document?.definitions?.[0]?.operation

  const getOperationStringStart = (idx = 0) =>
    cleanQuery[findIndexOfFirstLineThatIsAnOperation(cleanQuery) + idx]

  const operationNameFromDocument = capitalize(getOperationStringStart()).split(' ')[0]

  const queryOperationType = operation ? capitalize(operation) : operationNameFromDocument

  const documentName = (
    getOperationStringStart()?.split(' ')[1] ??
    args?.document?.definitions?.[0]?.name?.value ??
    'Root'
  ).split('(')[0] // Remove params from document name

  const queryName =
    getOperationStringStart(1)?.length > 3
      ? getOperationStringStart(1).replace(/\s/gi, '').replace(/{$/, '').replace(/\(.*/gi, '')
      : 'Unnamed Query'

  const ip = args.contextValue.req.ip

  // Convert params to JSON, but first we need to add quotation
  // marks (") to the keys, otherwise parsing fails
  const parseParams = (): boolean | Record<string, unknown> => {
    const operationLineIndex = findIndexOfFirstLineThatIsAnOperation(cleanQuery)

    const queryOperation = cleanQuery[operationLineIndex + 1]

    const openingParenthesis = queryOperation.split('').findIndex((str) => str === '(') + 1 // Parameters start
    const closingParenthesis = queryOperation.split('').findIndex((str) => str === ')') // Parameters end

    if (openingParenthesis === -1 || closingParenthesis === -1) {
      return false
    }

    const params = `{${queryOperation.slice(openingParenthesis, closingParenthesis)}}`
    return params.includes('$') ? params : JSON.parse(fixJson(params)) // "$" breaking parsing
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
    logToConsole().log()
  } else {
    logToConsole()
      .append('\nParams: ')
      .append(JSON.stringify(parseParams(), null, 2))
      .append('\n')
      .log()
  }
}
