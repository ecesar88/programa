import { Button, ButtonGroup } from '@blueprintjs/core'
import { ROUTES } from '@renderer/constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdRestaurantMenu } from 'react-icons/md'
import { cn } from '@renderer/utils'

export const SystemMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isScreenSelected = (route: ROUTES): boolean => {
    return location.pathname.includes(route)
  }

  return (
    <div className="flex flex-col gap-2 p-2 pr-3 bg-lightGray5 mr-3 mt-2 mb-2 ml-2 rounded-md">
      <div className="flex justify-center h-[60px] bg-[red] text-white">LOGO</div>

      <div className="h-max flex flex-col">
        <ButtonGroup vertical fill large>
          <Button
            icon="person"
            alignText="left"
            intent={isScreenSelected(ROUTES.CLIENTS) ? 'primary' : 'none'}
            onClick={() => {
              navigate(ROUTES.CLIENTS)
            }}
          >
            Clientes
          </Button>

          <Button
            // trocar icone
            icon="annotation"
            alignText="left"
            intent={isScreenSelected(ROUTES.ORDERS) ? 'primary' : 'none'}
            onClick={() => {
              navigate(ROUTES.ORDERS)
            }}
          >
            Pedidos
          </Button>

          <Button
            icon={
              <MdRestaurantMenu
                size={24}
                className={cn({
                  // Refactor, too repetitive
                  'text-gray1': !isScreenSelected(ROUTES.MENU),
                  'text-white': isScreenSelected(ROUTES.MENU)
                })}
              />
            }
            alignText="left"
            intent={isScreenSelected(ROUTES.MENU) ? 'primary' : 'none'}
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
