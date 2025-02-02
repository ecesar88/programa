import { Button } from '@blueprintjs/core'
import { queryKeys } from '@renderer/constants'
import { useFragment } from '@renderer/queries/graphql/codegen'
import { MenuEntry_FragmentFragmentDoc } from '@renderer/queries/graphql/codegen/graphql'
import { get } from '@renderer/queries/operations/menu'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useFormContext } from 'react-hook-form'
import { ProductCard } from '../Menu/components/ProductCard'
import { OrderItem } from './components/OrderItem'
import { orderItemsAtom } from './store'

type CreateOrEditProps = {
  isLoading?: boolean
  onBackward?: () => void
  // overlayMode: OverlayMode | null
}

export const CreateOrEdit = (props: CreateOrEditProps): React.ReactNode => {
  const {
    register,
    reset,
    formState: { errors }
  } = useFormContext()

  const menuEntriesQuery = useQuery({
    queryKey: queryKeys['menu']['getAll'],
    queryFn: get,
    meta: {
      errorMessage: 'Erro ao obter o cardápio'
    }
  })

  const orderItems = useAtomValue(orderItemsAtom)

  return (
    <div className="flex flex-col gap-1 justify-between max-h-full">
      {/* <ModalTitle title={props.overlayMode === OverlayMode.NEW ? 'Novo Pedido' : 'Editar Pedido'} /> */}

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

      <div className="flex flex-row gap-4 border-t border-t-lightGray1 mt-3 max-h-full overflow-hidden">
        <div className="flex flex-col justify-start flex-grow flex-[4]">
          {orderItems.map((orderItem) => (
            <OrderItem key={orderItem.id} {...orderItem} />
          ))}
        </div>

        <div className="flex flex-col gap-2 max-h-full overflow-hidden flex-[1]">
          <div>search ?</div>

          <div className="flex flex-col">
            {menuEntriesQuery.data?.getAllMenuEntries?.length ? (
              menuEntriesQuery.data?.getAllMenuEntries?.map((menuEntryFragment, idx, arr) => {
                const menuEntry = useFragment(MenuEntry_FragmentFragmentDoc, menuEntryFragment)

                return (
                  <ProductCard
                    key={menuEntry.id}
                    idx={idx}
                    arrayLength={arr.length}
                    menuEntry={menuEntry}
                    onClick={() => {
                      // props.openOverlay(OverlayMode.EDIT)
                      // setSelectedRowAtom({ data: menuEntry })
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
