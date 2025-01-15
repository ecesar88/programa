import { graphql } from '../codegen/gql'

graphql(/* GraphQL */ `
  fragment MenuEntryVariant_Fragment on MenuEntryVariant {
    name
    description
    price
  }
`)

graphql(/* GraphQL */ `
  fragment MenuEntryLabel_Fragment on MenuEntryLabel {
    id
    name
    color
  }
`)

graphql(/* GraphQL */ `
  fragment MenuEntry_Fragment on MenuEntry {
    id
    name
    description
    labels {
      ...MenuEntryLabel_Fragment
    }
    variants {
      ...MenuEntryVariant_Fragment
    }
  }
`)

graphql(/* GraphQL */ `
  fragment RecordNotFoundError_Fragment on RecordNotFoundError {
    __typename
    message
  }
`)

graphql(/* GraphQL */ `
  fragment BaseError_Fragment on BaseError {
    __typename
    message
  }
`)

export const createMenuEntryMutationDocument = graphql(/* GraphQL */ `
  mutation createMenuEntry($data: MenuEntryInput!) {
    createMenuEntry(data: $data) {
      ...MenuEntry_Fragment
    }
  }
`)

export const updateMenuEntryMutationDocument = graphql(/* GraphQL */ `
  mutation updateMenuEntry($id: Int!, $data: MenuEntryInput!) {
    updateMenuEntry(id: $id, data: $data) {
      ... on BaseError {
        ...BaseError_Fragment
      }

      ... on RecordNotFoundError {
        ...RecordNotFoundError_Fragment
      }

      ... on MutationUpdateMenuEntrySuccess {
        data {
          ...MenuEntry_Fragment
        }
      }
    }
  }
`)

export const deleteMenuEntryMutationDocument = graphql(/* GraphQL */ `
  mutation deleteMenuEntry($id: Int!) {
    deleteMenuEntry(id: $id) {
      ... on BaseError {
        ...BaseError_Fragment
      }

      ... on RecordNotFoundError {
        ...RecordNotFoundError_Fragment
      }

      ... on MutationDeleteMenuEntrySuccess {
        data {
          ...MenuEntry_Fragment
        }
      }
    }
  }
`)

export const getAllMenuEntriesQueryDocument = graphql(/* GraphQL */ `
  query getAllMenuEntries($page: Int) {
    getAllMenuEntries(page: $page) {
      ...MenuEntry_Fragment
    }
  }
`)

export const getAllMenuEntryLabelsQueryDocument = graphql(/* GraphQL */ `
  query getAllMenuEntryLabels($page: Int) {
    getAllMenuEntryLabels(page: $page) {
      ...MenuEntryLabel_Fragment
    }
  }
`)

export const createOrUpdateMenuEntryLabelMutationDocument = graphql(/* GraphQL */ `
  mutation createOrUpdateMenuEntryLabel($id: Int, $data: MenuEntryLabelInput!) {
    createOrUpdateMenuEntryLabel(id: $id, data: $data) {
      ... on BaseError {
        ...BaseError_Fragment
      }

      ... on RecordNotFoundError {
        ...RecordNotFoundError_Fragment
      }

      ... on MutationCreateOrUpdateMenuEntryLabelSuccess {
        data {
          ...MenuEntryLabel_Fragment
        }
      }
    }
  }
`)

export const getMenuEntryByIdQueryDocument = graphql(/* GraphQL */ `
  query getMenuEntryById($id: Int!) {
    getMenuEntryById(id: $id) {
      ... on BaseError {
        ...BaseError_Fragment
      }

      ... on RecordNotFoundError {
        ...RecordNotFoundError_Fragment
      }

      ... on QueryGetMenuEntryByIdSuccess {
        data {
          ...MenuEntry_Fragment
        }
      }
    }
  }
`)

export const deleteMenuEntryLabelMutationDocument = graphql(/* GraphQL */ `
  mutation deleteMenuEntryLabel($id: Int!) {
    deleteMenuEntryLabel(id: $id) {
      ... on BaseError {
        message
      }
      ... on RecordNotFoundError {
        message
      }
      ... on MutationDeleteMenuEntryLabelSuccess {
        data {
          id
          name
          color
        }
      }
    }
  }
`)
