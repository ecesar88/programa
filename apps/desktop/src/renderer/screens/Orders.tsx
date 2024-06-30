import { DataHeader } from '@renderer/components'
import { ContentScrollContainer } from '@renderer/components/layout'
import { Read } from '@renderer/components/templates/Orders'

export const Orders = () => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <DataHeader title="PEDIDOS" />

      <ContentScrollContainer>
        <Read />
      </ContentScrollContainer>
    </div>
  )
}
