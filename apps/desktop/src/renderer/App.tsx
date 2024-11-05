// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'
import { BlueprintProvider } from '@blueprintjs/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DevTools } from 'jotai-devtools'
import { queryClientAtom } from 'jotai-tanstack-query'
import { Provider as JotaiProvider } from 'jotai/react'
import { useHydrateAtoms } from 'jotai/react/utils'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import './assets/scrollbar.css'
import { ErrorBoundary } from './components/templates/not_working_ErrorBoundary'
import { queryClientConfig } from './config/queryClientConfig'
import './i18n'
import { routes } from './routes'

const queryClient = new QueryClient(queryClientConfig)

const HydrateAtoms = ({ children }): React.ReactNode => {
  useHydrateAtoms([[queryClientAtom, queryClient]])
  return children
}

function App(): JSX.Element {
  // Electron IPC, not handling this at the moment
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const router = createBrowserRouter(routes, {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true
    }
  })

  return (
    <>
      <ErrorBoundary>
        <BlueprintProvider>
          <QueryClientProvider client={queryClient}>
            <JotaiProvider>
              <DevTools />

              {/*
              // Jotai React Query
              This Provider initialisation step is needed so that we reference the same
              queryClient in both atomWithQuery and other parts of the app. Without this,
              our useQueryClient() hook will return a different QueryClient object
        */}
              <HydrateAtoms>
                <RouterProvider router={router} future={{ v7_startTransition: true }} />
              </HydrateAtoms>
            </JotaiProvider>

            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </BlueprintProvider>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </ErrorBoundary>
    </>
  )
}

export default App
