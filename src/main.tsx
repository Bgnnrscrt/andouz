import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Site style «Старые деньги» (index.html sets <html data-style="old-money">): after index.css
// and with a higher specificity than component CSS, so lazily loaded chunks can't override it.
import './theme/bridge.css'
import './theme/old-money.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
