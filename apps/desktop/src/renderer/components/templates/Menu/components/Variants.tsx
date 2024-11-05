import { Button } from '@blueprintjs/core'
import { MenuEntryVariant } from '@renderer/queries/graphql/codegen/graphql'
import { cn } from '@renderer/utils'
// import { useClickAway } from '@uidotdev/usehooks'
import { useState } from 'react'
import { UseFieldArrayReturn } from 'react-hook-form'
import { CreateType_MenuEntryVariant } from '../CreateOrEdit'
import { VariantInputField } from './VariantInputField'
import { animated, config, useSpring, useSprings } from '@react-spring/web'

export type VariantsProps = {
  variants: MenuEntryVariant[]
  append: UseFieldArrayReturn['append']
  remove: UseFieldArrayReturn['remove']
  isEditModeActive: boolean
  isCreateModeActive: boolean
  isCreatingNewVariants: CreateType_MenuEntryVariant[]
}

export const Variants = (props: VariantsProps) => {
  const [expandedEditableFields, setExpandedEditableFields] = useState<Record<string, boolean>>({})

  // const [isCreatingNewVariants, setIsCreatingNewVariants] = useState<CreateType_MenuEntryVariant[]>(
  //   []
  // )

  const handleFieldOnClick = (fieldName: string) => {
    if (expandedEditableFields[fieldName] !== undefined) {
      return
    }

    setExpandedEditableFields((prev) => ({
      [fieldName]: !prev[fieldName]
    }))
  }

  // Get the div whose id is the variant that is expanded
  // const getContainerDiv = () => {
  //   const expandedVariant = Object.entries(expandedEditableFields).find(
  //     ([_key, isEnabled]) => isEnabled === true
  //   )

  //   if (!expandedVariant) return

  //   const [name, _] = expandedVariant
  //   return document.getElementById(name)
  // }

  // const clickAwayRef = useClickAway((element) => {
  //   const containerDiv = getContainerDiv()
  //   if (!containerDiv?.id) return
  //   if (!element.target) return

  //   // Not not collapse if the clicked element is the in the container that is expanded
  //   if (containerDiv.contains(element.target as Node)) return

  //   // Reset expanded fields
  //   setExpandedEditableFields({})
  // })

  const handleCreateNewVariant = () => {
    const newVariantToCreate: CreateType_MenuEntryVariant = {
      uuid: (Math.random() * 10000).toFixed(5).toString(),
      name: '',
      description: '',
      price: undefined
    }

    props.append(newVariantToCreate)

    // setIsCreatingNewVariants((prev) => {
    //   const newVariantToCreate: CreateType_MenuEntryVariant = {
    //     uuid: (Math.random() * 10000).toFixed(5).toString(),
    //     name: '',
    //     description: '',
    //     price: 0
    //   }
    //   return [...prev, newVariantToCreate]
    // })
  }

  const handleDeleteCreateNewVariant = (index: number) => {
    // setIsCreatingNewVariants((prev) => prev.filter((variant) => variant.uuid !== uuid))

    props.remove(index)
  }

  // const [deleteVariantAnimationStyle, deleteVariantAnimationApi] = useSpring(() => ({
  //   from: { x: 0 }
  // }))

  const [deleteAnSprings, deleteAnApi] = useSprings(
    props.variants.length,
    (i) => ({
      from: { x: 0 },
      config: config.molasses
    }),
    [props.variants]
  )

  const handleDeleteVariant = (
    variant: MenuEntryVariant | CreateType_MenuEntryVariant,
    index?: number
  ) => {
    if ('__typename' in variant) {
      // delete from the database
      console.log('// delete from the database')
    }

    if ('uuid' in variant) {
      handleDeleteCreateNewVariant(index ?? 0)
    }

    console.log('UUUUUUUUUUUUUUUUUUUUUUUI')
    deleteAnApi.start((i) => {
      if (index !== i) return

      return {
        to: {
          x: 1000
        }
      }
    })
  }

  return (
    <div className="flex flex-col gap-2 pb-4 h-full overflow-hidden">
      {deleteAnSprings?.map((style, idx) => {
        const variant = props.variants[idx]

        return (
          <animated.div key={idx} style={style}>
            <VariantInputField
              variant={variant}
              expandedEditableFields={expandedEditableFields}
              isEditModeActive={props.isEditModeActive}
              isCreateModeActive={props.isCreateModeActive}
              handleFieldOnClick={handleFieldOnClick}
              handleDeleteVariant={() => handleDeleteVariant(variant, idx)}
            />
          </animated.div>
        )
      })}

      {/* Adicionar animação de swipe para a direita (react-spring) */}
      {props.isCreatingNewVariants?.length > 0 &&
        props.isCreatingNewVariants?.map((variant, idx) => {
          return (
            <VariantInputField
              key={idx}
              variant={{ name: '', description: '', price: 0 }}
              // clickAwayRef={clickAwayRef}
              expandedEditableFields={expandedEditableFields}
              isEditModeActive={props.isEditModeActive}
              isCreateModeActive={props.isCreateModeActive}
              handleFieldOnClick={handleFieldOnClick}
              handleDeleteVariant={() => handleDeleteVariant(variant, idx)}
            />
          )
        })}

      {/* {props.variants?.map((variant, idx) => (
        <VariantInputField
          key={idx}
          variant={variant}
          // clickAwayRef={clickAwayRef}
          expandedEditableFields={expandedEditableFields}
          isEditModeActive={props.isEditModeActive}
          isCreateModeActive={props.isCreateModeActive}
          handleFieldOnClick={handleFieldOnClick}
          handleDeleteVariant={() => handleDeleteVariant(variant, idx)}
        />
      ))} */}

      {/* Adicionar animação de swipe para a direita (react-spring) */}
      {/* {props.isCreatingNewVariants?.length > 0 &&
        props.isCreatingNewVariants?.map((variant, idx) => {
          return (
            <VariantInputField
              key={idx}
              variant={{ name: '', description: '', price: 0 }}
              // clickAwayRef={clickAwayRef}
              expandedEditableFields={expandedEditableFields}
              isEditModeActive={props.isEditModeActive}
              isCreateModeActive={props.isCreateModeActive}
              handleFieldOnClick={handleFieldOnClick}
              handleDeleteVariant={() => handleDeleteVariant(variant, idx)}
            />
          )
        })} */}

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
