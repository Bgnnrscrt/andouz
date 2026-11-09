import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const render = () =>
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )

// Style previews: /style/1 … /style/6 show the same site in another look (src/variants/).
// Only these addresses load that code; every other address renders exactly as before.
const styleVariant = /^\/style\/([1-6])\/?$/.exec(window.location.pathname)?.[1]
if (styleVariant) {
  import('./variants/boot.ts')
    .then((m) => m.boot(Number(styleVariant)))
    .catch(() => undefined)
    .finally(render)
} else {
  render()
}
