import nodeColorLog from 'node-color-log'
import { colorizeAsJSON } from './logger'
import { GQLDefinitions, GQLSelectionFieldArgument } from './types/graphqlDocument'

const recursivelyExtractRequestArguments = (operationArgs: GQLSelectionFieldArgument[]) => {
  // Get the arguments passed to the resolver
  const rootFieldResolverOperationArguments: Record<string, unknown> = {}

  // Populate rootFieldResolverOperationArguments with the root field operation's arguments
  for (const arg of operationArgs) {
    if (arg.value.kind === 'ListValue') continue

    rootFieldResolverOperationArguments[arg.name.value] = arg.value.value
  }

  return rootFieldResolverOperationArguments
}

const getAnonymousOperationMetaData = (listOfOperations: GQLDefinitions): OperationMetaData => {
  const operationMetaData = listOfOperations[0].selectionSet.selections[0]

  const operationType = 'mutation'
  const resolverName = operationMetaData.name.value

  const rootFieldResolverOperationArguments = recursivelyExtractRequestArguments(
    operationMetaData?.arguments
  )

  return {
    operationType,
    operationName: 'Anonymous',
    resolverName,
    arguments: rootFieldResolverOperationArguments
  }
}

const getNamedOperationMetaData = (
  listOfOperations: GQLDefinitions,
  operationNameFromRequest: string
): OperationMetaData => {
  const operationToBeRun = listOfOperations.find(
    (def) => def?.name?.value === operationNameFromRequest
  )!

  // Get the type of the operation. This is either 'query', 'mutation' or 'subscription'
  const typeOfTheOperationToBeRun: OperationType = operationToBeRun.operation

  // Get the name of the resolver to be run
  const rootFieldResolverOperationName = operationToBeRun.selectionSet.selections[0].name.value

  const rootFieldResolverOperationArguments = recursivelyExtractRequestArguments(
    operationToBeRun.selectionSet.selections[0]?.arguments
  )

  return {
    operationType: typeOfTheOperationToBeRun,
    operationName: operationToBeRun.name.value,
    resolverName: rootFieldResolverOperationName,
    arguments: rootFieldResolverOperationArguments
  }
}

/**
 * There are two ways of sending a request containing one  - or multiple - operations:
 *
 * 1 - The first one is a named operation:
 *
 * mutation deleteClientByIdMutation {
 *   deleteClient(id: 870) { ... }
 * }
 *
 * Named operations have, well, names on them.
 * Here the name of the example operation is "deleteClientByIdMutation".
 * And the resolver name is "deleteClient".
 *
 *
 * 2 - There are also anonymous operations:
 *
 * {
 *   deleteClient(id: 870) { ... }
 * }
 *
 * They are virtually the same thing, except anonymous operations do not have a name.
 * And because of that, you cannot batch the execution of anonymous operations.
 * (Cannot have more than one operation sent simultaneously)
 *
 * The job of this function is to find out if the operation is a named operation,
 * or an anonyous one.
 * We need to know that because, to log an anonymous operation requires fetching data (such as
 * the resolver name and arguments passed) from completelly different fields within the GraphQL AST.
 */
const isOperationNamedOrAnonymous = (operationNameFromRequest?: string | null) => {
  // If the operation name was not found then it's an anonymous operation
  if (!operationNameFromRequest) return 'anonymous'
  return 'named'
}

type EventName = 'execute-start' | 'execute-end' | 'subscribe-start' | 'subscribe-end'
type OperationType = 'query' | 'mutation' | 'subscription'

