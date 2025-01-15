import { gqlClient } from '@renderer/config/gqlClientConfig'
import {
  CreateMenuEntryMutationVariables,
  CreateOrUpdateMenuEntryLabelMutationVariables,
  DeleteMenuEntryMutationVariables,
  MutationDeleteMenuEntryLabelArgs,
  UpdateMenuEntryMutationVariables
} from '../graphql/codegen/graphql'
import {
  createMenuEntryMutationDocument,
  createOrUpdateMenuEntryLabelMutationDocument,
  deleteMenuEntryLabelMutationDocument,
  deleteMenuEntryMutationDocument,
  getAllMenuEntriesQueryDocument,
  getAllMenuEntryLabelsQueryDocument,
  updateMenuEntryMutationDocument
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

export const edit = async ({ id, data }: UpdateMenuEntryMutationVariables) => {
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

//*************************************** MENU ENTRY LABEL ****************************************** */

export const getAllMenuEntryLabels = async () => {
  try {
    return await gqlClient.request(getAllMenuEntryLabelsQueryDocument, { page: 1 })
  } catch (error) {
    console.error(error)
    return
  }
}

export const createOrUpdateMenuEntryLabel = async ({
  id,
  data
}: CreateOrUpdateMenuEntryLabelMutationVariables) => {
  try {
    return await gqlClient.request(createOrUpdateMenuEntryLabelMutationDocument, { id, data })
  } catch (error) {
    console.error(error)
    return
  }
}

export const deleteMenuEntryLabel = async ({ id }: MutationDeleteMenuEntryLabelArgs) => {
  try {
    return await gqlClient.request(deleteMenuEntryLabelMutationDocument, { id })
  } catch (error) {
    console.error(error)
    return
  }
}
