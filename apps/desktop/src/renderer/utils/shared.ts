import { Id, toast } from 'react-toastify'

export const defaultToast = (message: string): Id => toast(message, { type: 'default' })
export const successToast = (message: string): Id => toast(message, { type: 'success' })
export const errorToast = (message: string): Id => toast(message, { type: 'error' })
export const infoToast = (message: string): Id => toast(message, { type: 'info' })
export const warningToast = (message: string): Id => toast(message, { type: 'warning' })
