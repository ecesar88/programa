import { SystemMenu, SystemTime } from '@renderer/components'
import { HOME_CONTAINER_ID } from '@renderer/constants'
import { Outlet } from 'react-router-dom'

export const Home = (): React.ReactNode => {
  return (
    <div className="flex h-[100vh] bg-white overflow-y-hidden">
      <SystemMenu />

      <div id={HOME_CONTAINER_ID} className="w-full py-4 pl-0 pr-2">
        <Outlet />
      </div>

      <div className="absolute right-0 mt-4 mr-3">
        <SystemTime />
      </div>
    </div>
  )
}
