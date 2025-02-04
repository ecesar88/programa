import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { OrderItem } from './OrderItem'
import { DishTemplateRoundIcon } from '@renderer/assets/icons'

type OrderItemsProps = {
  orderItems: MenuEntry[]
}

export const OrderItemsListing = (props: OrderItemsProps) => {
  return (
    <div className="flex flex-col justify-start flex-grow flex-[4] min-w-[40%] z-10 relative overflow-auto">
      <div className="absolute inset-0 z-[-1] mt-24">
        <DishTemplateRoundIcon style={{ opacity: 0.1 }} />
      </div>

      {props.orderItems.map((orderItem) => (
        <OrderItem key={orderItem.id} {...orderItem} />
      ))}
    </div>
  )
}
