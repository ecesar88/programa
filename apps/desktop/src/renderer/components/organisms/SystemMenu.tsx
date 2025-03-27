import { Button, ButtonGroup, ButtonProps } from '@blueprintjs/core'
import { ROUTES } from '@renderer/constants'
import { useLocation, useNavigate } from 'react-router'
import { MdRestaurantMenu } from 'react-icons/md'
import { cn } from '@renderer/utils'

export const SystemMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isScreenSelected = (route: ROUTES): boolean => location.pathname.includes(route)

  const getIntentForSelected = (route: ROUTES): ButtonProps['intent'] =>
    isScreenSelected(route) ? 'primary' : 'none'

  return (
    <div className="flex flex-col gap-2 p-2 pr-3 bg-lightGray5 mr-3 mt-2 mb-2 ml-2 rounded-md">
      <div className="flex justify-center h-[60px] bg-[red] text-white">LOGO</div>

      <div className="h-max flex flex-col">
        <ButtonGroup vertical fill large>
          <Button
            icon="person"
            alignText="left"
            intent={getIntentForSelected(ROUTES.CLIENTS)}
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
            intent={getIntentForSelected(ROUTES.ORDERS)}
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
            intent={getIntentForSelected(ROUTES.MENU)}
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
