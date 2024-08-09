import { FormGroup } from '@blueprintjs/core'
import { forwardRef, LegacyRef } from 'react'
import { Input } from './Input'

type DynamicallyEditableInputProps = {
  render: React.ReactNode
}

export const DynamicallyEditableInput = forwardRef((props: DynamicallyEditableInputProps, ref) => {
  return (
    <div>
      <FormGroup style={{ width: '100%', height: '60px' }} label="Nome:" labelInfo="(obrigatório)">
        <Input
          ref={ref as LegacyRef<HTMLInputElement>}
          placeholder="Nome"
          fill
          // error={errors?.['name']?.message?.toString() as unknown as boolean}
          // {...register('name')}
        />
        {/* <InputError errorMessage={errors?.['name']?.message?.toString()} /> */}
      </FormGroup>
    </div>
  )
})

DynamicallyEditableInput.displayName = 'DynamicallyEditableInput'
