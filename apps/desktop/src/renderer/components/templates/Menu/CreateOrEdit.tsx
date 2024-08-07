import { Button, FormGroup } from '@blueprintjs/core'
import { Input, InputError, ModalTitle } from '@renderer/components'
import { OverlayMode } from '@renderer/constants/enums'
import { useResetHookForm } from '@renderer/hooks/useResetHookForm'
import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { selectedRowAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { useFormContext } from 'react-hook-form'

type CreateOrEditProps = {
  onSave?: () => void
  onCancel?: () => void
  overlayMode: OverlayMode | null
}

export const CreateOrEditModal = (props: CreateOrEditProps): React.ReactNode => {
  const {
    register,
    reset,
    formState: { errors }
  } = useFormContext()

  const menuEntryData = useAtomValue(selectedRowAtom).data as MenuEntry

  useResetHookForm(reset, props.overlayMode)

  if (!menuEntryData) return

  return (
    <div className="p-5 bg-white h-fit w-[800px] rounded flex flex-col gap-1 justify-between">
      <ModalTitle title={menuEntryData.name as string} />

      <form id="create-form" className="w-full h-full">
        <div className="flex w-full gap-4">
          <FormGroup
            style={{ width: '100%', height: '60px' }}
            label="Descrição:"
            labelInfo="(obrigatório)"
          >
            <Input
              placeholder="Descrição do item"
              fill
              error={errors?.['description']?.message?.toString() as unknown as boolean}
              defaultValue={menuEntryData.description as string}
              {...register('description')}
            />
            <InputError errorMessage={errors?.['address']?.message?.toString()} />
          </FormGroup>
        </div>

        <div>
          <FormGroup style={{ width: '100%', height: '60px' }} label="Telefone:">
            <Input
              placeholder="Observações"
              fill
              error={errors?.['observations']?.message?.toString() as unknown as boolean}
              {...register('observations')}
            />
            <InputError errorMessage={errors?.['phone']?.message?.toString()} />
          </FormGroup>
        </div>
      </form>

      <div className="flex flex-row gap-3">
        <Button
          fill
          intent="none"
          icon="disable"
          onClick={() => {
            props?.onCancel?.()
          }}
        >
          Cancelar
        </Button>

        <Button
          icon="floppy-disk"
          fill
          intent="warning"
          form="create-form"
          type="submit"
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.preventDefault()

            props?.onSave?.()
          }}
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
