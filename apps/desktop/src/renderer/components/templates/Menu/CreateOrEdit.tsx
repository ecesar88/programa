import { Button, FormGroup } from '@blueprintjs/core'
import { Input, InputError, ModalTitle } from '@renderer/components'
import { OverlayMode } from '@renderer/constants/enums'
import { rowDataFocusedAtom } from '@renderer/store/clientStore'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
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

  const selectedRow = useAtomValue(rowDataFocusedAtom)

  useEffect(() => {
    const rowHasData = Object.values(selectedRow)?.length > 0

    if (props.overlayMode === OverlayMode.EDIT && rowHasData) {
      reset(selectedRow)
    } else if (props.overlayMode === OverlayMode.NEW && rowHasData) {
      reset()
    }

    return () => {
      reset({})
    }
  }, [selectedRow, props.overlayMode])

  if (!props.overlayMode) return null

  return (
    <div className="p-5 bg-white h-[200px] w-[800px] rounded flex flex-col gap-1 justify-between">
      <ModalTitle title={props.overlayMode === OverlayMode.NEW ? 'Novo Pedido' : 'Editar Pedido'} />

      <form id="create-form" className="w-full h-full">
        <div className="flex w-full gap-4">
          <FormGroup
            style={{ width: '100%', height: '60px' }}
            label="Nome:"
            labelInfo="(obrigatório)"
          >
            <Input
              placeholder="Endereço"
              fill
              error={(errors?.['address']?.message?.toString() ?? 'false') as unknown as boolean}
              {...register('address')}
            />
            <InputError errorMessage={errors?.['address']?.message?.toString()} />
          </FormGroup>

          <FormGroup style={{ width: '100%', height: '60px' }} label="Telefone:">
            <Input
              placeholder="Observações"
              fill
              error={(errors?.['observations']?.message?.toString() ?? 'false') as unknown as boolean}
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
