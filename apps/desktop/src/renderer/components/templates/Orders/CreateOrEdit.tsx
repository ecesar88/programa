import { Button } from '@blueprintjs/core'
import { queryKeys } from '@renderer/constants'
import { useFragment } from '@renderer/queries/graphql/codegen'
import {
  MenuEntry_FragmentFragmentDoc,
  OrderEntry
} from '@renderer/queries/graphql/codegen/graphql'
import { get } from '@renderer/queries/operations/menu'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { ProductCard } from '../Menu/components/ProductCard'
import { ActionButtonsAndTotal } from './components/ActionButtonsAndTotal'
import { OrderItemsListing } from './components/OrderItemsListing'
import { orderItemsAtom } from './store'
import { useMemo } from 'react'
import { cn } from '@renderer/utils'

const orderContainsMenuEntry = (orderItems: number[], menuEntryId: number) =>
  orderItems.includes(menuEntryId)

type CreateOrEditProps = {
  isLoading?: boolean
  onBackward?: () => void
  // overlayMode: OverlayMode | null
}

export const CreateOrEdit = (props: CreateOrEditProps): React.ReactNode => {
  // const {
  //   register,
  //   reset,
  //   formState: { errors }
  // } = useFormContext()

  const menuEntriesQuery = useQuery({
    queryKey: queryKeys['menu']['getAll'],
    queryFn: get,
    meta: {
      errorMessage: 'Erro ao obter o cardápio'
    }
  })

  const [orderItems, setOrderItems] = useAtom(orderItemsAtom)

  const totalOrderPrice = useMemo(
    () =>
      orderItems.reduce((acc, curr) => {
        const price = curr.menuEntry?.variants?.[0]?.price // Get the price of the first variant
        const quantity = curr?.quantity ?? 1

        if (!price) return 0

        return acc + price * quantity
      }, 0),
    [JSON.stringify(orderItems)]
  )

  return (
    <div className="flex flex-col gap-1 justify-between max-h-full">
      <div className="flex gap-2 items-center">
        <div>
          <Button
            icon={'arrow-left'}
            outlined
            intent={'none'}
            onClick={() => {
              props.onBackward?.()
            }}
          >
            Back
          </Button>
        </div>

        <div>
          <p>NOVO PEDIDO</p>
        </div>
      </div>

      <div className="flex flex-row gap-4 border-t border-t-lightGray1 mt-3 max-h-full overflow-hidden">
        <div className="flex flex-col justify-between flex-[4]">
          <OrderItemsListing orderItems={orderItems} />
          <ActionButtonsAndTotal totalPrice={totalOrderPrice} />
        </div>

        <div className="flex flex-col gap-2 max-h-full overflow-hidden flex-[6] pt-2">
          <div className="pt-2">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray3 w-full p-1 rounded-md"
            />
          </div>

          <div className="flex flex-col overflow-auto">
            {menuEntriesQuery.data?.getAllMenuEntries?.length ? (
              menuEntriesQuery.data?.getAllMenuEntries?.map((menuEntryFragment, idx, arr) => {
                const menuEntry = useFragment(MenuEntry_FragmentFragmentDoc, menuEntryFragment)

                const contains = orderContainsMenuEntry(
                  orderItems.map((orderItem) => orderItem.id) as number[],
                  menuEntry.id as number
                )

                return (
                  <ProductCard
                    key={menuEntry.id}
                    idx={idx}
                    arrayLength={arr.length}
                    menuEntry={menuEntry}
                    className={cn({
                      // '!text-gray4 cursor-grab': contains
                      'opacity-20': contains // border gets a little lighter
                    })}
                    onClick={() => {
                      if (contains) return

                      setOrderItems((prev) => [
                        ...prev,
                        { id: menuEntry.id, menuEntry, quantity: 1 }
                      ])
                    }}
                  />
                )
              })
            ) : (
              <>no data</>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
