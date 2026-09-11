// Build-time prerendering. Runs after `vite build` (see package.json) and
// renders every route in src/seo/pages.ts to static HTML, so crawlers get the
// full page content in the initial response. The browser then hydrates it.
//
// Output layout mirrors the SG Capital site: one .html file per route plus an
// explicit clean-URL rewrite in _redirects, so each page's canonical URL is
// guaranteed to be the URL that resolves (no trailing-slash redirects).
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'
import { buildLlmsTxt, buildSitemap } from './site-files.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrOut = path.join(root, 'node_modules', '.cache', 'prerender')

// Server bundle of the app — same Vite config as the client build, so env
// vars and transforms match and the markup hydrates cleanly.
await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: ssrOut, emptyOutDir: true, copyPublicDir: false },
})
const entryFile = (await fs.readdir(ssrOut)).find(f => /^entry-server\.m?js$/.test(f))
if (!entryFile) throw new Error(`prerender: no entry-server bundle in ${ssrOut}`)
const { render, ALL_PAGES, SITE_URL, jsonLdFor, COMPANY } = await import(pathToFileURL(path.join(ssrOut, entryFile)).href)

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

const escapeAttr = s =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// All replacements use callbacks: page content contains "$" (e.g. "$1,000"),
// which a string replacement would misread as a regex backreference.
function replaceOnce(html, re, replacer, what) {
  if (!re.test(html)) throw new Error(`prerender: index.html is missing ${what}`)
  return html.replace(re, replacer)
}
const setValue = (html, re, value, what) =>
  replaceOnce(html, re, (_, open, close) => open + escapeAttr(value) + close, what)
const metaName = name => new RegExp(`(<meta name="${name}" content=")[^"]*(")`)
const metaProp = prop => new RegExp(`(<meta property="${prop}" content=")[^"]*(")`)

const outFile = route => (route === '/' ? 'index.html' : `${route.slice(1)}.html`)

function renderPage(page, siteUrl) {
  const url = `${siteUrl}${page.path}`
  let html = template
  html = setValue(html, /(<title>)[^<]*(<\/title>)/, page.title, '<title>')
  html = setValue(html, metaName('description'), page.description, 'meta description')
  html = setValue(html, /(<link rel="canonical" href=")[^"]*(")/, url, 'canonical link')
  html = setValue(html, metaProp('og:title'), page.title, 'og:title')
  html = setValue(html, metaProp('og:description'), page.description, 'og:description')
  html = setValue(html, metaProp('og:url'), url, 'og:url')
  html = setValue(html, metaName('twitter:title'), page.title, 'twitter:title')
  html = setValue(html, metaName('twitter:description'), page.description, 'twitter:description')

  // JSON-LD structured data. "<" is escaped so content can never close the
  // <script> element early.
  const jsonLd = jsonLdFor(page.path)
  if (jsonLd.length) {
    const tags = jsonLd
      .map(doc => `<script type="application/ld+json">${JSON.stringify(doc).replace(/</g, '\\u003c')}</script>`)
      .join('\n    ')
    html = replaceOnce(html, /<\/head>/, () => `  ${tags}\n  </head>`, '</head>')
  }

  const appHtml = render(page.path)
  // Every page must have exactly one <h1> (SEO audit requirement).
  const h1Count = (appHtml.match(/<h1[\s>]/g) || []).length
  if (h1Count !== 1) throw new Error(`prerender: ${page.path} has ${h1Count} <h1> elements; expected exactly 1`)
  // data-prerendered tells main.tsx which route this markup belongs to, so it
  // only hydrates when the URL matches (the catch-all serves index.html for
  // unknown URLs, which must be client-rendered instead).
  html = replaceOnce(
    html,
    /<div id="root"><\/div>/,
    () => `<div id="root" data-prerendered="${escapeAttr(page.path)}">${appHtml}</div>`,
    '<div id="root"></div>',
  )
  return html
}

for (const page of ALL_PAGES) {
  // Search results truncate titles past ~60 characters. The homepage title is
  // intentionally longer (it matches og:title), so only flag other pages.
  if (page.path !== '/' && page.title.length > 60) {
    console.warn(`warning: title for ${page.path} is ${page.title.length} chars (>60): "${page.title}"`)
  }
  const file = path.join(dist, outFile(page.path))
  await fs.mkdir(path.dirname(file), { recursive: true })
  const html = renderPage(page, SITE_URL)
  await fs.writeFile(file, html)
  console.log(`prerendered ${page.path.padEnd(42)} -> dist/${outFile(page.path)} (${(html.length / 1024).toFixed(1)} KB)`)
}

// Clean-URL rewrites go ahead of the SPA catch-all copied from public/_redirects.
const rewrites = ALL_PAGES.filter(p => p.path !== '/')
  .map(p => `${p.path}    /${outFile(p.path)}    200`)
  .join('\n')
const redirectsFile = path.join(dist, '_redirects')
const existing = await fs.readFile(redirectsFile, 'utf8')
await fs.writeFile(redirectsFile, `# Prerendered routes (generated by scripts/prerender.mjs)\n${rewrites}\n\n${existing}`)
console.log(`wrote ${ALL_PAGES.length - 1} clean-URL rewrites to dist/_redirects`)

// Real files, so Netlify serves them ahead of the SPA catch-all (which used to
// answer /sitemap.xml with the homepage HTML).
await fs.writeFile(path.join(dist, 'sitemap.xml'), buildSitemap(ALL_PAGES, SITE_URL))
await fs.writeFile(path.join(dist, 'llms.txt'), buildLlmsTxt(ALL_PAGES, SITE_URL, COMPANY))
console.log(`wrote dist/sitemap.xml (${ALL_PAGES.length} URLs) and dist/llms.txt`)
