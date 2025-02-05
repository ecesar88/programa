import { Button, Colors } from '@blueprintjs/core'
import { HiDocument, HiMiniDocumentDuplicate } from 'react-icons/hi2'
import { MdDeliveryDining } from 'react-icons/md'

export type ActionButtonsAndTotalProps = {
  totalPrice: number
}

export const ActionButtonsAndTotal = (props: ActionButtonsAndTotalProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-end border-b border-b-lightgray pb-1 mb-1 items-end z-10">
        <p className="text-gray1 text-lg">Total:&nbsp;</p>
        <p className="text-gray1 font-bold text-3xl">R$ {props.totalPrice.toFixed(2)}</p>
      </div>

      <div className="grid grid-cols-2 grid-rows-3 gap-1">
        <div className="order-1">
          <Button icon={'person'} intent={'primary'} fill className="rounded-none">
            Cliente
          </Button>
        </div>

        <div className="order-2">
          <Button
            icon={<HiDocument color={Colors.GRAY1} size="16px" />}
            intent={'none'}
            fill
            className="rounded-none"
          >
            Customer note
          </Button>
        </div>

        <div className="order-3">
          <Button icon={'print'} intent={'none'} fill className="rounded-none">
            Conta
          </Button>
        </div>

        <div className="order-4">
          <Button
            icon={<HiMiniDocumentDuplicate color={Colors.GRAY1} size="18px" />}
            intent={'none'}
            fill
            className="rounded-none"
          >
            Dividir conta
          </Button>
        </div>

        <div className="order-5">
          <Button
            icon={<MdDeliveryDining color={Colors.GRAY1} size="22px" />}
            intent={'none'}
            fill
            className="rounded-none"
          >
            Delivery/Local
          </Button>
        </div>

        <div className="order-6">
          <Button icon={'floppy-disk'} intent={'warning'} fill className="rounded-none">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
