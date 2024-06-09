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
    <div onClick={props.onClick}>
      <Card order={props.order} className={props.className} />
    </div>
  )
}
