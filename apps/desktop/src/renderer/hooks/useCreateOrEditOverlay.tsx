import { OverlayMode } from '@renderer/constants/enums'
import { useCallback, useEffect, useState } from 'react'

export const useCreateOrEditOverlay = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false)
  const [overlayMode, setOverlayMode] = useState<OverlayMode | null>(null)

  useEffect(() => {
    if (!isOverlayOpen) setOverlayMode(null)
  }, [isOverlayOpen])

  const openOverlay = useCallback(
    (mode: OverlayMode) => {
      setIsOverlayOpen(true)
      return setOverlayMode(mode)
    },
    [overlayMode]
  )

  const closeOverlay = useCallback(() => {
    setIsOverlayOpen(false)
    setOverlayMode(null)

    return false
  }, [overlayMode])

  return {
    openOverlay,
    closeOverlay,
    isOverlayOpen,
    overlayMode
  }
}
