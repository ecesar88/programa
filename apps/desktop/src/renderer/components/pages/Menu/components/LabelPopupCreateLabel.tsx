import { Button } from '@blueprintjs/core'
import { Input, Label } from '@renderer/components'
import { LABEL_COLORS, queryKeys } from '@renderer/constants'
import {
  MenuEntryLabel,
  MenuEntryLabel_FragmentFragment
} from '@renderer/queries/graphql/codegen/graphql'
import {
  createOrUpdateMenuEntryLabel,
  deleteMenuEntryLabel
} from '@renderer/queries/operations/menu'
import { isCreatingLabelAtom, labelDataAtom } from '@renderer/store/labelPopupContent'
import { errorToast, handleResponseStatus, successToast } from '@renderer/utils'
import { useMutation } from '@tanstack/react-query'
import { useAtom, useSetAtom } from 'jotai'
import { FaTrashAlt } from 'react-icons/fa'
import { ImCheckmark } from 'react-icons/im'
import { ColorSwatch } from './ColorSwatch'

type LabelPopupCreateLabelProps = {
  refetchLabels: () => void
}

export const LabelPopupCreateLabel = (props: LabelPopupCreateLabelProps) => {
  const [labelData, setLabelData] = useAtom(labelDataAtom)
  const setIsCreatingLabel = useSetAtom(isCreatingLabelAtom)

  const createOrUpdateMenuEntryLabelMutation = useMutation({
    mutationKey: queryKeys['menuEntryLabels']['createOrUpdate'],
    mutationFn: createOrUpdateMenuEntryLabel,
    onSuccess: async (data) => {
      console.log({ data })
      // TODO - test this
      handleResponseStatus<MenuEntryLabel>({
        response: data?.createOrUpdateMenuEntryLabel as MenuEntryLabel,
        Ok: async () => {
          props.refetchLabels()
        },
        Err: (error) => {
          if (error.__typename === 'ZodError') {
            errorToast('Validation error')
            return
          }

          errorToast('API Error')
        }
      })
    },
    meta: {
      errorMessage: 'Erro ao modificar o produto'
    }
  })

  const deleteMenuEntryLabelMutation = useMutation({
    mutationKey: queryKeys['menuEntryLabels']['delete'],
    mutationFn: deleteMenuEntryLabel,
    onSuccess: async (data) => {
      // TODO - test this
      handleResponseStatus<MenuEntryLabel>({
        response: data?.deleteMenuEntryLabel as MenuEntryLabel,
        Ok: async () => {
          successToast('Etiqueta deletada')
          props.refetchLabels?.()
        },
        Err: (error) => {
          console.log({ error })
          if (error.__typename === 'ZodError') {
            errorToast('Validation error')
            return
          }

          errorToast('API Error')
        }
      })
    },
    meta: {
      errorMessage: 'Erro ao modificar o produto'
    }
  })

  const cancelLabelCreation = () => {
    setIsCreatingLabel(false)
    setLabelData(undefined)
  }

  const handleCreateOrUpdateLabelButton = () => {
    if (!labelData) return

    const { id, name, color } = labelData
    createOrUpdateMenuEntryLabelMutation.mutate({ id, data: { name, color } })

    cancelLabelCreation()
  }

  const handleDeleteLabelButton = () => {
    if (!labelData?.id) return

    const { id } = labelData
    deleteMenuEntryLabelMutation.mutate({ id })

    cancelLabelCreation()
  }

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <div className="relative w-full flex items-center justify-center px-2 pt-2">
        <div className="absolute left-0 ml-1">
          <Button intent="none" minimal icon="chevron-left" onClick={cancelLabelCreation} />
        </div>

        <div>
          <p className="font-bold">New label</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full items-center p-4 bg-light-gray4">
        <Label
          color={labelData?.color ?? ''}
          name={labelData?.name ?? ''}
          className="w-full min-h-[32px] flex justify-center align-center"
        />
      </div>

      <div className="w-full px-2 flex flex-col gap-2">
        <div>
          <p className="text-xs font-bold">Title</p>
        </div>
        <Input
          className="w-full"
          placeholder="Title"
          fill
          value={labelData?.name ?? ''}
          onChange={(evt) => {
            setLabelData({
              ...(labelData as MenuEntryLabel_FragmentFragment),
              name: evt.target.value
            })
          }}
        />

        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xs font-bold">Choose a color</p>
          </div>

          <div className="w-full grid grid-cols-5 gap-1 gap-x-1">
            {LABEL_COLORS.map((color, idx) => (
              <ColorSwatch
                key={idx}
                color={color}
                selected={color === labelData?.['color']}
                onClick={() =>
                  setLabelData({ ...(labelData as MenuEntryLabel_FragmentFragment), color })
                }
              />
            ))}
          </div>
        </div>

        <div className="border border-t border-light-gray3 mt-0.5 w-[95%]"></div>

        <div className="flex flex-row gap-4 w-full pb-2 justify-between">
          <Button
            icon={<FaTrashAlt className="text-white" />}
            intent="danger"
            fill
            disabled={!labelData?.name?.length}
            onClick={handleDeleteLabelButton}
          />

          <Button
            icon={<ImCheckmark className="text-white" />}
            intent="success"
            fill
            disabled={!labelData?.name?.length}
            onClick={handleCreateOrUpdateLabelButton}
          />
        </div>
      </div>
    </div>
  )
}
