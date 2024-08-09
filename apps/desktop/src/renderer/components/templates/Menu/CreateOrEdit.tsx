import { Button, FormGroup, TextArea } from '@blueprintjs/core'
import { ModalTitle } from '@renderer/components'
import { DynamicallyEditableInput, Label } from '@renderer/components/molecules'
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
      <div className="flex flex-col">
        <DynamicallyEditableInput render={''} />

        <ModalTitle
          title={
            props.overlayMode === OverlayMode.NEW
              ? 'Criar novo item'
              : (menuEntryData.name as string)
          }
        />

        <div className="flex flex-row gap-2">
          <p className="underline"> {'{...categoria}'}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-4">
        <div>
          <p className="font-bold">Etiquetas</p>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-1">
            {menuEntryData.labels?.map((label, idx) => (
              <Label
                key={idx}
                name={label.name}
                color={label.color}
                className="min-h-[26px] flex justify-center align-center"
              />
            ))}
          </div>

          <div>
            <Button
              icon={'plus'}
              intent={'none'}
              className="rounded-md"
              onClick={() => {
                console.log(menuEntryData)
                // Abrir modal igual no trello
                console.log('add new cateogory')
              }}
            />
          </div>
        </div>
      </div>

      <form id="create-form" className="w-full h-full">
        <div className="pt-4 flex flex-col gap-4">
          <div>
            <p className="text-lg font-bold">Descrição</p>

            {/* <DynamicallyEditableTextArea /> */}

            <FormGroup className="w-full h-full max-h-[180px] min-h-[50px]">
              <TextArea
                className="max-h-[160px] min-h-[50px]"
                placeholder="Descrição"
                fill
                // error={errors?.['description']?.message?.toString() as unknown as boolean}
                defaultValue={menuEntryData.description as string}
                {...register('description')}
              />
              {/* <InputError errorMessage={errors?.['description']?.message?.toString()} /> */}
            </FormGroup>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <p className="text-lg font-bold">Variantes</p>
            </div>

            <div className="flex flex-col gap-2 pb-4">
              {menuEntryData.variant?.map((variant, idx) => (
                <div
                  key={idx}
                  className="rounded-md bg-gold4 text-black px-2 py-1 [&_*]:!cursor-pointer !cursor-pointer hover:bg-gold3 transition-all flex flex-row justify-between"
                >
                  <div className="flex flex-col">
                    <div>
                      <b>{variant.name}</b>
                    </div>

                    <div>{variant.description}</div>
                  </div>

                  <div>{variant.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>

      {/* <form id="create-form" className="w-full h-full">
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
      </form> */}

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
