import type { CSSProperties } from 'react'
import { COMPANY } from '../data/company'

// Brand glyphs as inline SVG (lucide no longer ships brand icons). 24×24 viewBox.
const PROFILES = [
  {
    name: 'Facebook',
    href: COMPANY.social.facebook,
    path: 'M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63a20.9 20.9 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.9v2.17H7.92v2.94h2.54V21h3.04z',
  },
  {
    name: 'LinkedIn',
    href: COMPANY.social.linkedin,
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z',
  },
]

/** ClearMed's social profiles as round icon links, for dark (navy) backgrounds. */
export default function SocialLinks({ style }: { style?: CSSProperties }) {
  return (
    <ul className="social-links" style={style}>
      {PROFILES.map(p => (
        <li key={p.name}>
          <a
            href={p.href}
            className="social-link"
            target="_blank"
            rel="noopener"
            aria-label={`ClearMed Imaging on ${p.name}`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
              <path d={p.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
