import { Button } from '@blueprintjs/core'
import { Input, Loading } from '@renderer/components'
import { useFragment } from '@renderer/queries/graphql/codegen'
import {
  MenuEntryLabel_FragmentFragment,
  MenuEntryLabel_FragmentFragmentDoc
} from '@renderer/queries/graphql/codegen/graphql'
import { getAllMenuEntryLabels } from '@renderer/queries/operations/menu'
import { isCreatingLabelAtom, labelDataAtom } from '@renderer/store/labelPopupContent'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { debounce } from 'remeda'
import { match } from 'ts-pattern'
import { LabelPopupCheckboxLabel } from './LabelPopupCheckboxLabel'
import { queryKeys } from '@renderer/constants'

export const LabelPopupSelectLabel = () => {
  const [selectedLabels, setSelectedLabels] = useState<number[]>([])

  const [popupHeight, setPopupHeight] = useState<number>(350)

  const getPopupHeightBasedOnScreenSize = () => {
    let height: number = 0

    const wHeight = window.innerHeight

    if (wHeight >= 400 && wHeight <= 768) height = 180
    if (wHeight >= 768 && wHeight <= 1050) height = 330
    if (wHeight >= 1050 && wHeight <= 1920) height = 450

    setPopupHeight(height)
  }

  const imageDebouncer = debounce(getPopupHeightBasedOnScreenSize, {
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
    getPopupHeightBasedOnScreenSize()
  }, [])

  const setLabelData = useSetAtom(labelDataAtom)
  const setIsCreatingLabel = useSetAtom(isCreatingLabelAtom)

  const { data: menuEntryLabelData, isLoading: isLoadingMenuEntryLabelData } = useQuery({
    queryKey: queryKeys['menuEntryLabels']['getAll'],
    queryFn: getAllMenuEntryLabels,
    meta: {
      errorMessage: 'Erro ao obter labels do menu entry'
    }
  })

  const handleOnEditLabel = (labelData: MenuEntryLabel_FragmentFragment) => {
    setLabelData(labelData)
    setIsCreatingLabel(true)
  }

  return (
    <div className="flex flex-col items-center w-full gap-2 p-2">
      <div>
        <p className="font-bold">Labels</p>
      </div>

      <div className="w-full">
        <Input leftIcon="search" className="w-full" placeholder="Search labels" fill />
      </div>

      {/* TODO - Ajustar max-height para ser dinamico */}
      <div
        className="relative flex flex-col gap-1 w-full items-start justify-start overflow-y-auto over pr-1"
        style={{ height: `${popupHeight}px` }}
      >
        {match(isLoadingMenuEntryLabelData)
          .with(true, () => <Loading />)
          .otherwise(() =>
            menuEntryLabelData?.getAllMenuEntryLabels?.map((label) => {
              const labelData = useFragment(MenuEntryLabel_FragmentFragmentDoc, label)

              return (
                <LabelPopupCheckboxLabel
                  key={labelData.id}
                  onEditLabel={() => handleOnEditLabel(labelData)}
                  labelData={labelData}
                  checked={selectedLabels.includes(labelData.id as number)}
                  onSelect={() => {
                    setSelectedLabels((prev) => {
                      if (prev.includes(labelData.id as number)) {
                        return prev.filter((id) => id !== (labelData.id as number))
                      }

                      return [...prev, labelData.id as number]
                    })
                  }}
                />
              )
            })
          )}
      </div>

      <div className="border border-t border-lightGray3 mt-0.5 w-full"></div>

      <div className="flex flex-col gap-2 w-full">
        <Button
          intent="none"
          onClick={() => {
            setIsCreatingLabel(true)
          }}
          disabled={isLoadingMenuEntryLabelData}
          small
        >
          Create new label
        </Button>
      </div>
    </div>
  )
}
