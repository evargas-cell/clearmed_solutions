import { useEffect } from 'react'

const BASE_URL = 'https://clearmedimaging.com'

interface SEOHeadProps {
  title: string
  description: string
  path: string
}

export default function SEOHead({ title, description, path }: SEOHeadProps) {
  useEffect(() => {
    document.title = title

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!el) {
        el = document.createElement('meta')
        el.name = name
        document.head.appendChild(el)
      }
      el.content = content
    }

    const setCanonical = (href: string) => {
      let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!el) {
        el = document.createElement('link')
        el.rel = 'canonical'
        document.head.appendChild(el)
      }
      el.href = href
    }

    setMeta('description', description)
    setCanonical(`${BASE_URL}${path}`)
  }, [title, description, path])

  return null
}
