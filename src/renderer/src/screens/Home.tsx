import Menu from '@renderer/components/Menu'
import SystemTime from '@renderer/components/SystemTime'
import { Outlet } from 'react-router-dom'

export const Home = (): React.ReactNode => {
  return (
    <div className="flex h-[100vh] bg-white">
      <Menu />

      <div className="w-full p-2">
        <Outlet />
      </div>

      <div className="absolute right-0 mt-3 mr-3">
        <SystemTime />
      </div>
    </div>
  )
}
