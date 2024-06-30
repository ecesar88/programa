import { Menu, SystemTime } from '@renderer/components'
import { HOME_CONTAINER_ID } from '@renderer/constants'
import { Outlet } from 'react-router-dom'

export const Home = (): React.ReactNode => {
  return (
    <div className="flex h-[100vh] bg-white overflow-y-hidden">
      <Menu />

      <div id={HOME_CONTAINER_ID} className="w-full p-4">
        <Outlet />
      </div>

      <div className="absolute right-0 mt-3 mr-3">
        <SystemTime />
      </div>
    </div>
  )
}
