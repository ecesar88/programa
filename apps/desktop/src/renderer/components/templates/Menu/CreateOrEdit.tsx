import { Button, Colors, EditableText, Tooltip } from '@blueprintjs/core'
import { ModalTitle } from '@renderer/components'
import { Label } from '@renderer/components/molecules'
import { OverlayMode } from '@renderer/constants/enums'
import { MenuEntry, MenuEntryVariant } from '@renderer/queries/graphql/codegen/graphql'
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

export type CreateType_MenuEntryVariant = Omit<MenuEntryVariant, '__typename' | 'price'> & {
  id: number
  price?: number
}

/**
 * Create or Edit MenuEntry modal
 */
export const CreateOrEditModal = (props: CreateOrEditProps): React.ReactNode => {
  const {
    formState: { errors }, // TODO - add errors to inputs when doing validation with zod schema
    control,
    reset
  } = useFormContext()

  // TODO - tipar direito
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { fields, append, remove } = useFieldArray<any>({
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
    console.log(props.menuEntryData)
    if (props.overlayMode === OverlayMode.NEW) {
      reset(
        {
          name: '',
          description: '',
          price: undefined,
          variant: []
        },
        { keepValues: false, keepDefaultValues: false, keepErrors: false }
      )

      console.log('NEW')
    } else {
      reset(props.menuEntryData)
    }
  }, [props.menuEntryData])

  const handleOnSaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log('fields >> ', fields)
    // Remove empty variants (to create)
    ;(fields as unknown as CreateType_MenuEntryVariant[]).forEach(
      ({ name, description, price }: CreateType_MenuEntryVariant, idx) => {
        if (!name?.length || !description?.length || !price || price === 0) {
          remove(idx ?? 0)
        }
      }
    )

    e.preventDefault()
    setIsEditModeActive(false)

    props?.onSave?.()
  }

  if (!props?.menuEntryData) return

  return (
    <div className="flex flex-col p-5 w-full !h-full min-w-[900px]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-4 justify-between w-full">
          <div className="flex flex-row gap-2 items-center">
            <ModalTitle
              title={
                props.overlayMode === OverlayMode.NEW || props.overlayMode === OverlayMode.EDIT ? (
                  <Controller
                    control={control}
                    name="name"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    defaultValue={(fields as Record<string, any>)?.name as string}
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
                        // defaultValue={
                        //   props.overlayMode === OverlayMode.EDIT
                        //     ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        //       ((fields as Record<string, any>)?.name as string)
                        //     : undefined
                        // }
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

          <div className="pb-1.5">
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

      <div className="flex flex-row justify-between gap-4">
        <div className="h-fit rounded flex flex-col gap-1 justify-between flex-[10]">
          <img
            src="https://www.sabornamesa.com.br/media/k2/items/cache/b5b56b2ae93d3dc958cf0c21c9383b18_XL.jpg" // TODO - replace with static asset placeholder image
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
                {props.menuEntryData.labels?.map((label, idx) => (
                  <Label
                    key={idx}
                    name={label.name}
                    color={label.color}
                    className="min-h-[26px] flex justify-center align-center"
                  />
                ))}
              </div>

              <div
                className={cn('transition-all duration-500', {
                  'opacity-0': !isCreateModeActive || isEditModeActive,
                  'opacity-100': isCreateModeActive || isEditModeActive
                })}
              >
                <Button
                  icon={'plus'}
                  intent={'none'}
                  className="rounded-md"
                  onClick={() => {
                    console.log(props.menuEntryData)
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

                <div className="w-full h-full max-h-[180px] min-h-[60px]">
                  <Controller
                    control={control}
                    name="description"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    defaultValue={(fields as Record<string, any>)?.description as string}
                    render={({ field: { onChange, value, ref } }) => (
                      <EditableText
                        className="[&_*]:!cursor-text max-w-[470px] min-h-[85px] text-wrap"
                        disabled={!isCreateModeActive && !isEditModeActive}
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        minWidth={20}
                        maxLength={350}
                        intent="none"
                        multiline
                        placeholder="Nome"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        // defaultValue={(fields as Record<string, any>)?.description as string}
                      />
                      // error={errors?.['description']?.message?.toString() as unknown as boolean}
                      // <InputError errorMessage={errors?.['description']?.message?.toString()} />
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-2 flex-[8]">
          <p className="text-lg font-bold">Variantes</p>

          <Variants
            variants={fields as unknown as MenuEntryVariant[]}
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
        </div>
      </div>
    </div>
  )
}
