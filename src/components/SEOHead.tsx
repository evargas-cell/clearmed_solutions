import { useEffect } from 'react'
import { OG_IMAGE, SITE_URL, type PageMeta } from '../seo/pages'

/**
 * Keeps <head> in sync during client-side navigation. The initial HTML for
 * each route already carries the same tags (scripts/prerender.mjs).
 */
export default function SEOHead({ title, description, path }: PageMeta) {
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

    const setOgMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
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

    const url = `${SITE_URL}${path}`

    setMeta('description', description)
    setCanonical(url)

    setOgMeta('og:title', title)
    setOgMeta('og:description', description)
    setOgMeta('og:url', url)
    setOgMeta('og:image', OG_IMAGE)
    setOgMeta('og:type', 'website')

    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', OG_IMAGE)
    setMeta('twitter:card', 'summary_large_image')
  }, [title, description, path])

  return null
}
