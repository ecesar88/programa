import { Button, Colors, FormGroup, TextArea } from '@blueprintjs/core'
import { ModalTitle } from '@renderer/components'
import { Label } from '@renderer/components/molecules'
import { OverlayMode } from '@renderer/constants/enums'
import { useResetHookForm } from '@renderer/hooks/useResetHookForm'
import { MenuEntry, MenuEntryVariant } from '@renderer/queries/graphql/codegen/graphql'
import { selectedRowAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { debounce } from 'remeda'
import { Variants } from './components/Variants'
import { FaLock } from 'react-icons/fa'
import { FaLockOpen } from 'react-icons/fa'

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

  const [imageWidth, setImageWidth] = useState<number>(450)

  const [isEditModeActive, setIsEditModeActive] = useState(false)

  const getImageWidthBasedOnScreenSize = () => {
    let width: number = 0

    const wHeight = window.innerHeight

    if (wHeight >= 400 && wHeight <= 768) width = 200
    if (wHeight >= 768 && wHeight <= 1050) width = 330
    if (wHeight >= 1050 && wHeight <= 1920) width = 450

    setImageWidth(width)
  }

  const debouncer = debounce(getImageWidthBasedOnScreenSize, { waitMs: 500, timing: 'trailing' })

  useEffect(() => {
    window.addEventListener('resize', debouncer.call)

    return () => {
      window.removeEventListener('resize', debouncer.call)
    }
  }, [window.innerHeight])

  useEffect(() => {
    getImageWidthBasedOnScreenSize()
  }, [])

  const menuEntryData = useAtomValue(selectedRowAtom).data as MenuEntry

  useResetHookForm(reset, props.overlayMode)

  if (!menuEntryData) return

  return (
    <div className="flex flex-col p-5 w-full !h-full min-w-[900px]">
      <div className="flex flex-row justify-between">
        {/* <DynamicallyEditableInput render={(onClick) => <div onClick={onClick}>teste haha</div>} /> */}

        <div className="flex flex-row items-center gap-4 justify-between w-full">
          <div className="flex flex-row gap-2 items-center">
            <ModalTitle
              title={
                props.overlayMode === OverlayMode.NEW
                  ? 'Criar novo item'
                  : (menuEntryData.name as string)
              }
            />

            <div className="flex flex-row gap-2 pb-1">
              <p className="underline">Elemento Químico</p>
            </div>
          </div>

          <div className="pb-1.5">
            {/* Add tooltip */}
            {isEditModeActive ? (
              <FaLockOpen color={Colors.GRAY3} size="22px" />
            ) : (
              <FaLock color={Colors.GRAY3} size="22px" />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <div className="h-fit rounded flex flex-col gap-1 justify-between flex-[10]">
          <img
            src="https://www.sabornamesa.com.br/media/k2/items/cache/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg"
            className="rounded-md transition-all"
            style={{
              maxWidth: `${imageWidth}px`
            }}
          />

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

          <form id="create-form" className="w-full">
            <div className="pt-4 flex flex-col gap-4">
              <div>
                <p className="text-lg font-bold">Descrição</p>

                {/* <DynamicallyEditableTextArea /> */}

                {isEditModeActive ? (
                  <FormGroup className="w-full h-full max-h-[180px] min-h-[60px]">
                    <TextArea
                      className="max-h-[160px] min-h-[60px]"
                      placeholder="Descrição"
                      fill
                      // error={errors?.['description']?.message?.toString() as unknown as boolean}
                      defaultValue={menuEntryData.description as string}
                      {...register('description')}
                    />
                    {/* <InputError errorMessage={errors?.['description']?.message?.toString()} /> */}
                  </FormGroup>
                ) : (
                  <div className="pb-4 max-w-[470px] text-wrap min-h-[85px]">
                    <p>{menuEntryData.description}</p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-2 flex-[8]">
          <p className="text-lg font-bold">Variantes</p>

          <Variants
            isEditModeActive={isEditModeActive}
            variants={menuEntryData.variant as MenuEntryVariant[]}
          />
        </div>
      </div>

      <div className="flex flex-row gap-3 justify-between border-t border-t-gray1 pt-4 border-opacity-25">
        <Button
          intent="none"
          icon="disable"
          onClick={() => {
            props?.onCancel?.()
          }}
        >
          Cancelar
        </Button>

        {isEditModeActive ? (
          <Button
            icon="floppy-disk"
            intent="warning"
            form="create-form"
            type="submit"
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              e.preventDefault()
              setIsEditModeActive(false)

              props?.onSave?.()
            }}
          >
            Salvar
          </Button>
        ) : (
          <Button
            icon={'edit'}
            intent={'primary'}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              e.preventDefault()
              setIsEditModeActive(true)
            }}
          >
            Editar
          </Button>
        )}
      </div>
    </div>
  )
}
