import { MutationCache, QueryCache, QueryClientConfig } from '@tanstack/query-core'

export type ReactQueryMetaErrorMessage = {
  errorMessage: string
}

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    mutations: {
      meta: {
        errorMessage: undefined
      }
    },
    queries: {
      meta: {
        errorMessage: undefined
      }
    }
  },
  mutationCache: new MutationCache(),
  queryCache: new QueryCache()
}
