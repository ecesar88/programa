import { Button, Colors, Dialog, DialogBody } from '@blueprintjs/core'
import { faker } from '@faker-js/faker'
// import { Order } from '@prisma/client'
import { ActionButtonsRow, ScreenMenuProps } from '@renderer/components/molecules'
import { OverlayMode } from '@renderer/constants/enums'
import { cn } from '@renderer/utils'
// import { CreateOrderResolver } from '@repo/shared'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaCheckCircle } from 'react-icons/fa'
import { MdDeliveryDining } from 'react-icons/md'
import { PiCookingPotBold, PiCookingPotFill } from 'react-icons/pi'
import { CreateOrEdit } from './CreateOrEdit'
import { OrderCard } from './components/OrderCard'

const OrderTitle = ({ title }: { title: string }): React.ReactNode => {
  return (
    <div className="flex justify-center text-lg font-bold">
      <h3>{title}</h3>
    </div>
  )
}

interface OrderColumnProps {
  title: string
  onClickNewButton: () => void
  status?: string
  icon?: React.ReactNode
  children?: React.ReactNode
}

const OrderColumn = (props: OrderColumnProps): React.ReactNode => {
  return (
    <div
      id="order-column"
      className="flex flex-col items-center justify-start w-full h-full rounded-lg bg-lightGray4 max-h-full overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
        {props.icon ?? null}
        <OrderTitle title={props.title} />
      </div>

      <div className="flex flex-col w-full h-full gap-2 mt-4 overflow-y-auto pl-4 pr-4">
        {props.children}
      </div>
    </div>
  )
}

const categoriasDePedido = [
  {
    title: 'A preparar',
    status: 'to_prepare',
    icon: <PiCookingPotBold size={24} />,
    color: Colors.GRAY2,
    orders: Array.from({ length: 18 }).map(() => ({
      number: Math.floor(Math.random() * 100),
      dateTime: new Date().toISOString(),
      address: faker.location.streetAddress(),
      food: faker.internet.emoji(),
      name: faker.person.firstName()
    }))
  },
  {
    title: 'Em andamento',
    status: 'preparing',
    icon: <PiCookingPotFill size={24} />,
    color: Colors.CERULEAN2,
    orders: Array.from({ length: 8 }).map(() => ({
      number: Math.floor(Math.random() * 100),
      dateTime: new Date().toISOString(),
      address: faker.location.streetAddress(),
      food: faker.internet.emoji(),
      name: faker.person.firstName()
    }))
  },
  {
    title: 'Saiu para entrega',
    status: 'delivering',
    icon: <MdDeliveryDining size={24} />,
    color: Colors.GOLD3,
    orders: Array.from({ length: 9 }).map(() => ({
      number: Math.floor(Math.random() * 100),
      dateTime: new Date().toISOString(),
      address: faker.location.streetAddress(),
      food: faker.internet.emoji(),
      name: faker.person.firstName()
    }))
  },
  {
    title: 'Finalizado',
    status: 'delivered',
    icon: <FaCheckCircle size={20} />,
    color: Colors.FOREST3,
    orders: Array.from({ length: 12 }).map(() => ({
      number: Math.floor(Math.random() * 100),
      dateTime: new Date().toISOString(),
      address: faker.location.streetAddress(),
      food: faker.internet.emoji(),
      name: faker.person.firstName()
    }))
  }
]

// type OrderStatus = 'to_prepare' | 'preparing' | 'delivering' | 'delivered'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OrderWithoutId = Omit<any, 'id'>

type ReadOrdersProps = {
  onCreateOrEdit: () => void
}

export const Read = (props: ReadOrdersProps): React.ReactNode => {
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

  return (
    <FormProvider {...form}>
      <div className="flex flex-col w-full h-full gap-4">
        <div className="flex justify-between w-full h-full gap-4 overflow-hidden">
          {categoriasDePedido.map((categoria, idx) => (
            <React.Fragment key={idx}>
              <OrderColumn
                title={categoria.title}
                icon={categoria.icon}
                status={categoria.status}
                onClickNewButton={() => openModalOverlay(OverlayMode.NEW)}
              >
                {categoria.orders.map((pedido) => (
                  <OrderCard
                    key={Math.random()}
                    order={pedido}
                    className={cn('hover:scale-[1.015]', {
                      'bg-gray2 hover:bg-gray1': categoria.status === 'to_prepare',
                      'bg-cerulean2 hover:bg-cerulean1': categoria.status === 'preparing',
                      'bg-gold4 hover:bg-gold3 text-black': categoria.status === 'delivering',
                      'bg-forest2 hover:bg-forest1': categoria.status === 'delivered'
                    })}
                  />
                ))}
              </OrderColumn>
            </React.Fragment>
          ))}
        </div>

        <div className="w-full">
          <ActionButtonsRow
            onNewButtonClick={props.onCreateOrEdit}
            // actions={props.actions}
            // onOpenOverlay={() => {
            //   props.openOverlay(OverlayMode.NEW)
            //   setSelectedRowAtom({ data: {} })
            // }}
          />
        </div>
      </div>
    </FormProvider>
  )
}
