import { Button, EditableText } from '@blueprintjs/core'
import { MenuEntryVariant } from '@renderer/queries/graphql/codegen/graphql'
import { cn } from '@renderer/utils'
import { LegacyRef, MutableRefObject } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaTrashAlt } from 'react-icons/fa'
import { CreateType_MenuEntryVariant } from './Variants'

export type VariantInputFieldProps = {
  variant: MenuEntryVariant
  clickAwayRef: MutableRefObject<Element>
  expandedEditableFields: Record<string, boolean>
  isEditModeActive: boolean
  isCreateModeActive: boolean
  handleFieldOnClick: (name: string) => void
  handleDeleteVariant: (variantData: MenuEntryVariant | CreateType_MenuEntryVariant) => void
}

export const VariantInputField = (props: VariantInputFieldProps) => {
  const form = useForm({})

  return (
    <div
      id={props.variant.name as string}
      ref={props.clickAwayRef as LegacyRef<HTMLDivElement>}
      onClick={() => {
        props.handleFieldOnClick(props.variant.name as string)
      }}
      className={cn(
        'flex flex-row justify-between max-w-[390px] rounded-md bg-lightgray text-black px-2 py-1 hover:bg-gray4 transition-all items-center h-fit overflow-clip group relative'
      )}
    >
      <div
        className={cn('flex flex-col w-full pr-4 transition-all', {
          'gap-2 py-2': props.expandedEditableFields[props.variant.name as string]
        })}
      >
        <div>
          <Controller
            control={form.control}
            name="name"
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
                defaultValue={props.variant.name ?? ''}
              />
            )}
          />
        </div>

        <div className="flex-shrink-0 flex-grow-0">
          <Controller
            control={form.control}
            name="description"
            render={({ field: { onChange, value, ref } }) => (
              <EditableText
                className="w-full max-w-[273px] [&_*]:!cursor-text"
                disabled={!props.isCreateModeActive && !props.isEditModeActive}
                onChange={onChange}
                value={value}
                ref={ref}
                minWidth={20}
                maxLength={220}
                multiline
                intent="none"
                placeholder="Descrição"
                defaultValue={props.variant.description ?? ''}
              />
            )}
          />
        </div>
      </div>

      <div className="flex flex-row min-w-[70px] justify-between right-[0] group-hover:right-[-5rem] relative transition-all duration-300">
        <div>
          <b>R$&nbsp;</b>
        </div>

        <div>
          <Controller
            control={form.control}
            name="price"
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
                defaultValue={props.variant.price?.toString() ?? ''}
              />
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 absolute right-[-3rem] group-hover:right-[0.8rem] ransition-all duration-300">
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
