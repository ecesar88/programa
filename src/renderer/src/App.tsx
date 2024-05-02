// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'
import { BlueprintProvider } from '@blueprintjs/core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './constants'
import { Clients } from './screens/Clients'
import { Home } from './screens/Home'
import { Orders } from './screens/Orders'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <Home />,
      children: [
        {
          path: ROUTES.CLIENTS,
          element: <Clients />
        },
        {
          path: ROUTES.ORDERS,
          element: <Orders />
        }
      ]
    }
  ])

  return (
    <BlueprintProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BlueprintProvider>
  )
}

export default App
