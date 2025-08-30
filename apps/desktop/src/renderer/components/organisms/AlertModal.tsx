import { Alert, AlertProps } from '@blueprintjs/core'
import React from 'react'

interface AlertModalProps {
  isOpen?: boolean
  isLoading?: boolean
  icon?: AlertProps['icon']
  intent?: AlertProps['intent']
  confirmButtonText?: string
  cancelButtonText?: string
  children?: React.ReactNode
  actions?: {
    onCancel?: AlertProps['onCancel']
    onConfirm?: AlertProps['onConfirm']
  }
}

export const AlertModal = (props: AlertModalProps): React.ReactNode => {
  return (
    <Alert
      cancelButtonText={props.cancelButtonText}
      confirmButtonText={props.confirmButtonText}
      icon={props.icon}
      intent={props.intent}
      isOpen={props.isOpen ?? false}
      loading={props.isLoading}
      onCancel={props.actions?.onCancel}
      onConfirm={props.actions?.onConfirm}
    >
      {props.children}
    </Alert>
  )
}
