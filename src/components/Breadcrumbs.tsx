import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export interface Crumb {
  label: string
  /** Omitted on the current page, which is rendered as plain text. */
  to?: string
}

/**
 * Breadcrumb trail for the navy page heros. The matching BreadcrumbList
 * structured data is emitted in src/seo/schema.ts — keep the two in step.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '1.75rem' }}>
      <ol
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.25rem',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 600,
          fontSize: '0.8rem',
        }}
      >
        {items.map((item, i) => (
          <li key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {i > 0 && (
              <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.35)' }} aria-hidden="true" />
            )}
            {item.to ? (
              <Link
                to={item.to}
                style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
