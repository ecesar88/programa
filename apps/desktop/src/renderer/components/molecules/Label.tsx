import { MenuEntryLabel_FragmentFragment } from '@renderer/queries/graphql/codegen/graphql'
import { cn, getContrastingTextColor } from '@renderer/utils'
import { useState } from 'react'
import tinycolor from 'tinycolor2'

export const Label = (
  props: Omit<MenuEntryLabel_FragmentFragment, '__typename' | '$fragmentName' | 'id'> & {
    className?: string
  }
) => {
  const [hover, setHover] = useState<boolean>(false)

  const textColor = getContrastingTextColor(props.color as string)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover
          ? `#${tinycolor(props.color as string)
              .brighten(15)
              .toHex()}`
          : `${props.color}`
      }}
      className={cn(
        'flex justify-center items-center rounded-sm w-fit min-w-[30px] px-2 py-0 **:cursor-pointer! cursor-pointer!',
        props.className
      )}
    >
      <p style={{ color: textColor }} className="text-xs m-0!">
        {props.name}
      </p>
    </div>
  )
}
