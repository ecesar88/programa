import { InputGroup, InputGroupProps } from '@blueprintjs/core'
import * as React from 'react'

export const Input = React.forwardRef<
  HTMLInputElement,
  InputGroupProps & {
    error?: boolean
  }
>((props, ref) => {
  const intent = props?.error ? 'danger' : 'none'

  return (
    <InputGroup fill inputRef={ref} intent={props?.intent ? props.intent : intent} {...props} />
  )
})

Input.displayName = 'Blueprint_Input'
