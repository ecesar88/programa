import { Button } from '@blueprintjs/core'
import { Order } from '@prisma/client'
import { ScreenMenuProps } from '@renderer/components/molecules'
import { OverlayMode } from '@renderer/constants/enums'
import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { cn } from '@renderer/utils'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaFilePdf } from 'react-icons/fa'
import { FaBowlRice } from 'react-icons/fa6'
import { RiDrinks2Fill } from 'react-icons/ri'
import { TbMeat } from 'react-icons/tb'

type OrderWithoutId = Omit<Order, 'id'>

export const Read = (props: {
  menuEntries: MenuEntry[]
  onRowClick?: (data: MenuEntry, index: number) => void
}): React.ReactNode => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [overlayMode, setOverlayMode] = useState<OverlayMode | null>(null)

  // TODO: Implementar hook useOverlay
  // const {open: {isOpen, setIsOpen}, mode: {mode, setMode}} = useOverlay()

  const form = useForm<OrderWithoutId>({
    // resolver: zodResolver(CreateOrderResolver),
    // resolver: zodResolver(CreateOrderResolver),
    defaultValues: {}
  })

  const openModalOverlay = useCallback(
    (mode: OverlayMode) => {
      setIsOverlayOpen(true)
      return setOverlayMode(mode)
    },
    [overlayMode]
  )

  const closeModalOverlay = useCallback(() => {
    setIsOverlayOpen(false)
    setOverlayMode(null)

    return false
  }, [overlayMode])

  const actions: ScreenMenuProps['actions'] = {
    onSaveClick: () => {
      // const onCreate: SubmitHandler<ClientWithoutId> = (data) => {
      //   createClientMutation(data)
      // }
      // const onEdit: SubmitHandler<ClientWithoutId> = (data) => {
      //   const { id } = rowData
      //   editClientMutation({
      //     clientId: id,
      //     clientData: data
      //   })
      // }
      // form.handleSubmit(overlayMode === OverlayMode.NEW ? onCreate : onEdit)()
    },
    onCancelClick: () => {
      form.reset()
      closeModalOverlay()
    }
  }

  const labels = [
    {
      name: 'P',
      color: '#0362fc'
    },
    {
      name: 'M',
      color: '#fc6b03'
    },
    {
      name: 'G',
      color: '#087a00'
    }
  ]

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Categorias - componentizar, trocar ícones, usar ícones mais coloridos */}

      <div className="flex flex-row flex-grow-0 flex-shrink-0 h-[75px] gap-6 py-2 px-4 bg-lightGray4 rounded-md">
        <div className="flex flex-col items-center gap-2">
          <div>
            <TbMeat size={28} />
          </div>
          <p>Proteína</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div>
            <FaBowlRice size={28} />
          </div>
          <p>Carboidratos</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div>
            <RiDrinks2Fill size={28} />
          </div>
          <p>Bebidas</p>
        </div>
      </div>

      <div className="flex flex-col flex-grow overflow-y-auto">
        {props.menuEntries.map((prato, idx, arr) => (
          <div
            key={idx}
            className={cn('flex-col gap-2', {
              'bg-lightGray5': idx % 2 === 0,
              'bg-lightGray4': idx % 2 !== 0
            })}
          >
            <div
              className={cn('flex flex-row px-4 py-2 justify-between', {
                'rounded-t-md': idx === 0,
                'rounded-b-md': idx === arr.length - 1
              })}
            >
              <div className="flex flex-col">
                <div>
                  <b>{prato.name}</b>
                </div>

                <div>{prato.description}</div>
              </div>

              <div>
                <b>R$ {prato.price}</b>
              </div>
            </div>

            <div className="w-full pb-2 pl-4 flex flex-row gap-1">
              <div className="rounded-md w-fit min-w-[30px] flex justify-center px-2 py-0 bg-[#0362fc]">
                <p className="text-xs text-white">Sem Açucar</p>
              </div>

              <div className="rounded-md w-fit min-w-[30px] flex justify-center px-2 py-0 bg-[#fc6b03]">
                <p className="text-xs text-white">Sem Glúten</p>
              </div>

              <div className="rounded-md w-fit min-w-[30px] flex justify-center px-2 py-0 bg-[#087a00]">
                <p className="text-xs text-white">G</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between flex-grow-0 flex-shrink-0 h-[35px]">
        <div>
          <Button
            icon={'plus'}
            intent={'success'}
            onClick={() => {
              alert('Exportado')
            }}
          >
            Novo
          </Button>
        </div>

        <div>
          <Button
            icon={<FaFilePdf size={20} className="text-red3" />}
            intent={'none'}
            onClick={() => {
              alert('Exportado')
            }}
          >
            Exportar em PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
