import { LabelFragmentFragment } from '@renderer/queries/graphql/codegen/graphql'
import { atom } from 'jotai'

export interface LabelPopupContent {
  labelData?: LabelFragmentFragment
  isCreatingLabel: boolean
}

export const labelDataAtom = atom<LabelPopupContent['labelData']>(undefined)
export const isCreatingLabelAtom = atom<LabelPopupContent['isCreatingLabel']>(false)

labelDataAtom.debugLabel = 'labelDataAtom'
isCreatingLabelAtom.debugLabel = 'isCreatingLabel'
