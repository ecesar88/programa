import { Button, ButtonGroup } from '@blueprintjs/core'
import { DishTemplateRoundIcon } from '@renderer/assets/icons'
import { OrderEntry } from '@renderer/queries/graphql/codegen/graphql'
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa'

type OrderItemProps = {
  orderItem: Omit<OrderEntry, '__typename'>
  onDecreaseQuantity: (id?: number) => void
  onRemoveItem: (id?: number) => void
  onIncreaseQuantity: (id?: number) => void
}

export const OrderItem = (props: OrderItemProps) => {
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

          <div className="flex-[8] flex flex-col gap-1">
            <div>
              <p className="font-bold">{props.orderItem.menuEntry?.name}</p>
            </div>

            <div>
              <p className="text-sm">{props.orderItem.menuEntry?.description}</p>
            </div>
          </div>
        </div>

        <div className="flex-[3] flex flex-col flex-shrink-0">
          <div>
            <ButtonGroup className="flex py-0.5 items-center rounded-lg justify-end">
              <Button
                icon={
                  (props?.orderItem.quantity ?? 0) <= 1 ? (
                    <FaTrashAlt className="text-red3" />
                  ) : (
                    <FaMinus className="text-red3" />
                  )
                }
                onClick={() => {
                  if ((props.orderItem.quantity ?? 0) <= 1) {
                    props.onRemoveItem(props?.orderItem?.id as number)
                    return
                  }

                  props.onDecreaseQuantity(props?.orderItem?.id as number)
                }}
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
                {props.orderItem.quantity ?? 0}
              </Button>

              <Button
                icon={<FaPlus className="text-red3" />}
                intent="none"
                outlined
                small
                onClick={() => props.onIncreaseQuantity(props?.orderItem?.id as number)}
              />
            </ButtonGroup>
          </div>

          <div className="flex flex-col items-end">
            <div>
              <span className="font-bold text-forest4 text-xs">
                R$ {props.orderItem.menuEntry?.variants?.[0]?.price}
              </span>
            </div>

            {/* Discount ? */}
            {/* <div>
              <span className="font-bold text-xs opacity-85 line-through">
                R$ {props.menuEntry?.variants?.[0]?.price}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
