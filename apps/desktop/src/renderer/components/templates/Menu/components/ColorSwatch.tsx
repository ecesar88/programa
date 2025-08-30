import { cn } from '@renderer/utils'

type ColorSwatchProps = {
  color: string
  onClick: () => void
  selected: boolean
}

export const ColorSwatch = (props: ColorSwatchProps) => {
  return (
    <div
      style={{
        backgroundColor: props.color
      }}
      className={cn(
        'min-w-[10px] min-h-[35px] rounded-md border  border-gray3 hover:cursor-pointer! hover:scale-105! transition-all',
        {
          ['outline outline-2 outline-cerulean3']: props.selected
        }
      )}
      onClick={props.onClick}
    ></div>
  )
}
