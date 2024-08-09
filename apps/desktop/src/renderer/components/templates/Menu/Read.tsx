import { ScreenMenuProps } from '@renderer/components/molecules'
import { OverlayMode } from '@renderer/constants/enums'
import { useCreateOrEditOverlay } from '@renderer/hooks'
import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { selectedRowAtom } from '@renderer/store'
import { RefetchOptions } from '@tanstack/query-core'
import { useSetAtom } from 'jotai'
import React from 'react'
import { BottomButtonsRow } from './components/BottomButtonsRow'
import { CategoryBar } from './components/CategoryBar'
import { ProductCard } from './components/ProductCard'

export const Read = (props: {
  actions: ScreenMenuProps['actions'] & { refetch: (options?: RefetchOptions) => void }
  menuEntries: MenuEntry[]
  openOverlay: ReturnType<typeof useCreateOrEditOverlay>['openOverlay']
  onRowClick?: (data: MenuEntry, index: number) => void
}): React.ReactNode => {
  const setSelectedRowAtom = useSetAtom(selectedRowAtom)

  return (
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
              props.openOverlay(OverlayMode.EDIT)
              setSelectedRowAtom({ data: menuEntry })
            }}
          />
        ))}
      </div>

      <BottomButtonsRow
        actions={props.actions}
        onOpenOverlay={() => {
          props.openOverlay(OverlayMode.NEW)
          setSelectedRowAtom({ data: {} })
        }}
      />
    </div>
  )
}
