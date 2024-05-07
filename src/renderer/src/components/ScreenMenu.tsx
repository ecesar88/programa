import { Button } from '@blueprintjs/core'
import { FORM_ID } from '@renderer/constants'
import { rowDataFocusedAtom, selectedRowAtom } from '@renderer/store/clientStore'
import { useAtomValue, useSetAtom } from 'jotai'

export interface ScreenMenuProps {
  actions?: {
    onNewClick?: () => void
    onEditClick?: () => void
    onSaveClick?: () => void
    onDeleteClick?: () => void
    onCancelClick?: () => void
  }
}

export const ScreenMenu = (props: ScreenMenuProps): React.ReactNode => {
  const selectedRow = useAtomValue(rowDataFocusedAtom)
  const setSelectedRow = useSetAtom(selectedRowAtom)

  const clearSelectedRow = () => setSelectedRow({ data: {}, meta: { index: null } })

  const selectedItem = selectedRow !== undefined && Object.values(selectedRow)?.length > 0

  return (
    <div className="bg-white p-1 flex justify-start gap-2 border border-lightgray border-solid rounded">
      <Button
        icon="plus"
        fill
        intent="success"
        className="max-w-[150px]"
        onClick={() => {
          props?.actions?.onNewClick?.()
        }}
      >
        Novo
      </Button>

      <Button
        icon="edit"
        fill
        intent="primary"
        form={FORM_ID}
        type="submit"
        disabled={!selectedItem}
        className="max-w-[150px]"
        onClick={(e: { preventDefault: () => void }) => {
          e.preventDefault()

          props?.actions?.onEditClick?.()
        }}
      >
        Editar
      </Button>

      <Button
        fill
        icon="trash"
        intent="danger"
        disabled={!selectedItem}
        className="max-w-[150px]"
        onClick={() => {
          clearSelectedRow()
          props?.actions?.onDeleteClick?.()
        }}
      >
        Excluir
      </Button>
    </div>
  )
}
