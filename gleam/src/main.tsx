import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { SWRConfig } from 'swr'

const SWROptions = {
  revalidateOnFocus: false,
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig value={SWROptions}>
    <App />
    </SWRConfig>
  </React.StrictMode>,
)
