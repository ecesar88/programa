import { useState } from 'react'
import { LabelPopupSelectLabel } from './LabelPopupSelectLabel'
import { LabelPopupCreateLabel } from './LabelPopupCreateLabel'
import { LabelFragmentFragment } from '@renderer/queries/graphql/codegen/graphql'

export const LabelPopupContent = () => {
  const [isCreatingLabel, setIsCreatingLabel] = useState(false)

  const [labelData, setLabelData] = useState<LabelFragmentFragment>()

  const handleCreateNewLabelButton = () => {
    setIsCreatingLabel(true)
  }

  const handleCancelLabelCreationButton = () => {
    setIsCreatingLabel(false)
    setLabelData(undefined)
  }

  return (
    <div className="transition-all">
      {isCreatingLabel ? (
        <LabelPopupCreateLabel
          labelData={labelData}
          handleCancelLabelCreationButton={handleCancelLabelCreationButton}
        />
      ) : (
        <LabelPopupSelectLabel
          setLabelData={setLabelData}
          handleCreateNewLabelButton={handleCreateNewLabelButton}
        />
      )}
    </div>
  )
}
