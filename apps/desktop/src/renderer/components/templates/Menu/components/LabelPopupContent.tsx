import { useFragment } from '@renderer/queries/graphql/codegen'
import {
  MenuEntryLabel_FragmentFragment,
  MenuEntryLabel_FragmentFragmentDoc
} from '@renderer/queries/graphql/codegen/graphql'
import { getAllMenuEntryLabels } from '@renderer/queries/operations/menu'
import { isCreatingLabelAtom } from '@renderer/store/labelPopupContent'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { LabelPopupCreateLabel } from './LabelPopupCreateLabel'
import { LabelPopupSelectLabel } from './LabelPopupSelectLabel'

export const LabelPopupContent = () => {
  const isCreatingLabel = useAtomValue(isCreatingLabelAtom)

  const menuEntryLabelQuery = useQuery({
    queryKey: ['getAllMenuEntryLabels'],
    queryFn: getAllMenuEntryLabels,
    staleTime: 0,
    meta: {
      errorMessage: 'Err fetching MenuEntryLabels'
    }
  })

  const menuEntryLabels = useFragment(
    MenuEntryLabel_FragmentFragmentDoc,
    menuEntryLabelQuery.data?.getAllMenuEntryLabels
  )

  const onCreateOrUpdate = async () => {
    await menuEntryLabelQuery.refetch()
  }

  return (
    <div className="transition-all">
      {isCreatingLabel ? (
        <LabelPopupCreateLabel refetchLabels={onCreateOrUpdate} />
      ) : (
        <LabelPopupSelectLabel data={menuEntryLabels as MenuEntryLabel_FragmentFragment[]} />
      )}
    </div>
  )
}
