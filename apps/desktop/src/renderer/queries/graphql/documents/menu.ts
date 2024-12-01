import { graphql } from '../codegen/gql'

graphql(/* GraphQL */ `
  fragment variantFragment on MenuEntryVariant {
    name
    description
    price
  }

  fragment labelFragment on MenuEntryLabel {
    id
    name
    color
  }

  fragment menuEntryFragment on MenuEntry {
    id
    name
    description
    labels {
      ...labelFragment
    }
    variants {
      ...variantFragment
    }
  }

  fragment recordNotFoundErrorFragment on RecordNotFoundError {
    __typename
    message
  }

  fragment baseErrorFragment on BaseError {
    __typename
    message
  }
`)

export const createMenuEntryMutationDocument = graphql(/* GraphQL */ `
  mutation createMenuEntry($data: MenuEntryInput!) {
    createMenuEntry(data: $data) {
      ...menuEntryFragment
    }
  }
`)

export const updateMenuEntryMutationDocument = graphql(/* GraphQL */ `
  mutation updateMenuEntry($id: Int!, $data: MenuEntryInput!) {
    updateMenuEntry(id: $id, data: $data) {
      ... on BaseError {
        ...baseErrorFragment
      }

      ... on RecordNotFoundError {
        ...recordNotFoundErrorFragment
      }

      ... on MutationUpdateMenuEntrySuccess {
        data {
          ...menuEntryFragment
        }
      }
    }
  }
`)

export const deleteMenuEntryMutationDocument = graphql(/* GraphQL */ `
  mutation deleteMenuEntry($id: Int!) {
    deleteMenuEntry(id: $id) {
      ... on BaseError {
        ...baseErrorFragment
      }

      ... on RecordNotFoundError {
        ...recordNotFoundErrorFragment
      }

      ... on MutationDeleteMenuEntrySuccess {
        data {
          ...menuEntryFragment
        }
      }
    }
  }
`)

export const getAllMenuEntriesQueryDocument = graphql(/* GraphQL */ `
  query getAllMenuEntries($page: Int) {
    getAllMenuEntries(page: $page) {
      ...menuEntryFragment
    }
  }
`)

export const getAllMenuEntryLabelsQueryDocument = graphql(/* GraphQL */ `
  query getAllMenuEntryLabels($page: Int) {
    getAllMenuEntryLabels(page: $page) {
      ...labelFragment
    }
  }
`)

export const getMenuEntryByIdQueryDocument = graphql(/* GraphQL */ `
  query getMenuEntryById($id: Int!) {
    getMenuEntryById(id: $id) {
      ... on BaseError {
        ...baseErrorFragment
      }

      ... on RecordNotFoundError {
        ...recordNotFoundErrorFragment
      }

      ... on QueryGetMenuEntryByIdSuccess {
        data {
          ...menuEntryFragment
        }
      }
    }
  }
`)
