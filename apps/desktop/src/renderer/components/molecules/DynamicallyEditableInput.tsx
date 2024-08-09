import { FormGroup } from '@blueprintjs/core'
import { forwardRef, LegacyRef, useState } from 'react'
import { Input } from './Input'

type DynamicallyEditableInputProps = {
  render: (onClick: () => void) => React.ReactNode
}

export const DynamicallyEditableInput = forwardRef((props: DynamicallyEditableInputProps, ref) => {
  const [inputEnabled, setInputEnabled] = useState(false)
  const toggleInputRender = () => setInputEnabled((prev) => !prev)

  return inputEnabled ? (
    <div>
      <FormGroup style={{ width: '100%', height: '60px' }} label="Nome:" labelInfo="(obrigatório)">
        <Input
          ref={ref as LegacyRef<HTMLInputElement>}
          placeholder="Nome"
          onClick={toggleInputRender}
          fill
          // error={errors?.['name']?.message?.toString() as unknown as boolean}
          // {...register('name')}
        />
        {/* <InputError errorMessage={errors?.['name']?.message?.toString()} /> */}
      </FormGroup>
    </div>
  ) : (
    props.render(() => setInputEnabled((prev) => !prev))
  )
})

DynamicallyEditableInput.displayName = 'DynamicallyEditableInput'
