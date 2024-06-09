import { useEffect } from 'react'

export const useOnKeyDown = (key: string, handler: () => void): void => {
  useEffect(() => {
    const onEscClearSelectedRow = (evt: KeyboardEvent): void => {
      if (evt.key !== key) {
        return
      }

      handler()
    }

    window.addEventListener('keydown', onEscClearSelectedRow)

    return () => {
      window.removeEventListener('keydown', onEscClearSelectedRow)
    }
  }, [])
}
