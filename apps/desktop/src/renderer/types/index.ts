import { OverlayMode } from '@renderer/constants/enums'

export type OverlayData = {
  isOpen: boolean
  mode: OverlayMode | null
}

export interface Response<T> {
  data: T
}
