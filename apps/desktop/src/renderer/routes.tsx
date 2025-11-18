import { RouteObject } from 'react-router'

import { ROUTES } from './constants'
import { Clients } from './pages/Clients'
import { Home } from './pages/Home'
import { Orders } from './pages/Orders'
import { Menu as MenuScreen } from './pages/Menu'

export const routes: RouteObject[] = [
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
      },
      {
        path: ROUTES.MENU,
        element: <MenuScreen />
      }
    ]
  }
]
