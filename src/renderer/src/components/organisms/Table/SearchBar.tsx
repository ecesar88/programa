import { Button } from '@blueprintjs/core'
import { FaSearch } from 'react-icons/fa'

export const SearchBar = () => {
  return (
    <div className="flex items-center justify-between rounded border border-gray5">
      <div className="w-full px-3 py-1">
        <input className="w-[calc(100%-30px)]" type="text" placeholder="Pesquisar..." />
      </div>

      <Button icon={<FaSearch size="22px" />} fill intent="primary" className="max-w-[60px]" />
    </div>
  )
}
