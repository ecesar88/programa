import { Button, ButtonGroup } from '@blueprintjs/core'
import { DishTemplateRoundIcon } from '@renderer/assets/icons'
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { OrderEntryStoreItem } from '../store'

type OrderItemProps = {
  orderItem: OrderEntryStoreItem
  onDecreaseQuantity: (id?: number) => void
  onRemoveItem: (id?: number) => void
  onIncreaseQuantity: (id?: number) => void
  onChangeQuantity: (id?: number, qty?: number) => void
}

export const OrderItem = (props: OrderItemProps) => {
  return (
    <div className="flex flex-col bg-white bg-opacity-10 border-l-forest2 border-l-[6px] py-1 pr-2 hover:bg-lightGray4">
      {/* Order */}
      <div className="flex gap-2 justify-between pl-2 py-0.5">
        <div className="flex gap-3 items-center shrink">
          <div className="flex-2 min-w-[46px] max-w-[46px] min-h-[46px] max-h-[46px] border border-lightGray1 rounded-lg">
            <div className="transition-all flex items-center justify-center">
              <DishTemplateRoundIcon style={{ opacity: 1 }} />
            </div>
          </div>

          <div className="flex-8 flex flex-col gap-1">
            <div>
              <p className="font-bold">{props.orderItem.menuEntry?.name}</p>
            </div>

            <div>
              <p className="text-sm">{props.orderItem.menuEntry?.description}</p>
            </div>
          </div>
        </div>

        <div className="flex-3 flex flex-col shrink-0">
          <div className="flex py-0.5 items-center rounded-lg justify-end gap-1">
            <Button
              icon={<FaTrashAlt className="text-red3" />}
              onClick={() => {
                props.onRemoveItem(props?.orderItem?.id as number)
              }}
              intent="none"
              outlined
              small
            />

            <ButtonGroup className="flex items-center rounded-lg justify-end">
              <Button
                icon={<FaMinus className="text-red3" />}
                onClick={() => {
                  props.onDecreaseQuantity(props?.orderItem?.id as number)
                }}
                intent="none"
                outlined
                small
              />

              <Button
                className="font-bold !text-gray1 px-1! !border-lightgray"
                intent="none"
                outlined
                small
                disabled
              >
                <input
                  value={props.orderItem.quantity ?? 0}
                  defaultValue={props.orderItem.quantity ?? 0}
                  type="number"
                  className="max-w-[30px] bg-transparent text-center"
                  min={1}
                  max={999}
                  onChange={(evt) => {
                    const evtValue = evt.target.value

                    let newValue: string = evtValue

                    if (!newValue) newValue = '1'
                    if (parseInt(evtValue) === 0) newValue = '1'
                    if (parseInt(evtValue) >= 1000) return

                    const parsedValue = newValue.replace(/[A-Z][a-z]/gi, '')

                    props.onChangeQuantity(
                      props?.orderItem?.id as number,
                      parseInt(parsedValue) ?? 1
                    )
                  }}
                />
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
                R$ {props.orderItem.menuEntry.variant.price}
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
