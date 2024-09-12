import { MenuEntryVariant } from '@renderer/queries/graphql/codegen/graphql'
import { cn } from '@renderer/utils'
import { useClickAway } from '@uidotdev/usehooks'
import { LegacyRef, useState } from 'react'

export type VariantsProps = {
  variants: MenuEntryVariant[]
  isEditModeActive: boolean
}

export const Variants = (props: VariantsProps) => {
  const [expandedEditableFields, setExpandedEditableFields] = useState<Record<string, boolean>>({})

  const handleFieldOnClick = (fieldName: string) => {
    if (expandedEditableFields[fieldName] !== undefined) {
      return
    }

    setExpandedEditableFields((prev) => ({
      [fieldName]: !prev[fieldName]
    }))
  }

  // Get the div whose id is the variant that is expanded
  const getContainerDiv = () => {
    const expandedVariant = Object.entries(expandedEditableFields).find(
      ([_key, isEnabled]) => isEnabled === true
    )

    if (!expandedVariant) return

    const [name, _] = expandedVariant
    return document.getElementById(name)
  }

  const clickAwayRef = useClickAway((element) => {
    const containerDiv = getContainerDiv()
    if (!containerDiv?.id) return
    if (!element.target) return

    // Not not collapse if the clicked element is the in the container that is expanded
    if (containerDiv.contains(element.target as Node)) return

    // Reset expanded fields
    setExpandedEditableFields({})
  })

  return (
    <div className="flex flex-col gap-2 pb-4 h-full">
      {props.variants?.map((variant, idx) => (
        <div
          id={variant.name as string}
          key={idx}
          ref={clickAwayRef as LegacyRef<HTMLDivElement>}
          onClick={() => {
            handleFieldOnClick(variant.name as string)
          }}
          className={cn(
            'rounded-md bg-lightgray text-black px-2 py-1 [&_*]:!cursor-pointer !cursor-pointer hover:bg-gray4 flex flex-row justify-between transition-all items-center h-fit'
          )}
        >
          <div
            className={cn('flex flex-col w-full pr-4 transition-all', {
              'gap-2 py-2': expandedEditableFields[variant.name as string]
            })}
          >
            <div>
              {props.isEditModeActive ? (
                <input
                  type="text"
                  placeholder="Nome:"
                  className="bg-transparent font-bold"
                  defaultValue={variant.name ?? ''}
                />
              ) : (
                <p className="font-bold">{variant.name}</p>
              )}
            </div>

            {props.isEditModeActive ? (
              <input
                type="text"
                placeholder="Descrição:"
                className="bg-transparent"
                defaultValue={variant.description ?? ''}
              />
            ) : (
              <p>{variant.description}</p>
            )}
          </div>

          <div>
            <div className="flex flex-row min-w-[70px] justify-between">
              <div>
                <b>R$&nbsp;</b>
              </div>

              <div>
                {props.isEditModeActive ? (
                  <input
                    type="text"
                    placeholder="Preço"
                    size={1}
                    className="bg-transparent font-bold justify-end"
                    defaultValue={variant?.price?.toFixed(2)}
                  />
                ) : (
                  <p className="font-bold">{variant.price}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
