import { MutationCache, QueryCache, QueryClientConfig } from '@tanstack/query-core'
import { Id, toast } from 'react-toastify'

const errorToast = (message: string): Id => toast(message, { type: 'error' })

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
  mutationCache: new MutationCache({
    onError: (error, variables, context): void => {
      // if ((query.meta as ReactQueryMetaErrorMessage).errorMessage) {
      //   errorToast((query.meta as ReactQueryMetaErrorMessage).errorMessage)
      // }

      console.log(variables, context)
      console.log('ReactQuery Mutation error: \n', error)
    }
  }),
  queryCache: new QueryCache({
    onError: (error, query): void => {
      if ((query.meta as ReactQueryMetaErrorMessage).errorMessage) {
        errorToast((query.meta as ReactQueryMetaErrorMessage).errorMessage)
      }

      console.log('ReactQuery Query error: \n', error)
    }
  })
}
