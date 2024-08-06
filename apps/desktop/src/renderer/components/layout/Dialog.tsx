import { Dialog as BlueprintDialog, DialogBody } from '@blueprintjs/core'
import React from 'react'

type DialogProps = {
  children?: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const Dialog = (props: DialogProps) => {
  return (
    <BlueprintDialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      usePortal={true}
      canEscapeKeyClose={true}
      canOutsideClickClose={false}
      className="w-fit h-fit"
    >
      <DialogBody className="p-0">{props.children}</DialogBody>
    </BlueprintDialog>
  )
}
