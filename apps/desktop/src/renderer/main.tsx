import 'jotai-devtools/styles.css'
import 'react-toastify/dist/ReactToastify.css'
// import '../../node_modules/@blueprintjs/core/lib/css/blueprint.css'
import '../../node_modules/@blueprintjs/core/lib/css/blueprint.css'
// import '../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css'
import '../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css'
// import '../../node_modules/nprogress/nprogress.css'
import './assets/base.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
