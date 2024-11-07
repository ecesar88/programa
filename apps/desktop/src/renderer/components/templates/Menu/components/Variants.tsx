import { Button } from '@blueprintjs/core'
import { cn } from '@renderer/utils'
import { UseFieldArrayReturn } from 'react-hook-form'
import { MenuEntryFormValues } from '../CreateOrEdit'
import { VariantInputField } from './VariantInputField'
import { MenuEntryVariantInput } from '@renderer/queries/graphql/codegen/graphql'

export type VariantsProps = {
  variants: MenuEntryFormValues['variant']
  append: UseFieldArrayReturn<MenuEntryFormValues>['append']
  remove: UseFieldArrayReturn['remove']
  isEditModeActive: boolean
  isCreateModeActive: boolean
}

export const Variants = (props: VariantsProps) => {
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
    <div className="flex flex-col gap-2 pb-4 h-full">
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
