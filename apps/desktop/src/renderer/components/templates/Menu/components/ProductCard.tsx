import { Label } from '@renderer/components/molecules'
import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { cn } from '@renderer/utils'
import { Price } from './Price'

interface ProductCardProps {
  idx: number
  arrayLength: number
  menuEntry: MenuEntry
  onClick: () => void
}

const renderVariantPrice = (variant: MenuEntry['variants']) => {
  if (!variant) return

  if (variant.length === 1) {
    return <Price price={variant[0].price as number} />
  }

  if (variant.length > 1) {
    return (
      <div className="flex flex-row">
        <p>{variant.length} variantes</p>
      </div>
    )
  }

  return null
}

export const ProductCard = (props: ProductCardProps) => {
  return (
    <div
      key={props.idx}
      className="rounded-lg hover:outline-2 hover:outline-blue2 outline-none -outline-offset-2"
    >
      <div
        onClick={() => props.onClick()}
        className={cn('flex-col gap-2 [&_*]:!cursor-pointer !cursor-pointer', {
          'bg-lightGray5': props.idx % 2 === 0,
          'bg-lightGray4': props.idx % 2 !== 0
        })}
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
            {renderVariantPrice(props.menuEntry.variants)}
          </div>
        </div>

        <div className="w-full pb-2 pl-4 flex flex-row gap-1">
          {props.menuEntry.labels?.map((label, idx) => (
            <Label key={idx} name={label.name} color={label.color} />
          ))}
        </div>
      </div>
    </div>
  )
}
