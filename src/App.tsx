import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import BlogListing from './pages/BlogListing'
import BlogPost from './pages/BlogPost'
import ServicesHub from './pages/ServicesHub'
import ServicePage from './pages/ServicePage'
import GlowCursor from './components/GlowCursor'
import QuoteModalProvider from './components/QuoteModalProvider'

/**
 * The router keeps the current scroll position when the route changes, so
 * going from halfway down the homepage to /blog used to land you halfway down
 * the article list. Start new pages at the top, honouring a #hash when given.
 * The first render is skipped so a reload keeps the browser's own restoration.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <QuoteModalProvider>
      <GlowCursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesHub />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/blog" element={<BlogListing />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </QuoteModalProvider>
  )
}

export default App
