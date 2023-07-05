import { RedwoodProvider } from '@redwoodjs/web'
import { FC, StrictMode } from 'react'

import Routes from './Routes'
import './css/base.css'
import './css/index.css'

const App = () => {
  return (
    <StrictMode>
      <RedwoodProvider titleTemplate={`%PageTitle`}>
        <Routes />
      </RedwoodProvider>
    </StrictMode>
  )
}

export default App
