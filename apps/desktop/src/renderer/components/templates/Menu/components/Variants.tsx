import { Button } from '@blueprintjs/core'
import { MenuEntryVariantInput } from '@renderer/queries/graphql/codegen/graphql'
import { cn } from '@renderer/utils'
import { useEffect, useState } from 'react'
import { UseFieldArrayReturn } from 'react-hook-form'
import { debounce } from 'remeda'
import { MenuEntryFormValues } from '../CreateOrEdit'
import { VariantInputField } from './VariantInputField'

export type VariantsProps = {
  variants: MenuEntryFormValues['variant']
  append: UseFieldArrayReturn<MenuEntryFormValues>['append']
  remove: UseFieldArrayReturn['remove']
  isEditModeActive: boolean
  isCreateModeActive: boolean
}

const MODAL_ID = 'create-or-edit-menu-entry-modal'

console.log('#### >>>> ', document.getElementById(MODAL_ID)?.getBoundingClientRect().height)

export const Variants = (props: VariantsProps) => {
  const [maxVariantListHeight, setMaxVariantListHeight] = useState<number>(0)

  const calculateMaxVariantListHeight = (modalHeight: number) => {
    const MAX_VARIANT_LIST_HEIGHT_PERCENTAGE = 0.7 // 50% of the modal's size
    const FINAL_VARIANT_LIST_HEIGHT = Math.trunc(modalHeight * MAX_VARIANT_LIST_HEIGHT_PERCENTAGE)

    setMaxVariantListHeight(FINAL_VARIANT_LIST_HEIGHT)
  }

  const debouncer = debounce(calculateMaxVariantListHeight, { waitMs: 0, timing: 'leading' })

  useEffect(() => {
    const modalElement = document.getElementById(MODAL_ID)
    if (!modalElement) return
    const observer = new MutationObserver(() => {
      const modalHeight = modalElement.getBoundingClientRect().height

      debouncer.call(modalHeight)
    })

    observer.observe(modalElement, {
      attributes: true, // Watch for attribute changes, e.g., style changes
      childList: true,
      subtree: true,
      characterData: true,
      attributeOldValue: true,
      characterDataOldValue: true
    })

    // Initial delayed call in case modal height is already set
    setTimeout(() => debouncer.call(modalElement.getBoundingClientRect().height), 250)

    return () => observer.disconnect()
  }, [window.innerHeight])

  const handleCreateNewVariant = () => {
    console.log(props.variants)

    const newVariantToCreate: MenuEntryFormValues['variant'][number] = {
      name: '',
      description: '',
      price: null
    }

    props.append(
      newVariantToCreate,
      { shouldFocus: false } // Breaks the app for some reason
    )
  }

  // const [deleteVariantAnimationStyle, deleteVariantAnimationApi] = useSpring(() => ({
  //   from: { x: 0 }
  // }))

  // const [deleteASpring, deleteASpringApi] = useSprings(
  //   props.variants?.length ?? 0,
  //   (i) => ({
  //     from: { x: 0 },
  //     config: config.molasses
  //   }),
  //   [props.variants]
  // )

  const handleDeleteVariant = (index: number) => {
    // call delete variant

    props.remove(index)

    // deleteASpringApi.start((i) => {
    //   if (index !== i) return

    //   return {
    //     to: {
    //       x: 1000
    //     }
    //   }
    // })
  }

  return (
    // Overflow hidden causing mouse over animation to clip
    // <div className="flex flex-col gap-2 pb-4 h-full overflow-hidden">
    <div className="flex flex-col gap-2 pb-4 h-full px-2">
      {/* 
      
       {deleteASpring?.map((style, idx) => {
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

  
       {props.isCreatingNewVariants?.length > 0 &&
         props.isCreatingNewVariants?.map((variant, idx) => {
           return (
             <VariantInputField
               key={idx}
               arrayIndex={idx}
               variant={{ name: '', description: '', price: 0 }}
               expandedEditableFields={expandedEditableFields}
               isEditModeActive={props.isEditModeActive}
               isCreateModeActive={props.isCreateModeActive}
               handleFieldOnClick={handleFieldOnClick}
               handleDeleteVariant={() => handleDeleteVariant(variant, idx)}
             />
           )
         })}

    */}

      <div
        className="overflow-y-auto overflow-hidden flex flex-col gap-2 pb-4 pl-1 px-2"
        style={{
          maxHeight: maxVariantListHeight !== 0 ? `${maxVariantListHeight}px` : '0px'
        }}
      >
        {props.variants?.map((variant: MenuEntryVariantInput & { id?: string }, idx) => {
          return (
            <VariantInputField
              key={variant.id}
              arrayIndex={idx}
              variant={variant}
              isEditModeActive={props.isEditModeActive}
              isCreateModeActive={props.isCreateModeActive}
              handleDeleteVariant={() => handleDeleteVariant(idx)}
            />
          )
        })}
      </div>

      <div
        className={cn(
          'rounded-md bg-lightGray3 text-black ml-1 mr-2 py-1 hover:bg-lightGray2 flex flex-row gap-2 items-center h-fit justify-center transition-all duration-500',
          {
            'opacity-0': !props.isCreateModeActive && !props.isEditModeActive,
            'opacity-100': props.isCreateModeActive || props.isEditModeActive
          }
        )}
      >
        <Button
          small
          icon={'plus'}
          intent={'none'}
          className="rounded-md"
          disabled={!props.isCreateModeActive && !props.isEditModeActive}
          onClick={handleCreateNewVariant}
        />
      </div>
    </div>
  )
}
