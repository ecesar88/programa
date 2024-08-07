import { Dialog } from '@renderer/components'
import { ScreenMenuProps } from '@renderer/components/molecules'
import { OverlayMode } from '@renderer/constants/enums'
import { useCreateOrEditOverlay } from '@renderer/hooks'
import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { selectedRowAtom } from '@renderer/store'
import { RefetchOptions } from '@tanstack/query-core'
import { useSetAtom } from 'jotai'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BottomButtonsRow } from './components/BottomButtonsRow'
import { CategoryBar } from './components/CategoryBar'
import { ProductCard } from './components/ProductCard'
import { CreateOrEditModal } from './CreateOrEdit'

export const Read = (props: {
  actions: ScreenMenuProps['actions'] & { refetch: (options?: RefetchOptions) => void }
  menuEntries: MenuEntry[]
  onRowClick?: (data: MenuEntry, index: number) => void
}): React.ReactNode => {
  // refactor, pass state using jotai, get and set like the client's modal
  const { openOverlay, closeOverlay, isOverlayOpen, overlayMode } = useCreateOrEditOverlay()

  const setSelectedRowAtom = useSetAtom(selectedRowAtom)

  // const {
  //   data: { set }
  // } = useSelectedRow<MenuEntry>()

  const form = useForm<Omit<MenuEntry, '__typename'>>({
    // resolver: zodResolver<any>(CreateClientResolver),
    defaultValues: {}
  })

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-4 h-full">
        {/* Categorias - trocar ícones, usar ícones mais coloridos */}
        <CategoryBar />

        <div className="flex flex-col flex-grow overflow-y-auto">
          {props.menuEntries.map((menuEntry, idx, arr) => (
            <ProductCard
              key={menuEntry.id}
              idx={idx}
              arrayLength={arr.length}
              menuEntry={menuEntry}
              onClick={() => {
                openOverlay(OverlayMode.NEW)
                setSelectedRowAtom({ data: menuEntry })
              }}
            />
          ))}
        </div>

        <BottomButtonsRow actions={props.actions} />
      </div>

      <Dialog isOpen={isOverlayOpen} onClose={closeOverlay}>
        <CreateOrEditModal overlayMode={overlayMode} onCancel={closeOverlay} />
      </Dialog>
    </FormProvider>
  )
}
