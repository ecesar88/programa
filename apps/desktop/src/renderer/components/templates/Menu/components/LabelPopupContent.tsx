import { isCreatingLabelAtom, labelDataAtom } from '@renderer/store/labelPopupContent'
import { useAtom, useSetAtom } from 'jotai'
import { LabelPopupCreateLabel } from './LabelPopupCreateLabel'
import { LabelPopupSelectLabel } from './LabelPopupSelectLabel'

export const LabelPopupContent = () => {
  const setLabelData = useSetAtom(labelDataAtom)
  const [isCreatingLabel, setIsCreatingLabel] = useAtom(isCreatingLabelAtom)

  const handleCreateNewLabelButton = () => {
    setIsCreatingLabel(true)
  }

  // TODO - clear data when unmounting
  const handleCancelLabelCreationButton = () => {
    setIsCreatingLabel(false)
    setLabelData(undefined)
  }

  return (
    <div className="transition-all">
      {isCreatingLabel ? (
        <LabelPopupCreateLabel handleCancelLabelCreationButton={handleCancelLabelCreationButton} />
      ) : (
        <LabelPopupSelectLabel handleCreateNewLabelButton={handleCreateNewLabelButton} />
      )}
    </div>
  )
}
