import { Button } from '@blueprintjs/core'
import { cn } from '@renderer/utils'
import { FaTrashAlt } from 'react-icons/fa'

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
        `group text-white w-full h-full min-h-[40px] rounded shadow-md flex flex-row justify-between p-2 items-center transition-all bg-gray1 overflow-clip **:cursor-pointer! cursor-pointer!`,
        props.className
      )}
    >
      <div>Pedido #{props.order.number}</div>

      <div className="flex items-center gap-2 relative left-11 group-hover:left-0 transition-all">
        <div>{props.order.name}</div>

        <div>
          <Button
            className="rounded"
            icon={<FaTrashAlt className="text-white" />}
            fill
            intent="danger"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
