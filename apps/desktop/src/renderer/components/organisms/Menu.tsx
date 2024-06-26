import { Button, ButtonGroup } from '@blueprintjs/core'
import { ROUTES } from '@renderer/constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdRestaurantMenu } from 'react-icons/md'

export const Menu = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isCurrentScreenSelected = (route: ROUTES, selectedScreen: string): boolean => {
    return selectedScreen.includes(route)
  }

  return (
    <div className="flex flex-col gap-2 p-2 pr-3 bg-lightGray5 mr-3">
      <div className="flex justify-center h-[60px] bg-[red] text-white">LOGO</div>

      <div className="h-max flex flex-col">
        <ButtonGroup vertical fill large>
          <Button
            // trocar icone
            icon="person"
            intent={isCurrentScreenSelected(ROUTES.CLIENTS, location.pathname) ? 'primary' : 'none'}
            onClick={() => {
              navigate(ROUTES.CLIENTS)
            }}
          >
            Clientes
          </Button>

          <Button
            // trocar icone
            icon="annotation"
            intent={isCurrentScreenSelected(ROUTES.ORDERS, location.pathname) ? 'primary' : 'none'}
            onClick={() => {
              navigate(ROUTES.ORDERS)
            }}
          >
            Pedidos
          </Button>

          <Button
            icon={<MdRestaurantMenu size={24} className="text-gray1" />}
            intent={isCurrentScreenSelected(ROUTES.MENU, location.pathname) ? 'primary' : 'none'}
            onClick={() => {
              navigate(ROUTES.MENU)
            }}
          >
            Cardápio
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
