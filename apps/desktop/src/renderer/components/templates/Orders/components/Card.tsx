import { cn } from '@renderer/utils'

interface CardProps {
  className?: string
  order: {
    number: number
    dateTime: string
    address: string
    food: string
    name: string
  }
}

export const Card = (props: CardProps) => {
  return (
    <div
      className={cn(
        `text-white w-full h-full min-h-[40px] rounded shadow-md flex flex-row justify-between p-2 items-center transition-all bg-gray1`,
        props.className
      )}
    >
      <div className="">Pedido #{props.order.number}</div>

      <div>{props.order.name}</div>
    </div>
  )
}
