import { Button, ButtonGroup, Colors } from '@blueprintjs/core'
import { faker } from '@faker-js/faker'
import { Order } from '@prisma/client'
import { ScreenMenuProps } from '@renderer/components/molecules'
import { OverlayMode } from '@renderer/constants/enums'
import { cn } from '@renderer/utils'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaCheckCircle, FaFilePdf } from 'react-icons/fa'
import { FaBowlRice } from 'react-icons/fa6'
import { MdDeliveryDining } from 'react-icons/md'
import { PiCookingPotBold, PiCookingPotFill } from 'react-icons/pi'
import { RiDrinks2Fill } from 'react-icons/ri'
import { TbMeat } from 'react-icons/tb'

const OrderTitle = ({ title }: { title: string }): React.ReactNode => {
  return (
    <div className="flex justify-center text-lg font-bold">
      <h3>{title}</h3>
    </div>
  )
}

interface OrderColumnProps {
  title: string
  icon?: React.ReactNode
  children?: React.ReactNode
}

// type OrderStatus = 'to_prepare' | 'preparing' | 'delivering' | 'delivered'
type OrderWithoutId = Omit<Order, 'id'>

export const Read = (): React.ReactNode => {
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

  const pratos = [
    {
      name: 'Feijoada',
      ingredients: 'Arroz, torresmo, couve, farofa e salada de tomate, alface e laranja.',
      price: 99.99,
      category: 'proteina'
    },
    {
      name: 'Picadinho',
      ingredients: 'Arroz, feijão, macarrão, farofa, batata palha e salada',
      price: 99.99,
      category: 'proteina'
    },
    {
      name: 'Strogonoff',
      ingredients: 'Arroz, batata palha e salada',
      price: 99.99,
      category: 'proteina'
    },
    {
      name: 'Feijoada',
      ingredients: 'Arroz, torresmo, couve, farofa e salada de tomate, alface e laranja.',
      price: 99.99,
      category: 'proteina'
    },
    {
      name: 'Picadinho',
      ingredients: 'Arroz, feijão, macarrão, farofa, batata palha e salada',
      price: 99.99,
      category: 'proteina'
    },
    {
      name: 'Strogonoff',
      ingredients: 'Arroz, batata palha e salada',
      price: 99.99,
      category: 'proteina'
    },
    {
      name: 'Feijoada',
      ingredients: 'Arroz, torresmo, couve, farofa e salada de tomate, alface e laranja.',
      price: 99.99,
      category: 'proteina'
    },
    {
      name: 'Picadinho',
      ingredients: 'Arroz, feijão, macarrão, farofa, batata palha e salada',
      price: 99.99,
      category: 'proteina'
    },
    {
      name: 'Strogonoff',
      ingredients: 'Arroz, batata palha e salada',
      price: 99.99,
      category: 'proteina'
    },
    {
      name: 'Feijoada',
      ingredients: 'Arroz, torresmo, couve, farofa e salada de tomate, alface e laranja.',
      price: 99.99,
      category: 'proteina'
    },
    {
      name: 'Picadinho',
      ingredients: 'Arroz, feijão, macarrão, farofa, batata palha e salada',
      price: 99.99,
      category: 'proteina'
    },
    {
      name: 'Strogonoff',
      ingredients: 'Arroz, batata palha e salada',
      price: 99.99,
      category: 'proteina'
    }
  ]

  return (
    <div className="flex flex-col gap-4 h-full justify-start">
      {/* Categorias */}

      <div className="flex flex-row gap-6 py-2 px-4 bg-lightGray4 rounded-md">
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

      <div className="flex flex-col w-full max-h-[67%] overflow-y-scroll">
        {pratos.map((prato, idx, arr) => (
          <div
            key={idx}
            className={cn('flex flex-row px-4 py-2 justify-between', {
              'bg-lightGray5': idx % 2 === 0,
              'bg-lightGray4': idx % 2 !== 0,
              'rounded-t-md': idx === 0,
              'rounded-b-md': idx === arr.length - 1
            })}
          >
            <div className="flex flex-col">
              <div>
                <b>{prato.name}</b>
              </div>

              <div>{prato.ingredients}</div>
            </div>

            <div>
              <b>R$ {prato.price}</b>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
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
