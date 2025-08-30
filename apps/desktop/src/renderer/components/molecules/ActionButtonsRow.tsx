import { Button } from '@blueprintjs/core'
import { TbReload } from 'react-icons/tb'

type BottomButtonsRowProps = {
  onNewButtonClick?: () => void
  onRefreshButtonClick?: () => void
  children?: React.ReactNode
}

export const ActionButtonsRow = (props: BottomButtonsRowProps) => {
  return (
    <div className="flex justify-between grow-0 shrink-0 h-[35px] pb-2">
      <div className="flex gap-1">
        <div>
          <Button
            icon={'plus'}
            intent={'success'}
            onClick={() => {
              props.onNewButtonClick?.()
            }}
          >
            Novo
          </Button>
        </div>

        <div>
          <Button
            icon={<TbReload size={20} />}
            intent={'none'}
            onClick={() => {
              props.onRefreshButtonClick?.()
            }}
          >
            Atualizar
          </Button>
        </div>
      </div>

      {props.children}
    </div>
  )
}
