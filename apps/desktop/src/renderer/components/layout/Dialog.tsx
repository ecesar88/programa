import { Dialog as BlueprintDialog, DialogBody } from '@blueprintjs/core'
import { cn } from '@renderer/utils'
import React from 'react'

type DialogProps = {
  children?: React.ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}

export const Dialog = (props: DialogProps) => {
  return (
    <BlueprintDialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      usePortal={true}
      canEscapeKeyClose={true}
      canOutsideClickClose={false}
      className={cn('w-fit! h-fit!', props.className)}
    >
      <DialogBody className="p-0!">{props.children}</DialogBody>
    </BlueprintDialog>
  )
}
