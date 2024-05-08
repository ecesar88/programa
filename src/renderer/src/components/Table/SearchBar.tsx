import { Colors } from '@blueprintjs/core'
import { FaSearch } from 'react-icons/fa'

export const SearchBar = () => {
  return (
    <div className="flex items-center justify-between rounded mb-3 border border-gray5">
      <div className="w-full px-3 py-1">
        <input className="w-[calc(100%-30px)]" type="text" placeholder="Pesquisar..." />
      </div>

      <div className="bg-cerulean3 px-3 py-1 rounded-r !cursor-pointer">
        <FaSearch size="22px" fill={Colors.WHITE} />
      </div>
    </div>
  )
}
