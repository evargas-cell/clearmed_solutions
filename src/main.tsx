import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production pages are prerendered at build time (scripts/prerender.mjs), which
// stamps the route it rendered on #root. Hydrate only when that matches the URL
// being viewed: unknown URLs get the homepage HTML via the Netlify catch-all and
// must be client-rendered instead. In dev #root is empty, so this always renders.
const normalize = (p: string) => p.replace(/\/+$/, '') || '/'
const prerendered = container.dataset.prerendered
if (prerendered && normalize(prerendered) === normalize(window.location.pathname)) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
