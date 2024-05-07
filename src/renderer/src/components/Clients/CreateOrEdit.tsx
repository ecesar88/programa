import { Button, FormGroup } from '@blueprintjs/core'
import { FORM_ID } from '@renderer/constants'
import { OverlayMode } from '@renderer/constants/enums'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
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

  const {
    register,
    reset,
    formState: { errors }
  } = useFormContext()

  // useEffect(() => {
  //   console.log(props.overlayMode)
    // console.log('selectedRow.data >> ', selectedRow)

    // const rowHasData = selectedRow?.data && Object.values(selectedRow?.data).length > 0

    // if (props.overlayMode === OverlayMode.EDIT && rowHasData) {
    //   console.log('PREENCHA')
    //   reset(selectedRow.data)
    // } else if (props.overlayMode === OverlayMode.NEW && rowHasData) {
    //   console.log('NÃO PREENCHA')
    //   reset()
    // }

    // if (rowHasData) {
    //   console.log('rowHasData? >', rowHasData)
    //   if (props.overlayMode === OverlayMode.EDIT) {
    //     reset(selectedRow?.data)
    //   } else {
    //     console.log('aAAAAAAAAAAAAA')
    //     reset({})
    //   }
    // }

  //   if (props.overlayMode === null) return

  //   if (
  //     selectedRow !== null &&
  //     selectedRow !== undefined &&
  //     props.overlayMode === OverlayMode.EDIT
  //   ) {
  //     reset(selectedRow.data)
  //   }

  //   return () => {
  //     reset({})
  //   }
  // }, [selectedRow?.data, props.overlayMode])

  return (
    <div className="p-5 bg-white h-[200px] w-[800px] rounded flex flex-col gap-1 justify-between">
      <ModalTitle
        title={props.overlayMode === OverlayMode.NEW ? 'Novo cliente' : 'Editar cliente'}
      />

      <Button
        icon="edit"
        fill
        intent="primary"
        form={FORM_ID}
        type="submit"
        onClick={() => {
          console.log('selectedRow >>> ', {})
        }}
      >
        Logar selectedRow
      </Button>

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
