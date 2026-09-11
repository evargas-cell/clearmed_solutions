import { Mail, MapPin, Phone } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { COMPANY } from '../data/company'
import SocialLinks from './SocialLinks'

// Homepage section anchors, rendered as "/#id" links so they work — and are
// crawlable — from every page, not just the homepage.
const SERVICE_LINKS = [
  { label: 'Siemens CT Service', href: '/#siemens-ct' },
  { label: 'Siemens MRI Service', href: '/#siemens-mri' },
  { label: 'GE CT Service', href: '/#ge-ct' },
  { label: 'GE MRI Service', href: '/#ge-mri' },
  { label: 'System Installation', href: '/#installation' },
  { label: 'Preventive Maintenance', href: '/#preventive-maintenance' },
  { label: 'Equipment Sales', href: '/#equipment' },
]

const EQUIPMENT_LINKS = [
  { label: 'CT Scanners', href: '/#equipment' },
  { label: 'MRI Systems', href: '/#equipment' },
]

const BLOG_LINKS = [
  { label: 'Cost of Deferred Maintenance', slug: 'cost-of-deferred-maintenance' },
  { label: 'OEM vs. ISO Service', slug: 'oem-vs-iso-service' },
  { label: 'Installation Planning Guide', slug: 'ct-mri-installation-guide' },
  { label: 'OEM vs. Aftermarket Parts', slug: 'oem-vs-aftermarket-parts' },
  { label: 'Service Contract Pricing', slug: 'service-contract-pricing' },
]

export default function Footer() {
  const isHome = useLocation().pathname === '/'

  const linkStyle: React.CSSProperties = {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.6)',
    padding: '0.25rem 0',
    textAlign: 'left',
    display: 'block',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  }

  const contactLinkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.6rem',
    marginBottom: '0.85rem',
    textDecoration: 'none',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.875rem',
    fontFamily: 'Open Sans, sans-serif',
    transition: 'color 0.2s ease',
  }

  const headingStyle: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: '0.75rem',
    color: '#fff',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '1.1rem',
  }

  const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = '#fff')
  const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')

  return (
    <footer style={{ background: '#012854' }}>
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: '3.5rem 1.5rem 2.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Column 1: Logo + desc */}
          <div>
            {/* Home link; on the homepage it scrolls back to the top instead. */}
            <Link
              to="/"
              onClick={e => {
                if (isHome) {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              style={{ display: 'block', width: 'fit-content', marginBottom: '1rem' }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#ffffff',
                  borderRadius: '10px',
                  padding: '6px 14px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                }}
              >
                <img
                  src="/images/logo.svg"
                  alt="ClearMed Imaging Solutions"
                  style={{
                    height: '36px',
                    width: 'auto',
                    display: 'block',
                  }}
                  draggable={false}
                />
              </div>
            </Link>
            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: '1.7',
                maxWidth: '220px',
              }}
            >
              OEM-certified service and installation for Siemens and GE CT and MRI imaging systems.
            </p>
            <SocialLinks style={{ marginTop: '1.25rem' }} />
          </div>

          {/* Column 2: Services */}
          <div>
            <h2 style={headingStyle}>Services</h2>
            {SERVICE_LINKS.map(link => (
              <a key={link.label} href={link.href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 3: Resources */}
          <div>
            <h2 style={headingStyle}>Resources</h2>
            {BLOG_LINKS.map(link => (
              <Link key={link.slug} to={`/blog/${link.slug}`} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 4: Equipment */}
          <div>
            <h2 style={headingStyle}>Equipment</h2>
            {EQUIPMENT_LINKS.map(link => (
              <a key={link.label} href={link.href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 5: Contact */}
          <div>
            <h2 style={headingStyle}>Contact</h2>
            <a href={`tel:${COMPANY.phoneIntl}`} style={contactLinkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              <Phone size={15} style={{ color: '#009fc1', marginTop: '2px', flexShrink: 0 }} />
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} style={contactLinkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              <Mail size={15} style={{ color: '#009fc1', marginTop: '2px', flexShrink: 0 }} />
              {COMPANY.email}
            </a>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.875rem',
                fontFamily: 'Open Sans, sans-serif',
              }}
            >
              <MapPin size={15} style={{ color: '#009fc1', marginTop: '2px', flexShrink: 0 }} />
              <span style={{ lineHeight: '1.55' }}>
                {COMPANY.address.street}<br />
                {COMPANY.address.city}, {COMPANY.address.region} {COMPANY.address.postalCode}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '1.5rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            &copy; 2026 ClearMed Imaging Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
