import { Button } from '@blueprintjs/core'
import { Input, Label } from '@renderer/components'
import { useState } from 'react'
import { ColorSwatch } from './ColorSwatch'
import { LabelFragmentFragment } from '@renderer/queries/graphql/codegen/graphql'
import { FaTrashAlt } from 'react-icons/fa'
import { ImCheckmark } from 'react-icons/im'

type LabelPopupCreateLabelProps = {
  labelData?: LabelFragmentFragment
  handleCancelLabelCreationButton: () => void
}

const COLORS = [
  '#004d40',
  '#5d4037',
  '#6d4c41',
  '#bf360c',
  '#4a148c',
  '#00796b',
  '#827717',
  '#c6a700',
  '#d84315',
  '#512da8',
  '#1a237e',
  '#1976d2',
  '#388e3c',
  '#9e9d24',
  '#7b1fa2',
  '#0d47a1',
  '#0288d1',
  '#43a047',
  '#689f38',
  '#e91e63',
  '#03a9f4',
  '#81d4fa',
  '#64dd17',
  '#aed581',
  '#9e9e9e'
]

export const LabelPopupCreateLabel = (props: LabelPopupCreateLabelProps) => {
  const [labelData, setLabelData] = useState<{ name: string; color: string }>({
    name: props?.labelData?.name ?? '',
    color: props?.labelData?.color ?? COLORS[1]
  })

  const handleCreateLabelButton = () => {
    props.handleCancelLabelCreationButton()
  }

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <div className="relative w-full flex items-center justify-center px-2 pt-2">
        <div className="absolute left-0 ml-1">
          <Button
            intent="none"
            minimal
            icon="chevron-left"
            onClick={props.handleCancelLabelCreationButton}
          />
        </div>

        <div>
          <p className="font-bold">New label</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full items-center p-4 bg-lightGray4">
        <Label
          color={labelData.color}
          name={labelData.name}
          className="w-full min-h-[32px] flex justify-center align-center"
        />
      </div>

      <div className="w-full px-2 flex flex-col gap-2">
        <div>
          <p className="text-xs font-bold">Title</p>
        </div>
        <Input
          className="w-full"
          placeholder="Title"
          fill
          value={labelData.name}
          onChange={(evt) => {
            setLabelData((prev) => ({ ...prev, name: evt.target.value }))
          }}
        />

        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xs font-bold">Choose a color</p>
          </div>

          <div className="w-full grid grid-cols-5 gap-1 gap-x-1">
            {COLORS.map((color, idx) => (
              <ColorSwatch
                key={idx}
                color={color}
                selected={color === labelData['color']}
                onClick={() => setLabelData((prev) => ({ ...prev, color: color }))}
              />
            ))}
          </div>
        </div>

        <div className="border border-t border-lightGray3 mt-0.5 w-[95%]"></div>

        <div className="flex flex-row gap-4 w-full pb-2 justify-between">
          <Button
            icon={<FaTrashAlt className="text-white" />}
            intent="danger"
            fill
            disabled={!labelData.name.length}
          />

          <Button
            icon={<ImCheckmark className="text-white" />}
            intent="success"
            fill
            disabled={!labelData.name.length}
            onClick={handleCreateLabelButton}
          />
        </div>
      </div>
    </div>
  )
}
