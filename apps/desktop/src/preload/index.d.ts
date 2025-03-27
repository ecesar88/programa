import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown

    darkModeAPI: {
      toggleDark: () => Promise<void>
      toggleLight: () => Promise<void>
    }
  }
}
