import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BlogListing from './pages/BlogListing'
import BlogPost from './pages/BlogPost'
import GlowCursor from './components/GlowCursor'
import QuoteModalProvider from './components/QuoteModalProvider'

function App() {
  return (
    <QuoteModalProvider>
      <GlowCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogListing />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </QuoteModalProvider>
  )
}

export default App
