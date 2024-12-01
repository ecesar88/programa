import { Button } from '@blueprintjs/core'
import { Input, Loading } from '@renderer/components'
import { getAllMenuEntryLabels } from '@renderer/queries/operations/menu'
import { useQuery } from '@tanstack/react-query'
import { match } from 'ts-pattern'
import { LabelPopupCheckboxLabel } from './LabelPopupCheckboxLabel'
import { useState } from 'react'
import { useFragment } from '@renderer/queries/graphql/codegen'
import { LabelFragmentFragmentDoc } from '@renderer/queries/graphql/codegen/graphql'

type LabelPopupSelectLabelProps = {
  handleCreateNewLabelButton: () => void
}

export const LabelPopupSelectLabel = (props: LabelPopupSelectLabelProps) => {
  const [selectedLabels, setSelectedLabels] = useState<number[]>([])

  const { data: menuEntryLabelData, isLoading: isLoadingMenuEntryLabelData } = useQuery({
    queryKey: ['getAllMenuEntryLabels'],
    queryFn: getAllMenuEntryLabels,
    meta: {
      errorMessage: 'Erro ao obter labels do menu entry'
    }
  })

  return (
    <div className="flex flex-col items-center w-full gap-2 p-2">
      <div>
        <p className="font-bold">Labels</p>
      </div>

      <div className="w-full">
        <Input leftIcon="search" className="w-full" placeholder="Search labels" fill />
      </div>

      {/* Ajustar max-height para ser dinamico */}
      <div className="relative flex flex-col gap-1 w-full items-start justify-start h-full max-h-[350px] overflow-y-auto over pr-1">
        {match(isLoadingMenuEntryLabelData)
          .with(true, () => <Loading />)
          .otherwise(() =>
            menuEntryLabelData?.getAllMenuEntryLabels?.map((label) => {
              const labelData = useFragment(LabelFragmentFragmentDoc, label)

              return (
                <LabelPopupCheckboxLabel
                  key={labelData.id}
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
          onClick={props.handleCreateNewLabelButton}
          disabled={isLoadingMenuEntryLabelData}
          small
        >
          Create new label
        </Button>
      </div>
    </div>
  )
}
