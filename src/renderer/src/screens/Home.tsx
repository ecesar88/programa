import { Button, ButtonGroup } from '@blueprintjs/core'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants'
import SystemTime from '@renderer/components/SystemTime'
import { SelectedRowContextProvider } from '@renderer/context/SelectedRowContext'

export const Home = (): React.ReactNode => {
  const navigate = useNavigate()
  const location = useLocation()

  const isCurrentScreenSelected = (route: ROUTES, selectedScreen: string): boolean => {
    return selectedScreen.includes(route)
  }

  return (
    <div className="flex h-[100vh]">
      <div className="flex flex-col gap-2 p-2">
        <div className="flex justify-center h-[60px] bg-[red] text-white">LOGO</div>

        <div className="h-max">
          <ButtonGroup vertical fill large>
            <Button
              icon="person"
              intent={
                isCurrentScreenSelected(ROUTES.CLIENTS, location.pathname) ? 'primary' : 'none'
              }
              onClick={() => {
                navigate(ROUTES.CLIENTS)
              }}
            >
              Clientes
            </Button>

            <Button
              icon="annotation"
              intent={
                isCurrentScreenSelected(ROUTES.ORDERS, location.pathname) ? 'primary' : 'none'
              }
              onClick={() => {
                navigate(ROUTES.ORDERS)
              }}
            >
              Pedidos
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="w-full p-2">
        <SelectedRowContextProvider>
          <Outlet />
        </SelectedRowContextProvider>
      </div>

      <div className="absolute right-0 mt-3 mr-3">
        <SystemTime />
      </div>
    </div>
  )
}
