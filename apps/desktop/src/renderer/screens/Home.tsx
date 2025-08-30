// import { Button } from '@blueprintjs/core'
import { SystemMenu, SystemTime } from '@renderer/components'
import { HOME_CONTAINER_ID } from '@renderer/constants'
import { Outlet } from 'react-router'

export const Home = (): React.ReactNode => {
  // const toggleDarkMode = () => {
  //   window.darkModeAPI.toggleDark()
  // }

  // const toggleLightMode = () => {
  //   window.darkModeAPI.toggleLight()
  // }

  // const osNotify = () => {
  //   window.notificationAPI.sendNotification()
  // }

  return (
    <div className="flex h-screen bg-white overflow-y-hidden">
      <SystemMenu />

      <div id={HOME_CONTAINER_ID} className="w-full py-4 pl-0 pr-2">
        {/* <div className="flex flex-col gap-2 pt-12">
          <Button onClick={toggleDarkMode}>Enable Dark Mode 🌙</Button>

          <Button onClick={toggleLightMode}>Enable Light Mode ☀️</Button>

          <Button onClick={osNotify}>Notify!</Button>
        </div> */}

        <Outlet />
      </div>

      <div className="absolute right-0 mt-4 mr-3">
        <SystemTime />
      </div>
    </div>
  )
}
