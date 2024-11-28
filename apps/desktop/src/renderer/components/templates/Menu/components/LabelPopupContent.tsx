import { useState } from 'react'
import { LabelPopupSelectLabel } from './LabelPopupSelectLabel'
import { LabelPopupCreateLabel } from './LabelPopupCreateLabel'

export const LabelPopupContent = () => {
  const [isCreatingLabel, setIsCreatingLabel] = useState(false)

  const handleCreateNewLabelButton = () => {
    setIsCreatingLabel(true)
  }

  const handleCancelLabelCreationButton = () => {
    setIsCreatingLabel(false)
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
