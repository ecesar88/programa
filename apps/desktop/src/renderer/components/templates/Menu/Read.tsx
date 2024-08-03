import { ScreenMenuProps } from '@renderer/components/molecules'
import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { cn, getContrastingTextColor } from '@renderer/utils'
import { RefetchOptions } from '@tanstack/query-core'
import React from 'react'
import { FaBowlRice } from 'react-icons/fa6'
import { RiDrinks2Fill } from 'react-icons/ri'
import { TbMeat } from 'react-icons/tb'
import { BottomButtonsRow } from './components/BottomButtonsRow'

export const Read = (props: {
  actions: ScreenMenuProps['actions'] & { refetch: (options?: RefetchOptions) => void }
  menuEntries: MenuEntry[]
  onRowClick?: (data: MenuEntry, index: number) => void
}): React.ReactNode => {
  const renderVariantPrice = (variant: MenuEntry['variant']) => {
    if (!variant) return

    if (variant.length === 1) {
      return (
        <>
          <div className="min-w-[30px] flex flex-row">
            <b>R$&nbsp;</b>
          </div>

          <div>
            <b>{variant?.[0]?.price?.toFixed(2)}</b>
          </div>
        </>
      )
    }

    if (variant.length > 1) {
      return (
        <div className="flex flex-row">
          <p className="italic">Escolha a variante</p>
        </div>
      )
    }

    return null
  }

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
        {props.menuEntries.map((menuEntry, idx, arr) => (
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
                  <b>{menuEntry.name}</b>
                </div>

                <div>{menuEntry.description}</div>
              </div>

              <div className="flex flex-row justify-between">
                {renderVariantPrice(menuEntry.variant)}
              </div>
            </div>

            <div className="w-full pb-2 pl-4 flex flex-row gap-1">
              {menuEntry.labels?.map((label, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: `${label.color}`
                  }}
                  className="rounded-md w-fit min-w-[30px] flex justify-center px-2 py-0"
                >
                  <p
                    style={{
                      color: getContrastingTextColor(label.color as string)
                    }}
                    className="text-xs"
                  >
                    {label.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomButtonsRow actions={props.actions} />
    </div>
  )
}
