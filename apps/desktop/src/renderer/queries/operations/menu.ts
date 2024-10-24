import { gqlClient } from '@renderer/App'
import { CreateMenuEntryMutationVariables } from '../graphql/codegen/graphql'
import {
  createMenuEntryMutationDocument,
  deleteMenuEntryByIdMutationDocument,
  getAllMenuEntriesQueryDocument
} from '../graphql/documents/menu'

export const get = async () => {
  try {
    return await gqlClient.request(getAllMenuEntriesQueryDocument, { page: 1 })
  } catch (error) {
    console.error(error)
    return
  }
}

export const create = async (menuEntryData: CreateMenuEntryMutationVariables) => {
  try {
    return await gqlClient.request(createMenuEntryMutationDocument, menuEntryData)
  } catch (error) {
    console.error(error)
    return
  }
}

// export const edit = async ({ id, data }: { id: number; data: UserUpdateInput }) => {
//   try {
//     return await gqlClient.request(UpdateClientByIdDocument, { id, data })
//   } catch (error) {
//     console.error(error)
//     return
//   }
// }

export const purge = async (id: number) => {
  try {
    return await gqlClient.request(deleteMenuEntryByIdMutationDocument, { id })
  } catch (error) {
    console.error(error)
    return
  }
}
