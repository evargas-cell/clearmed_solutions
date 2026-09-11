/* eslint-disable react-refresh/only-export-components -- build-time server entry, never hot-reloaded */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.tsx'

export { ALL_PAGES, SITE_URL } from './seo/pages'
export { jsonLdFor } from './seo/schema'
export { COMPANY } from './data/company'

/** Renders one route to static HTML. Used only by scripts/prerender.mjs at build time. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
