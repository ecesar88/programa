import { ContentScrollContainer, DataHeader } from '@renderer/components'
import { Read } from '@renderer/components/templates/Menu'

export const Menu = () => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <DataHeader title="CARDÁPIO" />

      <ContentScrollContainer>
        <Read />
      </ContentScrollContainer>
    </div>
  )
}
