import { Button } from '@blueprintjs/core'
import { ScreenMenuProps } from '@renderer/components/molecules'
import { RefetchOptions } from '@tanstack/query-core'
import { FaFilePdf } from 'react-icons/fa'
import { TbReload } from 'react-icons/tb'

type BottomButtonsRowProps = {
  actions: ScreenMenuProps['actions'] & { refetch: (options?: RefetchOptions) => void }
}

export const BottomButtonsRow = (props: BottomButtonsRowProps) => {
  return (
    <div className="flex justify-between flex-grow-0 flex-shrink-0 h-[35px]">
      <div className="flex gap-1">
        <div>
          <Button
            icon={'plus'}
            intent={'success'}
            onClick={() => {
              alert('Exportado')
            }}
          >
            Novo
          </Button>
        </div>

        <div>
          <Button
            icon={<TbReload size={20} />}
            intent={'none'}
            onClick={async () => {
              await props.actions.refetch()
            }}
          >
            Atualizar
          </Button>
        </div>
      </div>

      <div>
        <Button
          icon={<FaFilePdf size={20} className="text-red3" />}
          intent={'none'}
          onClick={() => {
            alert('Exportado')
          }}
        >
          Exportar em PDF
        </Button>
      </div>
    </div>
  )
}
