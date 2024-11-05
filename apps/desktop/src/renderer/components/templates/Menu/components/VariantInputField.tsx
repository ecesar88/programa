import { Button, EditableText } from '@blueprintjs/core'
import { MenuEntryVariant } from '@renderer/queries/graphql/codegen/graphql'
import { cn } from '@renderer/utils'
import { Controller, useFormContext } from 'react-hook-form'
import { FaTrashAlt } from 'react-icons/fa'
import { CreateType_MenuEntryVariant } from '../CreateOrEdit'

export type VariantInputFieldProps = {
  arrayIndex: number
  variant: MenuEntryVariant
  isEditModeActive: boolean
  isCreateModeActive: boolean
  handleDeleteVariant: (variantData: MenuEntryVariant | CreateType_MenuEntryVariant) => void
}

export const VariantInputField = (props: VariantInputFieldProps) => {
  const {
    formState: { errors }, // TODO - add errors to inputs when doing validation with zod schema
    control
  } = useFormContext()

  return (
    <div
      className={cn(
        'flex flex-row justify-between max-w-[390px] rounded-md bg-lightgray text-black px-2 py-1 hover:bg-gray4 transition-all items-center h-fit overflow-clip group relative hover:scale-[102%]'
      )}
    >
      <div className={cn('flex flex-col w-full pr-4 transition-all flex-[8]')}>
        <div>
          <Controller
            control={control}
            name={`variant.${props.arrayIndex}.name`}
            defaultValue={props.variant.name ?? ''}
            render={({ field: { onChange, value, ref } }) => (
              <EditableText
                className="font-bold [&_*]:!cursor-text"
                disabled={!props.isCreateModeActive && !props.isEditModeActive}
                onChange={onChange}
                value={value}
                ref={ref}
                minWidth={20}
                intent="none"
                placeholder="Nome"
                // defaultValue={props.variant.name ?? ''}
              />
            )}
          />
        </div>

        <div className="flex-shrink-0 flex-grow-0">
          <Controller
            control={control}
            name={`variant.${props.arrayIndex}.description`}
            defaultValue={props.variant.description ?? ''}
            render={({ field: { onChange, value, ref } }) => (
              <EditableText
                className="max-w-[220px] w-max [&_*]:!cursor-text"
                disabled={!props.isCreateModeActive && !props.isEditModeActive}
                onChange={onChange}
                value={value}
                ref={ref}
                minWidth={220}
                maxLength={220}
                multiline
                intent="none"
                placeholder="Descrição"
                // defaultValue={props.variant.description ?? ''}
              />
            )}
          />
        </div>
      </div>

      <div
        className={cn(
          'flex flex-row min-w-[70px] justify-between relative transition-all duration-300',
          {
            'right-[0] group-hover:right-[3rem]': props.isEditModeActive || props.isCreateModeActive
          }
        )}
      >
        <div>
          <b>R$&nbsp;</b>
        </div>

        <div>
          <Controller
            control={control}
            name={`variant.${props.arrayIndex}.price`}
            defaultValue={props.variant.price?.toString() ?? ''}
            render={({ field: { onChange, value, ref } }) => (
              <EditableText
                disabled={!props.isCreateModeActive && !props.isEditModeActive}
                className="text-end [&_*]:!cursor-text"
                onChange={onChange}
                // validate price input
                value={value}
                ref={ref}
                minWidth={20}
                maxLength={6}
                intent="none"
                placeholder="Preço"
                // defaultValue={props.variant.price?.toString() ?? ''}
              />
            )}
          />
        </div>
      </div>

      <div
        className={cn(
          'flex items-center gap-2 absolute right-[-3rem] transition-all duration-300',
          {
            'group-hover:right-[0.8rem]': props.isEditModeActive || props.isCreateModeActive
          }
        )}
      >
        <div>
          <Button
            className="rounded"
            icon={<FaTrashAlt className="text-white" />}
            fill
            intent="danger"
            onClick={() => props.handleDeleteVariant(props.variant)}
          />
        </div>
      </div>
    </div>
  )
}
