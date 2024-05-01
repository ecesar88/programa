import { Button } from '@blueprintjs/core'

export interface ScreenMenuProps {
  // screenMode: {
  //   screenMode: SCREEN_MODE
  //   setScreenMode: React.Dispatch<React.SetStateAction<SCREEN_MODE>>
  // }

  actions?: {
    onNewClick?: () => void
    onEditClick?: () => void
    onSaveClick?: () => void
    onDeleteClick?: () => void
    onCancelClick?: () => void
  }
  // actions?: {
  //   onNewClick?: (changeScreen: () => void) => void
  //   onEditClick?: (changeScreen: () => void) => void
  //   onSaveClick?: (changeScreen: () => void) => void
  //   onDeleteClick?: () => void
  //   onCancelClick?: (changeScreen: () => void) => void
  // }
}

export const ScreenMenu = (props: ScreenMenuProps): React.ReactNode => {
  // const {
  //   screenMode: { screenMode, setScreenMode }
  // } = props

  // const {
  //   selectedRow: { selectedRow }
  // } = useContext(ScreenLocalContext)

  // const selectedItem = selectedRow !== undefined && Object.values(selectedRow)?.length

  // Reset selected row item when changing screen
  // useEffect(() => {
  //   if (screenMode === SCREEN_MODE.EDIT) {
  //     return
  //   }

  //   setSelectedRow({})
  // }, [screenMode])

  return (
    <div className="bg-white p-1 flex justify-start gap-2 border border-lightgray border-solid rounded">
      <Button
        icon="plus"
        fill
        intent="success"
        // disabled={screenMode === SCREEN_MODE.EDIT || screenMode === SCREEN_MODE.NEW}
        className="max-w-[150px]"
        onClick={() => {
          // const changeScreen = (): void => {
          //   setScreenMode(SCREEN_MODE.NEW)
          // }

          // props?.actions?.onNewClick?.(changeScreen)
          props?.actions?.onNewClick?.()
        }}
      >
        Novo
      </Button>

      <Button
        icon="edit"
        fill
        intent="primary"
        form="edit-form"
        type="submit"
        // disabled={
        //   screenMode === SCREEN_MODE.EDIT || screenMode === SCREEN_MODE.NEW || !selectedItem
        // }
        className="max-w-[150px]"
        onClick={(e) => {
          e.preventDefault()

          // const changeScreen = (): void => {
          //   setScreenMode(SCREEN_MODE.EDIT)
          // }

          // props?.actions?.onEditClick?.(changeScreen)
          props?.actions?.onEditClick?.()
        }}
      >
        Editar
      </Button>

      <Button
        fill
        icon="trash"
        intent="danger"
        // disabled={screenMode !== SCREEN_MODE.VIEW || !selectedItem}
        className="max-w-[150px]"
        onClick={() => {
          props?.actions?.onDeleteClick?.()
        }}
      >
        Excluir
      </Button>
    </div>
  )
}
