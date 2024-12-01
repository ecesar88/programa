import { Checkbox } from '@blueprintjs/core'
import { Label } from '@renderer/components'
import { MenuEntryLabel } from '@renderer/queries/graphql/codegen/graphql'

type LabelPopupCheckboxLabel = {
  labelData: Omit<MenuEntryLabel, 'id'>
  checked: boolean
  onSelect?: () => void
}

export const LabelPopupCheckboxLabel = (props: LabelPopupCheckboxLabel) => {
  return (
    <div className="flex flex-row w-full">
      <div className="flex items-center">
        <Checkbox className="ml-1 m-0" checked={props.checked} onClick={props.onSelect} />
      </div>

      <div className="w-full" onClick={props.onSelect}>
        <Label
          name={props.labelData.name}
          color={props.labelData.color}
          className="w-full min-h-[32px] flex justify-center align-center"
        />
      </div>
    </div>
  )
}
