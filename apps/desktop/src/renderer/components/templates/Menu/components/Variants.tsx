import { MenuEntryVariant } from '@renderer/queries/graphql/codegen/graphql'
import { cn } from '@renderer/utils'
import { useState } from 'react'
import { Price } from './Price'

export type VariantsProps = {
  variants: MenuEntryVariant[]
}

export const Variants = (props: VariantsProps) => {
  const [editableFields, setEditableFields] = useState<Record<string, boolean>>({})

  const handleFieldOnClick = (fieldName: string) => {
    setEditableFields((prev) => ({
      [fieldName]: !prev[fieldName]
    }))
  }

  console.log('editableFields >>>>>>>>>>>>> ', editableFields)

  return (
    <div className="flex flex-col gap-2 pb-4 h-full">
      {props.variants?.map((variant, idx) => (
        <div
          key={idx}
          className={cn(
            'rounded-md bg-gold4 text-black px-2 py-1 [&_*]:!cursor-pointer !cursor-pointer hover:bg-gold3  flex flex-row justify-between transition-all items-center h-[15%]',
            {
              'h-[30%]': editableFields[variant.name as string]
            }
          )}
        >
          <div
            className={cn('flex flex-col w-full pr-4', {
              'gap-3': editableFields[variant.name as string]
            })}
          >
            <input
              type="text"
              placeholder="Nome:"
              className="bg-transparent font-bold"
              defaultValue={variant.name ?? ''}
              onClick={() => {
                handleFieldOnClick(variant.name as string)
              }}
            />

            <input
              type="text"
              placeholder="Descrição:"
              className="bg-transparent"
              defaultValue={variant.description ?? ''}
              onClick={() => {
                handleFieldOnClick(variant.name as string)
              }}
            />
          </div>

          <div>
            <Price price={variant.price as number} />
          </div>
        </div>
      ))}
    </div>
  )
}
