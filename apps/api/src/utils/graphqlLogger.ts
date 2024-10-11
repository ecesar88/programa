import nodeColorLog from 'node-color-log'
import { colorizeAsJSON } from './logger'
import { GQLDefinitions } from './types/graphqlDocument'

type EventName = 'execute-start' | 'execute-end' | 'subscribe-start' | 'subscribe-end'

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

  const operationToBeRun = allOperationsReceived.find(
    (def) => def.name.value === operationNameFromRequest
  )!

  // Get the type of the operation. This is either 'query', 'mutation' or 'subscription'
  const typeOfTheOperationToBeRun: 'query' | 'mutation' | 'subscription' =
    operationToBeRun.operation

  const rootFieldOperationName = operationToBeRun.selectionSet.selections[0].name.value
  const rootFieldOperationArguments: Record<string, unknown> = {}

  // Populate rootFieldOperationArguments with the root field operation's arguments
  operationToBeRun.selectionSet.selections[0]?.arguments?.forEach((arg) => {
    rootFieldOperationArguments[arg.name.value] = arg.value.value
  })

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
      .append(`${eventName} - ${typeOfTheOperationToBeRun}: `)
      .color('green')
      .append(`'${operationToBeRun.name.value}'`)
      .color('yellow')
      .append(' > ')
      .color('green')
      .append(`'${rootFieldOperationName}'`)
      .reset()
      .append(' from ')
      .color('yellow')
      .append(ip)
      .reset()

  // Only log the arguments if there are arguments to be logged
  if (Object.values(rootFieldOperationArguments).length) {
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
      .append(colorizeAsJSON(rootFieldOperationArguments))
      .append('\n')
      .log()
  } else {
    logToConsole().log()
  }
}
