import { DATA_HEADER_ID } from '@renderer/constants'
import { Header } from './Header'
import { ScreenMenu, ScreenMenuProps } from './ScreenMenu'

interface DataHeaderProps {
  title: string
  menuProps?: {
    actions: ScreenMenuProps['actions']
  }
}

export const DataHeader = (props: DataHeaderProps): React.ReactNode => {
  return (
    <div id={DATA_HEADER_ID} className="flex flex-col w-full gap-2 pb-4 relative">
      <Header title={props.title} />

      {props.menuProps !== undefined ? <ScreenMenu actions={props.menuProps.actions} /> : null}
    </div>
  )
}
