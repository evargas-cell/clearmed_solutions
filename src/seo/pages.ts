import { BLOG_POSTS, type BlogPost } from '../data/blogPosts'

export const SITE_URL = 'https://clearmedimaging.com'
export const OG_IMAGE = `${SITE_URL}/images/mri-aera-installed.jpg`

/**
 * Head metadata for one route. Shared by <SEOHead> (client-side navigation)
 * and scripts/prerender.mjs (static HTML), so the two can never drift apart.
 */
export interface PageMeta {
  path: string
  title: string
  description: string
  /** YYYY-MM-DD of the last real content change, for sitemap.xml. Omitted when unknown. */
  lastmod?: string
}

/** "April 14, 2026" → "2026-04-14"; undefined if the date can't be parsed. */
function isoDate(human: string): string | undefined {
  const d = new Date(human)
  if (Number.isNaN(d.getTime())) return undefined
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Search results show roughly the first 60 characters of a title. The homepage
// title is longer by request (it matches og:title); every other page stays under.
export const HOME_PAGE: PageMeta = {
  path: '/',
  title: 'ClearMed Imaging Solutions | CT & MRI Service, Installation & Maintenance',
  description: 'OEM-certified service, installation, and preventive maintenance for Siemens and GE CT and MRI imaging systems nationwide, with a focus on the Southeast.',
}

export const BLOG_PAGE: PageMeta = {
  path: '/blog',
  title: 'CT & MRI Service & Maintenance Guides | ClearMed Imaging',
  description: 'In-depth guides on CT and MRI service, maintenance, installation, parts, and contract pricing — written for imaging directors and hospital administrators.',
  // The listing changes whenever a post is published.
  lastmod: BLOG_POSTS.map(p => isoDate(p.date)).filter(Boolean).sort().pop(),
}

/** Shortens to at most `max` characters on a word boundary, for meta descriptions. */
function clip(text: string, max = 155): string {
  if (text.length <= max) return text
  return text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[\s,;:—–-]+$/, '') + '…'
}

export function blogPostPage(post: BlogPost): PageMeta {
  return {
    path: `/blog/${post.slug}`,
    title: `${post.seoTitle} | ClearMed Imaging`,
    description: clip(post.excerpt),
    lastmod: isoDate(post.date),
  }
}

/** Every indexable route — drives prerendering and the sitemap. */
export const ALL_PAGES: PageMeta[] = [HOME_PAGE, BLOG_PAGE, ...BLOG_POSTS.map(blogPostPage)]
