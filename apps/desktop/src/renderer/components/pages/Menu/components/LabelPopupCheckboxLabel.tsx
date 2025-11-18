import { Checkbox } from '@blueprintjs/core'
import { Label } from '@renderer/components'
import { MenuEntryLabel } from '@renderer/queries/graphql/codegen/graphql'
import { MdEdit } from 'react-icons/md'

type LabelPopupCheckboxLabel = {
  labelData: Omit<MenuEntryLabel, 'id'>
  checked: boolean
  onSelect?: () => void
  onEditLabel: () => void
}

export const LabelPopupCheckboxLabel = (props: LabelPopupCheckboxLabel) => {
  return (
    <div className="flex flex-row w-full gap-1">
      <div className="flex items-center flex-1">
        <Checkbox className="ml-1 m-0" checked={props.checked} onClick={props.onSelect} />
      </div>

      <div className="w-full flex-9" onClick={props.onSelect}>
        <Label
          name={props.labelData.name}
          color={props.labelData.color}
          className="w-full min-h-[32px] flex justify-center align-center"
        />
      </div>

      <div className={'h-full flex-1 flex items-center'}>
        <button
          onClick={props.onEditLabel}
          className="bg-light-gray5 hover:bg-light-gray3 p-1 flex justify-center items-center rounded-sm h-full group **:cursor-pointer! cursor-pointer! active:bg-light-gray2"
        >
          <MdEdit className="text-gray4 group-hover:text-gray1" />
        </button>
      </div>
    </div>
  )
}
