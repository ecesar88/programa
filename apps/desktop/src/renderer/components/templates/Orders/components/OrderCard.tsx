import { Card } from './Card'

interface OrderCardProps {
  order: {
    number: number
    dateTime: string
    address: string
    food: string
    name: string
  }
  className?: string
  onClick?: () => {}
}

export const OrderCard = (props: OrderCardProps) => {
  return (
    <div id="order-card" onClick={props.onClick}>
      <Card order={props.order} className={props.className} />
    </div>
  )
}
