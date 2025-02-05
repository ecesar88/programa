import { DishTemplateRoundIcon } from '@renderer/assets/icons'
import { OrderEntry } from '@renderer/queries/graphql/codegen/graphql'
import { useSetAtom } from 'jotai'
import { orderItemsAtom } from '../store'
import { OrderItem } from './OrderItem'

type OrderItemsProps = {
  orderItems: OrderEntry[]
}

export const OrderItemsListing = (props: OrderItemsProps) => {
  const setOrderItems = useSetAtom(orderItemsAtom)

  const handleDecreaseQuantity = (id?: number) => {
    setOrderItems((prev) => {
      const newOrderItems = prev.map((orderItem) => {
        if (orderItem.id === id) {
          return {
            ...orderItem,
            quantity: (orderItem.quantity ?? 0) - 1
          }
        }

        return orderItem
      })

      return newOrderItems
    })
  }

  const handleRemoveItem = (id?: number) => {
    setOrderItems((prev) => {
      const filteredItems = prev.filter((orderItem) => orderItem?.id !== id)

      return filteredItems
    })
  }

  const handleIncreaseQuantity = (id?: number) => {
    setOrderItems((prev) => {
      const newOrderItems = prev.map((orderItem) => {
        if (orderItem.id === id) {
          return {
            ...orderItem,
            quantity: (orderItem.quantity ?? 0) + 1
          }
        }

        return orderItem
      })

      return newOrderItems
    })
  }

  return (
    <div className="flex flex-col justify-start flex-grow flex-[4] min-w-[40%] z-10 relative overflow-auto gap-1">
      <div className="absolute inset-0 z-[-1] mt-24">
        <DishTemplateRoundIcon style={{ opacity: 0.1 }} />
      </div>

      {props.orderItems.map((orderItem) => (
        <OrderItem
          key={orderItem.id}
          orderItem={orderItem}
          onRemoveItem={handleRemoveItem}
          onDecreaseQuantity={handleDecreaseQuantity}
          onIncreaseQuantity={handleIncreaseQuantity}
        />
      ))}
    </div>
  )
}
