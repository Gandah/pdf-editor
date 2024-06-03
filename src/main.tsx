import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { StatesProvider } from './Context/StateContext.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StatesProvider>
      <App />
    </StatesProvider>
  </React.StrictMode>,
)
