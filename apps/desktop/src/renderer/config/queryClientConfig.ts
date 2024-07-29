import { MutationCache, QueryCache, QueryClientConfig } from '@tanstack/query-core'
import { toast } from 'react-toastify'

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
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      meta: {
        errorMessage: undefined
      }
    }
  },
  mutationCache: new MutationCache(),
  queryCache: new QueryCache({
    onError: () => {
      toast('Erro interno, tente novamente mais tarde.', { type: 'error' })
    }
  })
}
