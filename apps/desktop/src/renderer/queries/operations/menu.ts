import { gqlClient } from '@renderer/config/gqlClientConfig'
import {
  CreateMenuEntryMutationVariables,
  DeleteMenuEntryMutationVariables,
  UpdateMenuEntryMutationVariables
} from '../graphql/codegen/graphql'
import {
  createMenuEntryMutationDocument,
  deleteMenuEntryMutationDocument,
  getAllMenuEntriesQueryDocument,
  updateMenuEntryMutationDocument
} from '../graphql/documents/menu'

// TODO - type to variables
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

export const edit = async ({ id, data }: UpdateMenuEntryMutationVariables) => {
  console.log('daaaaaaata >> ', data)
  try {
    return await gqlClient.request(updateMenuEntryMutationDocument, { id, data })
  } catch (error) {
    console.error(error)
    return
  }
}

export const purge = async ({ id }: DeleteMenuEntryMutationVariables) => {
  try {
    return await gqlClient.request(deleteMenuEntryMutationDocument, { id })
  } catch (error) {
    console.error(error)
    return
  }
}
