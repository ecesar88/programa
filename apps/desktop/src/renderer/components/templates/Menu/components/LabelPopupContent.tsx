import { getAllMenuEntryLabels } from '@renderer/queries/operations/menu'
import { isCreatingLabelAtom } from '@renderer/store/labelPopupContent'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { LabelPopupCreateLabel } from './LabelPopupCreateLabel'
import { LabelPopupSelectLabel } from './LabelPopupSelectLabel'
import { queryKeys } from '@renderer/constants'

export const LabelPopupContent = () => {
  const isCreatingLabel = useAtomValue(isCreatingLabelAtom)

  const menuEntryLabelQuery = useQuery({
    queryKey: queryKeys['menuEntryLabels']['getAll'],
    queryFn: getAllMenuEntryLabels,
    staleTime: 0,
    meta: {
      errorMessage: 'Err fetching MenuEntryLabels'
    }
  })

  const onCreateOrUpdate = async () => {
    await menuEntryLabelQuery.refetch()
  }

  return (
    <div className="transition-all">
      {isCreatingLabel ? (
        <LabelPopupCreateLabel refetchLabels={onCreateOrUpdate} />
      ) : (
        <LabelPopupSelectLabel />
      )}
    </div>
  )
}
