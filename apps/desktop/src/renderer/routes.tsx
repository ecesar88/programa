import { RouteObject } from 'react-router'

import { ROUTES } from './constants'
import { Clients } from './screens/Clients'
import { Home } from './screens/Home'
import { Orders } from './screens/Orders'
import { Menu as MenuScreen } from './screens/Menu'

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
