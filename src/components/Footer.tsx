import { Mail, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SERVICE_LINKS = [
  { label: 'Siemens CT Service', href: '#siemens-ct' },
  { label: 'Siemens MRI Service', href: '#siemens-mri' },
  { label: 'GE CT Service', href: '#ge-ct' },
  { label: 'GE MRI Service', href: '#ge-mri' },
  { label: 'System Installation', href: '#about' },
  { label: 'Preventive Maintenance', href: '#about' },
  { label: 'Equipment Sales', href: '#equipment' },
]

const EQUIPMENT_LINKS = [
  { label: 'CT Scanners', href: '#equipment' },
  { label: 'MRI Systems', href: '#equipment' },
]

const BLOG_LINKS = [
  { label: 'Cost of Deferred Maintenance', slug: 'cost-of-deferred-maintenance' },
  { label: 'OEM vs. ISO Service', slug: 'oem-vs-iso-service' },
  { label: 'Installation Planning Guide', slug: 'ct-mri-installation-guide' },
  { label: 'OEM vs. Aftermarket Parts', slug: 'oem-vs-aftermarket-parts' },
  { label: 'Service Contract Pricing', slug: 'service-contract-pricing' },
]

export default function Footer() {
  const navigate = useNavigate()
  const scrollTo = (href: string) => {
    if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const linkStyle: React.CSSProperties = {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.6)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.25rem 0',
    textAlign: 'left',
    display: 'block',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  }

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
            <button
              onClick={() => scrollTo('#')}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '1rem', display: 'block' }}
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
            </button>
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
          </div>

          {/* Column 2: Services */}
          <div>
            <h5
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.75rem',
                color: '#fff',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.1rem',
              }}
            >
              Services
            </h5>
            {SERVICE_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Column 3: Resources */}
          <div>
            <h5
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.75rem',
                color: '#fff',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.1rem',
              }}
            >
              Resources
            </h5>
            {BLOG_LINKS.map(link => (
              <button
                key={link.slug}
                onClick={() => navigate(`/blog/${link.slug}`)}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Column 4: Equipment */}
          <div>
            <h5
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.75rem',
                color: '#fff',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.1rem',
              }}
            >
              Equipment
            </h5>
            {EQUIPMENT_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Column 4: Contact */}
          <div>
            <h5
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.75rem',
                color: '#fff',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.1rem',
              }}
            >
              Contact
            </h5>
            <a
              href="mailto:support@clearmedimaging.com"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                marginBottom: '0.85rem',
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.875rem',
                fontFamily: 'Open Sans, sans-serif',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              <Mail size={15} style={{ color: '#009fc1', marginTop: '2px', flexShrink: 0 }} />
              support@clearmedimaging.com
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
                1005 Evenflow Dr.<br />
                Ball Ground, GA 30107
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
