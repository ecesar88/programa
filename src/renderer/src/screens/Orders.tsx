import DataHeader from '@renderer/components/DataHeader'
import { Read } from '@renderer/components/Orders/Read'

export const Orders = () => {
  return (
    <div className="flex flex-col gap-2">
      <DataHeader title="PEDIDOS" menuProps={{ actions: {} }} />

      <Read />
    </div>
  )
}
