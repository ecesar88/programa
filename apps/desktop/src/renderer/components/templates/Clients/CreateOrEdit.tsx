import { Button, FormGroup } from '@blueprintjs/core'
import { Input, ModalTitle, InputError } from '@renderer/components'
import { OverlayMode } from '@renderer/constants/enums'
import { rowDataFocusedAtom } from '@renderer/store/selectedRow'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

type CreateOrEditProps = {
  isLoading: boolean
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

  // maybe put this logic inside a hook???
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
      <ModalTitle
        title={props.overlayMode === OverlayMode.NEW ? 'Novo cliente' : 'Editar cliente'}
      />

      <form id="create-form" className="w-full h-full">
        <div className="flex w-full gap-4">
          <FormGroup
            style={{ width: '100%', height: '60px' }}
            label="Nome:"
            labelInfo="(obrigatório)"
          >
            <Input
              placeholder="Nome"
              fill
              error={errors?.['name']?.message?.toString() as unknown as boolean}
              {...register('name')}
            />
            <InputError errorMessage={errors?.['name']?.message?.toString()} />
          </FormGroup>

          <FormGroup style={{ width: '100%', height: '60px' }} label="Telefone:">
            <Input
              placeholder="Telefone"
              fill
              error={errors?.['name']?.message?.toString() as unknown as boolean}
              {...register('phone')}
              // TODO: Add input mask
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
          loading={props.isLoading}
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
