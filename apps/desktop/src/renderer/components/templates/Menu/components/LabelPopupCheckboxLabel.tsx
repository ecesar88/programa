import { Button, Checkbox } from '@blueprintjs/core'
import { Label } from '@renderer/components'
import { MenuEntryLabel } from '@renderer/queries/graphql/codegen/graphql'
import { FaTrashAlt } from 'react-icons/fa'

type LabelPopupCheckboxLabel = {
  labelData: Omit<MenuEntryLabel, 'id'>
  checked: boolean
  onSelect?: () => void
}

export const LabelPopupCheckboxLabel = (props: LabelPopupCheckboxLabel) => {
  return (
    <div className="flex flex-row w-full group gap-2 transition-all">
      <div className="flex items-center flex-[1]">
        <Checkbox className="ml-1 m-0" checked={props.checked} onClick={props.onSelect} />
      </div>

      <div className="w-full flex-[8]" onClick={props.onSelect}>
        <Label
          name={props.labelData.name}
          color={props.labelData.color}
          className="w-full min-h-[32px] flex justify-center align-center"
        />
      </div>

      <div className={'h-full duration-300 group-hover:block hidden flex-[2]'}>
        <Button
          className="rounded w-fit h-full"
          icon={<FaTrashAlt className="text-white" />}
          fill
          small
          intent="danger"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}
