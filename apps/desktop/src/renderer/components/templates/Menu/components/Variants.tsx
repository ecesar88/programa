import { Button } from '@blueprintjs/core'
import { MenuEntryVariant } from '@renderer/queries/graphql/codegen/graphql'
import { cn } from '@renderer/utils'
import { useClickAway } from '@uidotdev/usehooks'
import { useState } from 'react'
import { VariantInputField } from './VariantInputField'

export type VariantsProps = {
  variants: MenuEntryVariant[]
  isEditModeActive: boolean
  isCreateModeActive: boolean
}

export type CreateType_MenuEntryVariant = Omit<MenuEntryVariant, '__typename'> & { uuid: string }

export const Variants = (props: VariantsProps) => {
  const [expandedEditableFields, setExpandedEditableFields] = useState<Record<string, boolean>>({})

  const [isCreatingNewVariants, setIsCreatingNewVariants] = useState<CreateType_MenuEntryVariant[]>(
    []
  )

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

  const handleCreateNewVariant = () => {
    setIsCreatingNewVariants((prev) => {
      const newVariantToCreate: CreateType_MenuEntryVariant = {
        uuid: (Math.random() * 10000).toFixed(5).toString(),
        name: '',
        description: '',
        price: 0
      }

      return [...prev, newVariantToCreate]
    })
  }

  const handleDeleteCreateNewVariant = (uuid: string) => {
    setIsCreatingNewVariants((prev) => prev.filter((variant) => variant.uuid !== uuid))
  }

  const handleDeleteVariant = (variant: MenuEntryVariant | CreateType_MenuEntryVariant) => {
    console.log({ variant })

    if ('__typename' in variant) {
      // delete from the database
      console.log('// delete from the database')
    }

    if ('uuid' in variant) {
      handleDeleteCreateNewVariant(variant.uuid)
    }
  }

  return (
    <div className="flex flex-col gap-2 pb-4 h-full">
      {props.variants?.map((variant, idx) => (
        <VariantInputField
          key={idx}
          variant={variant}
          clickAwayRef={clickAwayRef}
          expandedEditableFields={expandedEditableFields}
          isEditModeActive={props.isEditModeActive}
          isCreateModeActive={props.isCreateModeActive}
          handleFieldOnClick={handleFieldOnClick}
          handleDeleteVariant={() => handleDeleteVariant(variant)}
        />
      ))}

      {/* Adicionar animação de swipe para a direita (react-spring) */}
      {isCreatingNewVariants?.length > 0 &&
        isCreatingNewVariants?.map((variant) => {
          return (
            <VariantInputField
              key={variant.uuid}
              variant={{ name: '', description: '', price: 0 }}
              clickAwayRef={clickAwayRef}
              expandedEditableFields={expandedEditableFields}
              isEditModeActive={props.isEditModeActive}
              isCreateModeActive={props.isCreateModeActive}
              handleFieldOnClick={handleFieldOnClick}
              handleDeleteVariant={() => handleDeleteVariant(variant)}
            />
          )
        })}

      <div
        className={cn(
          'rounded-md bg-lightGray3 text-black px-2 py-1 hover:bg-lightGray2 flex flex-row gap-2 items-center h-fit justify-center transition-all duration-500',
          {
            'opacity-0': !props.isCreateModeActive && !props.isEditModeActive,
            'opacity-100': props.isCreateModeActive || props.isEditModeActive
          }
        )}
      >
        <div>
          <Button
            icon={'plus'}
            intent={'none'}
            className="rounded-md"
            disabled={!props.isCreateModeActive && !props.isEditModeActive}
            onClick={handleCreateNewVariant}
          />
        </div>
      </div>
    </div>
  )
}
