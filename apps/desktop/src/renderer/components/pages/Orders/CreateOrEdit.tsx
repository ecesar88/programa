import { Button } from '@blueprintjs/core'
import { queryKeys } from '@renderer/constants'
import { useFragment } from '@renderer/queries/graphql/codegen'
import {
  MenuEntry,
  MenuEntry_FragmentFragmentDoc,
  MenuEntryVariant_FragmentFragmentDoc
} from '@renderer/queries/graphql/codegen/graphql'
import { get } from '@renderer/queries/operations/menu'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { ProductCard } from '../Menu/components/ProductCard'
import { ActionButtonsAndTotal } from './components/ActionButtonsAndTotal'
import { OrderItemsListing } from './components/OrderItemsListing'
import { OrderEntryStoreItem, orderItemsAtom } from './store'
import * as O from 'optics-ts'
import { PiCrownCrossLight } from 'react-icons/pi'

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
        const price = curr.menuEntry.variant.price // Get the price of the first variant
        const quantity = curr?.quantity ?? 1

        if (!price) return 0

        return acc + price * quantity
      }, 0),
    [orderItems]
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
        <div className="flex flex-col justify-between flex-4">
          <OrderItemsListing orderItems={orderItems} />
          <ActionButtonsAndTotal totalPrice={totalOrderPrice} />
        </div>

        <div className="flex flex-col gap-2 max-h-full overflow-hidden flex-6 pt-2">
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

                const contains = orderItems.find((orderItem) =>
                  menuEntry.variants
                    ?.flatMap(
                      (vrFragment) =>
                        useFragment(MenuEntryVariant_FragmentFragmentDoc, vrFragment).id
                    )
                    .includes(orderItem.menuEntry.variant.id)
                )

                // const contains = menuEntry?.variants?.find((variantFragment) => {
                //   const variant = useFragment(MenuEntryVariant_FragmentFragmentDoc, variantFragment)

                //   return variant.id === orderItem.menuEntry.variant.id
                // })

                return (
                  <div
                    key={menuEntry.id}
                    className="relative w-full h-full rounded-lg hover:outline-2 hover:outline-blue2 outline-none -outline-offset-2 max-h-full group"
                  >
                    {/* // Reduce item opacity if it already exists on the order */}
                    {contains && (
                      <div className="group absolute top-0 bottom-0 left-0 right-0 transition-all hover:top-[2px] hover:bottom-[2px] hover:left-[2px] hover:right-[2px]">
                        <div className="flex justify-center items-center absolute inset-0 px-5">
                          <div className="text-center z-50 opacity-0 group-hover:opacity-100 transition-all delay-1000 bg-gray1 bg-opacity-50 text-black font-bold m-auto w-full rounded-md">
                            JÁ NO PEDIDO
                          </div>
                        </div>

                        <div
                          style={{ backgroundColor: 'white', opacity: 0.75 }}
                          className="min-h-full min-w-full w-full h-full z-10 absolute rounded-none group-hover:rounded-md"
                        ></div>
                      </div>
                    )}

                    <ProductCard
                      idx={idx}
                      arrayLength={arr.length}
                      menuEntry={menuEntry}
                      onClick={(variant) => {
                        if (contains) return

                        // console.log('\n\n adicionou')

                        // const removeVariantLens = O.optic<MenuEntry>().prop('variants')
                        // // const menuEntryWithoutVariantS = O.remove(removeVariantLens)(menuEntry)
                        // const menuEntryWithoutVariantS = O.modify(removeVariantLens)((me) => {
                        //   if (!me) return

                        //   const [] = me
                        //   return m
                        // })(menuEntry)

                        // console.log('menuEntryWithoutVariantS', menuEntryWithoutVariantS)

                        // ...(menuEntry as OrderEntryStoreItem['menuEntry']),
                        // variant

                        setOrderItems((prev) => {
                          const { variants, ...me } = menuEntry
                          return [
                            ...prev,
                            {
                              id: menuEntry.id as number,
                              quantity: 1,
                              menuEntry: {
                                ...(me as OrderEntryStoreItem['menuEntry']),
                                variant
                              }
                            }
                          ]
                        })
                      }}
                    />
                  </div>
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
