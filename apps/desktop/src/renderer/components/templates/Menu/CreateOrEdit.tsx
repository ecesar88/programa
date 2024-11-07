import { Button, Colors, EditableText, Tooltip } from '@blueprintjs/core'
import { ModalTitle } from '@renderer/components'
import { Label } from '@renderer/components/molecules'
import { OverlayMode } from '@renderer/constants/enums'
import { MenuEntry, MenuEntryVariantInput } from '@renderer/queries/graphql/codegen/graphql'
import { cn } from '@renderer/utils'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import { debounce } from 'remeda'
import { Variants } from './components/Variants'

type CreateOrEditProps = {
  onSave?: () => void
  onCancel?: () => void
  onDelete?: () => void
  overlayMode: OverlayMode | null
  menuEntryData?: MenuEntry
  isLoading?: boolean
}

export type MenuEntryFormValues = {
  id: number
  name: string
  description?: string
  variant: Array<MenuEntryVariantInput>
}

/**
 * Create or Edit MenuEntry modal
 */
export const CreateOrEditModal = (props: CreateOrEditProps): React.ReactNode => {
  const {
    // formState: {  }, // TODO - add errors to inputs when doing validation with zod schema
    control,
    reset
  } = useFormContext<MenuEntryFormValues>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variant'
  })

  const [imageWidth, setImageWidth] = useState<number>(450)

  // Managed internally
  const [isEditModeActive, setIsEditModeActive] = useState(false)

  // This comes from the Screen component
  const isCreateModeActive = props.overlayMode === OverlayMode.NEW

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

  useEffect(() => {
    if (props.overlayMode === OverlayMode.NEW) {
      reset(
        {
          name: '',
          description: '',
          variant: []
        },
        { keepValues: false, keepDefaultValues: false, keepErrors: false }
      )
    } else {
      reset(props.menuEntryData as MenuEntryFormValues)
    }
  }, [props.menuEntryData])

  const handleOnSaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log('fields >> ', fields)
    // // Remove empty variants (to create)
    // fields.forEach(({ name, description, price }, idx) => {
    //   if (!name?.length || !description?.length || !price || price === 0) {
    //     remove(idx ?? 0)
    //   }
    // })

    e.preventDefault()
    setIsEditModeActive(false)
    props?.onSave?.()
  }

  if (!props?.menuEntryData) return

  return (
    <div className="flex flex-col p-5 w-full !h-full overflow-clip overflow-x-clip overflow-y-clip">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-4 justify-between w-full">
          <div className="flex flex-row gap-2 items-center">
            <ModalTitle
              title={
                props.overlayMode === OverlayMode.NEW || props.overlayMode === OverlayMode.EDIT ? (
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value, ref } }) => (
                      <EditableText
                        className="[&_*]:!cursor-text"
                        disabled={!isCreateModeActive && !isEditModeActive}
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        minWidth={20}
                        intent="none"
                        placeholder="Título..."
                      />
                    )}
                  />
                ) : (
                  (props.menuEntryData.name as string)
                )
              }
            />

            <div className="flex flex-row gap-2 pb-1">
              <Button
                small
                intent={'none'}
                className="rounded-md"
                onClick={() => {
                  // Abrir modal igual no trello
                  console.log('add new cateogory')
                }}
              >
                CATEGORIA
              </Button>
            </div>
          </div>

          <div className="relative w-full">
            <div
              className={cn(
                'flex flex-row gap-[1.5rem] absolute transition-all duration-500 right-[-3.5rem] top-[-1rem]',
                {
                  'right-[0]': isEditModeActive || isCreateModeActive
                }
              )}
            >
              <div className="flex flex-row gap-1">
                {props.menuEntryData.labels?.map((label, idx) => (
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
                  intent={'none'}
                  rightIcon="plus"
                  className="rounded-md"
                  onClick={() => {
                    // Abrir modal igual no trello
                    console.log('add new label')
                  }}
                >
                  {!props.menuEntryData.labels?.length ? 'Adicionar Etiqueta' : null}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <div className="h-fit rounded flex flex-col gap-1 justify-between flex-[10]">
          <img
            src="https://www.sabornamesa.com.br/media/k2/items/cache/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg" // TODO - replace with static asset placeholder image
            className="rounded-md transition-all"
            style={{
              maxWidth: `${imageWidth}px`
            }}
          />

          <form id="create-form" className="w-full">
            <div className="pt-4 flex flex-col gap-4">
              <div>
                <p className="text-lg font-bold">Descrição</p>

                <div className="w-full h-full max-h-[180px] min-h-[60px]">
                  <Controller
                    control={control}
                    name="description"
                    defaultValue={''}
                    render={({ field: { onChange, value, ref } }) => (
                      <EditableText
                        className="[&_*]:!cursor-text max-w-[470px] min-h-[85px] text-wrap"
                        disabled={!isCreateModeActive && !isEditModeActive}
                        onChange={onChange}
                        value={value ?? ''}
                        ref={ref}
                        minWidth={20}
                        maxLength={350}
                        intent="none"
                        multiline
                        placeholder="Nome"
                      />
                      // error={errors?.['description']?.message?.toString() as unknown as boolean}
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-2 flex-[8] min-w-[400px] max-h-[350px]">
          <p className="text-lg font-bold pl-2">Variantes</p>

          <Variants
            variants={fields}
            append={append}
            remove={remove}
            isEditModeActive={isEditModeActive}
            isCreateModeActive={isCreateModeActive}
          />
        </div>
      </div>

      <div className="flex flex-row gap-3 justify-between border-t border-t-gray1 pt-4 border-opacity-25">
        <div>
          <Button
            intent="none"
            icon="disable"
            onClick={() => {
              props?.onCancel?.()
            }}
          >
            Cancelar
          </Button>
        </div>

        <div className="flex gap-3">
          <Button
            intent="danger"
            icon="trash"
            disabled={isEditModeActive || isCreateModeActive}
            onClick={() => {
              props?.onDelete?.()
            }}
          >
            Excluir
          </Button>

          {isEditModeActive || isCreateModeActive ? (
            <Button
              icon="floppy-disk"
              intent="warning"
              form="create-form"
              type="submit"
              loading={props.isLoading}
              onClick={handleOnSaveClick}
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

          <div className="flex items-center">
            {!isCreateModeActive &&
              (isEditModeActive ? (
                <Tooltip compact position="left" content={<span>Este item é editável</span>}>
                  <FaLockOpen color={Colors.GRAY3} size="22px" />
                </Tooltip>
              ) : (
                <Tooltip
                  compact
                  position="left"
                  content={
                    <span>
                      Este item não é editável. Clique no botão &ldquo;editar&ldquo; para editar.
                    </span>
                  }
                >
                  <FaLock color={Colors.GRAY3} size="22px" />
                </Tooltip>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
