import { Button, FormGroup } from '@blueprintjs/core'
import { Client } from '@prisma/client'
import { OverlayMode } from '@renderer/constants/enums'
import { useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectedRowContext, SelectedRowContextType } from '../../context/SelectedRowContext'
import { Input } from '../Input'
import InputError from '../InputError'
import ModalTitle from '../ModalTitle'

type CreateOrEditProps = {
  onSave?: () => void
  onCancel?: () => void
  overlayMode: OverlayMode | null
}

export const CreateOrEditModal = (props: CreateOrEditProps): React.ReactNode => {
  if (!props.overlayMode) return null

  const { selectedRow } = useContext<SelectedRowContextType<Client>>(SelectedRowContext)

  const {
    register,
    reset,
    formState: { errors }
  } = useFormContext()

  useEffect(() => {
    const isScreenInEditModeAndHasData =
      selectedRow !== undefined && Object.values(selectedRow).length

    if (isScreenInEditModeAndHasData) {
      reset(selectedRow)
    }
  }, [selectedRow])

  return (
    <div className="p-5 bg-white h-[200px] w-[800px] rounded flex flex-col gap-1 justify-between">
      <ModalTitle title="Novo cliente" />

      <form id="create-form" className="w-full h-full">
        <div className="flex gap-4 w-full">
          <FormGroup
            style={{ width: '100%', height: '60px' }}
            label="Nome:"
            labelInfo="(obrigatório)"
          >
            <Input
              placeholder="Nome"
              fill
              error={Boolean(errors?.['name']?.message?.toString())}
              {...register('name')}
            />
            <InputError errorMessage={errors?.['name']?.message?.toString()} />
          </FormGroup>

          <FormGroup style={{ width: '100%', height: '60px' }} label="Telefone:">
            <Input
              placeholder="Telefone"
              fill
              error={Boolean(errors?.['name']?.message?.toString())}
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
