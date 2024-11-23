import { Button, Colors, EditableText, Tooltip } from '@blueprintjs/core'
import { animated, useSpring } from '@react-spring/web'
import { ModalTitle } from '@renderer/components'
import { Label } from '@renderer/components/molecules'
import { OverlayMode } from '@renderer/constants/enums'
import {
  MenuEntry,
  MenuEntryCategoryInput,
  MenuEntryLabelInput,
  MenuEntryVariantInput
} from '@renderer/queries/graphql/codegen/graphql'
import { useIsFirstRender } from '@uidotdev/usehooks'
import fastDeepEqual from 'fast-deep-equal'
import React, { useEffect, useMemo, useState } from 'react'
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
  editMode: {
    isEditModeActive: boolean
    setIsEditModeActive: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export type MenuEntryFormValues = {
  name: string
  description?: string
  variants: Array<MenuEntryVariantInput>
  labels: Array<MenuEntryLabelInput>
  categories: Array<MenuEntryCategoryInput>
}

/**
 * Create or Edit MenuEntry modal
 */
export const CreateOrEditModal = (props: CreateOrEditProps): React.ReactNode => {
  const {
    formState: { errors }, // TODO - add errors to inputs when doing validation with zod schema
    control,
    reset,
    getValues,
    watch
  } = useFormContext<MenuEntryFormValues>()

  console.log(errors, watch())

  const {
    fields: variantsFields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'variants'
  })

  const [imageWidth, setImageWidth] = useState<number>(450)

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

  const imageDebouncer = debounce(getImageWidthBasedOnScreenSize, {
    waitMs: 500,
    timing: 'trailing'
  })

  useEffect(() => {
    window.addEventListener('resize', imageDebouncer.call)

    return () => {
      window.removeEventListener('resize', imageDebouncer.call)
    }
  }, [window.innerHeight])

  useEffect(() => {
    getImageWidthBasedOnScreenSize()
  }, [])

  // Populate form data based on OverlayMode
  useEffect(() => {
    if (props.overlayMode === OverlayMode.NEW) {
      reset(
        {
          name: '',
          description: '',
          variants: []
        },
        { keepValues: false, keepDefaultValues: false, keepErrors: false }
      )
    } else {
      if (!props.menuEntryData) return

      // Remove id for GraphQL validation on update
      const { id: _id, ...data } = props.menuEntryData
      reset(data as Partial<MenuEntryFormValues>)
    }
  }, [props.menuEntryData])

  const areThereLabelsToShow = props.menuEntryData?.labels?.length

  const addLabelButtonAnimationStyle = useSpring({
    right: (() => {
      if (props.editMode.isEditModeActive || isCreateModeActive) return 0
      if (areThereLabelsToShow) return -50
      return 0
    })(),
    opacity: (() => {
      if (areThereLabelsToShow) return 1
      if (!areThereLabelsToShow && (props.editMode.isEditModeActive || isCreateModeActive)) return 1
      return 0
    })()
  })

  /**
   * Only enable the "Save" button if the user has modified something.
   * This works by running fast-deep-equal to compare the initial values on the form with the current ones
   * This prevents sending out an useless request
   */
  const isFirstRender = useIsFirstRender()
  const [initialFormValues, setInitialFormValues] = useState<MenuEntryFormValues>()

  useEffect(() => {
    if (!isFirstRender) return

    setInitialFormValues(getValues())
  }, [isFirstRender, getValues()])

  const formValues = watch()

  const variantNames = formValues?.variants ? formValues?.variants?.map((vf) => vf.name) : []
  const variantPrices = formValues?.variants ? formValues?.variants?.map((vf) => vf.price) : []

  const theresEmptyVariants = useMemo(
    () => {
      if (!formValues.variants) return

      const emptyVariants = formValues.variants.map((variant) =>
        Object.entries(variant).some(([key, value]) => {
          // const nameSchema = z.string().min(3)
          // const priceSchema = z.string().regex(/[0-9]/g)

          // let result: boolean = false

          // match(key)
          //   .with('name', () => {
          //     const parse = nameSchema.safeParse(value)
          //     console.log('parse > ', parse)
          //     result = parse.success
          //   })
          //   .with('price', () => {
          //     const parse = priceSchema.safeParse(value)
          //     console.log('parse > ', parse)
          //     result = parse.success
          //   })

          if (key === 'name' && typeof value === 'string') return value.length <= 0
          else if (key === 'price' && (typeof value === 'object' || typeof value == 'number'))
            return value === null || value <= 0 || isNaN(value)

          // return result // replace with regex

          return false
        })
      )

      return !emptyVariants.every((result) => result === false)
    },
    // Watch the form values as they change
    [...variantNames, ...variantPrices]
  )

  const hasTheUserModifiedAnything = useMemo(
    () => !fastDeepEqual(initialFormValues, formValues),
    [formValues]
  )

  /* ************************************************************************************************* */

  const handleOnSaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log('fields >> ', fields)
    // // Remove empty variants (to create)
    // fields.forEach(({ name, description, price }, idx) => {
    //   if (!name?.length || !description?.length || !price || price === 0) {
    //     remove(idx ?? 0)
    //   }
    // })

    e.preventDefault()
    props?.onSave?.()
  }

  const handleOnEditClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()

    props.editMode.setIsEditModeActive(true)
  }

  const handleOnCancelClick = () => {
    if (props.editMode.isEditModeActive) {
      props.editMode.setIsEditModeActive(false)
    } else {
      props?.onCancel?.()
    }
  }

  if (!props?.menuEntryData) return

  return (
    <div
      id="create-or-edit-menu-entry-modal"
      className="flex flex-col p-5 w-full overflow-clip overflow-x-clip overflow-y-clip !max-h-[70vh]"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-4 justify-between w-full relative">
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
                        disabled={!isCreateModeActive && !props.editMode.isEditModeActive}
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

          <animated.div
            style={addLabelButtonAnimationStyle}
            className="flex flex-row justify-end min-h-[30px] gap-[1rem] absolute right-0"
          >
            <div className="flex flex-row gap-1">
              {props.menuEntryData?.labels?.map((label, idx) => (
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
                {!props.menuEntryData?.labels?.length ? 'Adicionar Etiqueta' : null}
              </Button>
            </div>
          </animated.div>
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
                        disabled={!isCreateModeActive && !props.editMode.isEditModeActive}
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

        <div className="flex flex-col gap-2 flex-[8] min-w-[400px]">
          <p className="text-lg font-bold pl-2">Variantes</p>

          <Variants
            variants={variantsFields}
            append={append}
            remove={remove}
            isEditModeActive={props.editMode.isEditModeActive}
            isCreateModeActive={isCreateModeActive}
          />
        </div>
      </div>

      <div className="flex flex-row gap-3 justify-between border-t border-t-gray1 pt-4 border-opacity-25">
        <div>
          <Button
            intent="none"
            icon={isCreateModeActive || props.editMode.isEditModeActive ? 'disable' : 'cross'}
            onClick={handleOnCancelClick}
          >
            {isCreateModeActive || props.editMode.isEditModeActive ? 'Cancelar' : 'Fechar'}
          </Button>
        </div>

        <div className="flex gap-3">
          <Button
            intent="danger"
            icon="trash"
            disabled={props.editMode.isEditModeActive || isCreateModeActive}
            onClick={() => {
              props?.onDelete?.()
            }}
          >
            Excluir
          </Button>

          {props.editMode.isEditModeActive || isCreateModeActive ? (
            <Button
              icon="floppy-disk"
              intent="warning"
              form="create-form"
              type="submit"
              disabled={!hasTheUserModifiedAnything || theresEmptyVariants}
              loading={props.isLoading}
              onClick={handleOnSaveClick}
            >
              Salvar
            </Button>
          ) : (
            <Button icon={'edit'} intent={'primary'} onClick={handleOnEditClick}>
              Editar
            </Button>
          )}

          <div className="flex items-center">
            {!isCreateModeActive &&
              (props.editMode.isEditModeActive ? (
                <Tooltip compact position="bottom" content={<span>Este item é editável</span>}>
                  <FaLockOpen color={Colors.GRAY3} size="22px" />
                </Tooltip>
              ) : (
                <Tooltip
                  compact
                  position="bottom"
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