type OperationMetaData = {
  operationType: OperationType
  operationName: string
  resolverName: string
  arguments: Record<string, unknown> | Record<never, never>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const gqlLogger = (eventName: EventName, args1: { args: any }) => {
  // Event could be `execute-start` / `execute-end` / `subscribe-start` / `subscribe-end`
  // `args` will include the arguments passed to execute/subscribe (in case of "start" event) and additional result in case of "end" event.

  // Do not log end events, only start ones, that's when the request first hits the server
  if (eventName === 'execute-end' || eventName === 'subscribe-end') {
    return
  }

  const { args } = args1

  const ip = args.contextValue.req.ip

  /**
   * You can send two, thre, even 10 GraphQL operations to be run at once.
   *
   * Example:
   * {
   *    "query": "query getClientById { getClientById(id: 3) { id name phone } }",
   *    "operationName": "getClientById"
   * }
   * GraphQL knows which one to run based on the param called "operationName", that's actually the root field's name
   * We only need to get the data from that root operation, which is the one that is going to be executed.
   * So we search for it on the array of root fields (definitions in the object) on the AST and then get the data.
   *
   * There are three different names we use for logging:
   *  query getClientByIdQuery {
   *    getClientById(id: 3) { ... }
   *  }
   *
   * "query": This is the type of the operation that is going to be run.
   * "getClientByIdQuery": This is the name of the operation
   * "getClientById": This is the name of the resolver that is going to be run. It's called "root field" or "root operation"
   *
   */

  // Get the name of the operation
  const operationNameFromRequest = args.contextValue.params.operationName

  /**
   * Get a list of all of the operations received on the request.
   * This list is going to have all of the operations on the document sent by the client (the requesting party).
   *
   * Here's and example of a typical graphql document with multiple operations, each one with a single root-field:
   *
   * query getAllClients {
   *   getAllClients(page: 1) { ... }
   * }
   *
   * mutation deleteClientById {
   *   deleteClient(id: 870) { ... }
   * }
   *
   * query getClientByIdQuery {
   *   getClientById(id: 3) { ... }
   * }
   *
   * query searchForClients {
   *   searchClients(search: "erick") { ... }
   * }
   *
   * mutation CreateMenuEntry {
   *   createMenuEntry(name: "churrasco", description: "teste123", ) { ... }
   * }
   *
   */
  const allOperationsReceived = args.document.definitions as GQLDefinitions

  // Store the metadata of the operation for logging
  let operationMetaData: OperationMetaData = {} as OperationMetaData

  if (isOperationNamedOrAnonymous(operationNameFromRequest) === 'anonymous') {
    operationMetaData = getAnonymousOperationMetaData(allOperationsReceived)
  }

  if (isOperationNamedOrAnonymous(operationNameFromRequest) === 'named') {
    operationMetaData = getNamedOperationMetaData(allOperationsReceived, operationNameFromRequest)
  }

  const dateString = `[${new Date().toISOString()}]`
  const separator = ' :: '
  const logPrefix = '=> '
  const logElementSeparator = ' // '

  const logToConsole = () =>
    nodeColorLog
      .append('\n')
      .color('yellow')
      .append(dateString)
      .reset()
      .append(separator)
      .color('magenta')
      .append(`[GQL] ${logPrefix}`)
      .color('cyan')
      .append('EVENT: ')
      .color('green')
      .append(`'${eventName}'`)
      .color('yellow')
      .append(logElementSeparator)
      .color('cyan')
      .append('TYPE: ')
      .color('magenta')
      .append(`${operationMetaData.operationType}`)
      .color('yellow')
      .append(logElementSeparator)
      .color('cyan')
      .append('OPERATION: ')
      .color('green')
      .append(`'${operationMetaData.operationName}'`)
      .color('yellow')
      .append(logElementSeparator)
      .color('cyan')
      .append('RESOLVER: ')
      .color('green')
      .append(`'${operationMetaData.resolverName}'`)
      .color('yellow')
      .append(logElementSeparator)
      .color('cyan')
      .append(' FROM: ')
      .color('green')
      .append(`'${ip}'`)
      .reset()

  // Only log the arguments if there are arguments to be logged and if it's a query.
  // Mutations' arguments are already logged at an resolver level
  if (
    Object.values(operationMetaData.arguments).length &&
    operationMetaData.operationType !== 'mutation'
  ) {
    logToConsole()
      .append('\n')
      .color('green')
      .bold()
      .append('############# ')
      .reset()
      .bold()
      .color('cyan')
      .append('Params: ')
      .reset()
      .append(colorizeAsJSON(operationMetaData.arguments))
      .append('\n')
      .log()
  } else {
    logToConsole().log()
  }
}
