import { Label } from '@renderer/components/molecules'
import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { cn } from '@renderer/utils'
import { Price } from './Price'
import { Button } from '@blueprintjs/core'
import { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'

interface ProductCardProps {
  idx: number
  arrayLength: number
  menuEntry: MenuEntry
  onClick: () => void
  className?: string
}

const renderVariantPrice = (
  variants: MenuEntry['variants'],
  onClickCallback: () => void,
  isVariantSelectorOpen: boolean
) => {
  if (!variants) return

  if (variants.length === 1) {
    return <Price price={variants[0].price as number} />
  }

  if (variants.length > 1) {
    return (
      <Button
        onClick={onClickCallback}
        intent="none"
        small
        outlined
        className="rounded-md h-fit !py-1 [&_*]:!cursor-pointer !cursor-pointer"
        icon={
          <FaChevronRight
            className={cn('transition-all', { 'rotate-90': isVariantSelectorOpen })}
          />
        }
      >
        <p>{variants.length} variantes</p>
      </Button>
    )
  }

  return null
}

export const ProductCard = (props: ProductCardProps) => {
  const [showVariantSelector, setShowVariantSelector] = useState(false)

  const areThereMoreThanOneSingleVariant = (props?.menuEntry?.variants?.length ?? 0) > 1
  const areThereAnyLabelsToShow = (props.menuEntry.labels?.length ?? 0) > 1

  return (
    <div
      key={props.idx}
      className="rounded-lg hover:outline-2 hover:outline-blue2 outline-none -outline-offset-2 h-full max-h-full"
    >
      <div
        onClick={() => {
          if (areThereMoreThanOneSingleVariant) {
            return
          }

          props.onClick()
        }}
        className={cn(
          'flex-col gap-2',
          {
            '[&_*]:!cursor-pointer !cursor-pointer': !areThereMoreThanOneSingleVariant,
            'bg-lightGray5': props.idx % 2 === 0,
            'bg-lightGray4': props.idx % 2 !== 0
          },
          props.className
        )}
      >
        <div
          className={cn('flex flex-row px-4 py-2 justify-between', {
            'rounded-t-md': props.idx === 0,
            'rounded-b-md': props.idx === props.arrayLength - 1
          })}
        >
          <div className="flex flex-col">
            <div>
              <b>{props.menuEntry.name}</b>
            </div>

            <div>{props.menuEntry.description}</div>
          </div>

          <div className="flex flex-row justify-between">
            {renderVariantPrice(
              props.menuEntry.variants,
              () => setShowVariantSelector((prev) => !prev),
              showVariantSelector
            )}
          </div>
        </div>

        {areThereAnyLabelsToShow && (
          <div className="w-full pb-2 pl-4 flex flex-row gap-1">
            {props.menuEntry.labels?.map((label, idx) => (
              <Label key={idx} name={label.name} color={label.color} />
            ))}
          </div>
        )}

        <div
          className={cn('h-0 !overflow-clip transition-all', {
            'h-full pb-2 pr-2': showVariantSelector
          })}
        >
          {areThereMoreThanOneSingleVariant && (
            <div className="transition-all pl-4">
              <div
                className={
                  'flex flex-row justify-start gap-3 rounded-lg bg-transparent p-2 bg-lightGray1'
                }
              >
                {props.menuEntry.variants?.map((variant, idx) => (
                  <div
                    key={idx}
                    className="rounded-md border border-gray2 py-1 px-4 flex flex-col items-center bg-gray2 text-white hover:bg-gray1"
                  >
                    <div className="flex flex-row items-center text-xs">{variant.name}</div>

                    <div className="font-bold">R$ {variant.price?.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
