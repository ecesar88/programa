import { Button, ButtonGroup } from '@blueprintjs/core'
import { DishTemplateRoundIcon } from '@renderer/assets/icons'
import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { orderItemsAtom } from '../store'

let timer: NodeJS.Timeout
const MOUSEDOWN_DELAY = 300

// interface OrderItemProps extends MenuEntry {}

export const OrderItem = (props: Omit<MenuEntry, 'id' | '__typename'>) => {
  const orderItems = useSetAtom(orderItemsAtom)

  const [isMouseHolding, setIsMouseHolding] = useState(false)
  const [qty, setQty] = useState<number>(0)

  const stopIncrementingOrDecrementing = () => {
    clearInterval(timer)
  }

  const decreaseAmount = () => {
    timer = setInterval(() => setQty((prev) => (prev <= 0 ? 0 : prev - 1)), MOUSEDOWN_DELAY)
  }

  const increaseAmount = () => {
    timer = setInterval(() => {
      setQty((prev) => (prev <= 0 ? 0 : prev + 1))
    }, MOUSEDOWN_DELAY)
  }

  const changeIsMouseHolding = (isMouseHolding: boolean) => setIsMouseHolding(isMouseHolding)

  useEffect(() => {
    if (isMouseHolding) {
      increaseAmount()
    } else {
      decreaseAmount()
    }
  }, [isMouseHolding])

  return (
    <div className="flex flex-col bg-white bg-opacity-10 border-l-forest2 border-l-[6px] py-1 pr-2 hover:bg-lightGray4">
      {/* Order */}
      <div className="flex gap-2 justify-between pl-2 py-0.5">
        <div className="flex gap-3 items-center flex-shrink">
          <div className="flex-[2] min-w-[46px] max-w-[46px] min-h-[46px] max-h-[46px] border border-lightGray1 rounded-lg">
            <div className="transition-all flex items-center justify-center">
              <DishTemplateRoundIcon style={{ opacity: 1 }} />
            </div>
          </div>

          <div className="flex-[8]">
            <p className="font-bold">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>

        <div className="flex-[3] flex flex-col flex-shrink-0">
          <div>
            <ButtonGroup className="flex py-0.5 items-center rounded-lg justify-end">
              <Button
                icon={<FaMinus className="text-red3" />}
                intent="none"
                outlined
                small
                // onMouseDown={decreaseAmount}
                // onMouseUp={stopIncrementingOrDecrementing}
              />

              <Button
                className="font-bold !text-gray1 !px-3 !border-lightgray"
                intent="none"
                outlined
                small
                disabled
              >
                {qty}
              </Button>

              <Button
                icon={<FaPlus className="text-red3" />}
                intent="none"
                outlined
                small
                onMouseDown={() => changeIsMouseHolding(true)}
                onMouseUp={() => changeIsMouseHolding(false)}
              />
            </ButtonGroup>
          </div>

          <div className="flex flex-col items-end">
            <div>
              <span className="font-bold text-forest4 text-xs">R$ &nbsp;&nbsp;98,00</span>
            </div>

            <div>
              <span className="font-bold text-xs opacity-85 line-through">R$ 108,00</span>
            </div>
          </div>
          {/* total */}
        </div>
      </div>
    </div>
  )
}
