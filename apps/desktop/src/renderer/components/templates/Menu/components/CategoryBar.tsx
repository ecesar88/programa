import { FaBowlRice } from 'react-icons/fa6'
import { RiDrinks2Fill } from 'react-icons/ri'
import { TbMeat } from 'react-icons/tb'

export const CategoryBar = () => {
  return (
    <div className="flex flex-row flex-grow-0 flex-shrink-0 h-[75px] gap-6 py-2 px-4 bg-lightGray4 rounded-md">
      <div className="flex flex-col items-center gap-2">
        <div>
          <TbMeat size={28} />
        </div>
        <p>Proteína</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <div>
          <FaBowlRice size={28} />
        </div>
        <p>Carboidratos</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <div>
          <RiDrinks2Fill size={28} />
        </div>
        <p>Bebidas</p>
      </div>
    </div>
  )
}
