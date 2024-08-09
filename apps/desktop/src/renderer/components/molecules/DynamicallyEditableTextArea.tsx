import { FormGroup, TextArea } from '@blueprintjs/core'
import { forwardRef, LegacyRef } from 'react'
import { InputError } from './InputError'

// TODO
export const DynamicallyEditableTextArea = forwardRef((props, ref) => {
  return (
    <div>
      <FormGroup className="w-full h-full max-h-[180px] min-h-[50px]">
        <TextArea
          ref={ref as LegacyRef<TextArea>}
          className="max-h-[160px] min-h-[50px]"
          placeholder="Descrição"
          fill
        />
        <InputError errorMessage={''} />
      </FormGroup>
    </div>
  )
})

DynamicallyEditableTextArea.displayName = 'DynamicallyEditableTextArea'
