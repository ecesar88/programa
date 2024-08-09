import { OverlayMode } from '@renderer/constants/enums'
import { selectedRowAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

export const useResetHookForm = <T extends FieldValues>(
  resetFn: ReturnType<typeof useForm<T>>['reset'],
  overlayMode?: OverlayMode | null
) => {
  if (!overlayMode) {
    resetFn()
  }

  const selectedRow = useAtomValue(selectedRowAtom).data

  useEffect(() => {
    if (overlayMode === OverlayMode.EDIT) {
      resetFn(selectedRow as T)
    } else if (overlayMode === OverlayMode.NEW) {
      resetFn()
    }

    return () => {
      resetFn({} as T)
    }
  }, [overlayMode])
}
