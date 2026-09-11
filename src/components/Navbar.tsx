import { useState, useEffect, useRef, type MouseEvent } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import LogoSVG from './LogoSVG'
import { useQuoteModal } from './quoteModalContext'

// Homepage section anchors, rendered as "/#id" links: a same-page jump on the
// homepage (smoothed by html { scroll-behavior }), a normal link elsewhere, and
// crawlable either way.
const SERVICES = [
  { label: 'Siemens CT Service', href: '/#siemens-ct' },
  { label: 'Siemens MRI Service', href: '/#siemens-mri' },
  { label: 'GE CT Service', href: '/#ge-ct' },
  { label: 'GE MRI Service', href: '/#ge-mri' },
]

const EQUIPMENT = [
  { label: 'CT Scanners', href: '/#equipment' },
  { label: 'MRI Systems', href: '/#equipment' },
]

const MOBILE_ITEMS = [
  { label: 'Home', href: '/' },
  ...SERVICES,
  { label: 'Equipment', href: '/#equipment' },
  { label: 'Our Work', href: '/#gallery' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [equipmentOpen, setEquipmentOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const servicesRef = useRef<HTMLDivElement>(null)
  const equipmentRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const quote = useQuoteModal()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (!isHome) return
      const ordered = ['contact', 'about', 'gallery', 'equipment', 'services']
      let found = ''
      for (const id of ordered) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.55) {
          found = id
          break
        }
      }
      setActiveSection(found)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false)
      if (equipmentRef.current && !equipmentRef.current.contains(e.target as Node)) setEquipmentOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const closeMenus = () => {
    setMobileOpen(false)
    setServicesOpen(false)
    setEquipmentOpen(false)
  }

  // Quote links stay real links to #contact (crawlable, and they still work
  // without JS); the click opens the dialog instead of scrolling.
  const onQuoteClick = (e: MouseEvent) => {
    e.preventDefault()
    closeMenus()
    quote.open()
  }

  // "Home" on the homepage scrolls back to the top instead of reloading.
  const onHomeClick = (e: MouseEvent) => {
    closeMenus()
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const mobileItemStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '0.7rem 0.75rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#012854',
    fontWeight: 600,
    fontFamily: 'Montserrat, sans-serif',
    textDecoration: 'none',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease, color 0.15s ease',
  }
  const mobileHoverIn = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = 'rgba(0,159,193,0.07)'
    e.currentTarget.style.color = '#009fc1'
  }
  const mobileHoverOut = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.color = '#012854'
  }

  return (
    <>
      {/* Global dropdown animation styles */}
      <style>{`
        .nav-dropdown {
          opacity: 0;
          transform: translateY(-6px) scale(0.98);
          pointer-events: none;
          transition: opacity 0.2s cubic-bezier(0.16,1,0.3,1), transform 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-dropdown.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .nav-link {
          position: relative;
          color: #012854;
          font-weight: 600;
          font-family: Montserrat, sans-serif;
          font-size: 0.875rem;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          transition: color 0.2s ease, background-color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0.75rem;
          right: 0.75rem;
          height: 2px;
          background: #009fc1;
          border-radius: 9999px;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover {
          color: #009fc1;
          background-color: rgba(0,159,193,0.05);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }
        .nav-dropdown-item {
          width: 100%;
          text-align: left;
          padding: 0.6rem 1rem;
          font-size: 0.835rem;
          color: #1e293b;
          font-weight: 500;
          font-family: Montserrat, sans-serif;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease, padding-left 0.2s cubic-bezier(0.16,1,0.3,1);
          display: block;
          border-radius: 6px;
          margin: 1px 4px;
          width: calc(100% - 8px);
          text-decoration: none;
        }
        .nav-dropdown-item:hover {
          background-color: rgba(0,159,193,0.07);
          color: #009fc1;
          padding-left: 1.25rem;
        }
      `}</style>

      <nav
        aria-label="Main"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          background: scrolled ? 'rgba(255,255,255,0.92)' : '#ffffff',
          backdropFilter: scrolled ? 'blur(14px) saturate(1.6)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(1.6)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(1,40,84,0.07)'
            : '1px solid rgba(1,40,84,0.05)',
          boxShadow: scrolled
            ? '0 2px 12px rgba(1,40,84,0.07), 0 8px 32px rgba(1,40,84,0.06)'
            : 'none',
          transition:
            'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

            {/* Logo */}
            <Link
              to="/"
              onClick={onHomeClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
              aria-label="ClearMed Imaging Solutions – home"
            >
              <LogoSVG height={52} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center" style={{ gap: '0.15rem' }}>

              <Link to="/" className={`nav-link${isHome && !activeSection ? ' active' : ''}`} onClick={onHomeClick}>
                Home
              </Link>

              {/* Services Dropdown */}
              <div ref={servicesRef} style={{ position: 'relative' }}>
                <button
                  className={`nav-link${activeSection === 'services' ? ' active' : ''}`}
                  onClick={() => { setServicesOpen(!servicesOpen); setEquipmentOpen(false) }}
                  aria-expanded={servicesOpen}
                  aria-controls="nav-services-menu"
                >
                  Services
                  <ChevronDown
                    size={13}
                    style={{
                      transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
                      transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      marginLeft: '1px',
                    }}
                  />
                </button>
                {/* inert while closed: the links stay in the HTML for
                    crawlers but out of the keyboard tab order. */}
                <div
                  id="nav-services-menu"
                  inert={!servicesOpen}
                  className={`nav-dropdown${servicesOpen ? ' open' : ''}`}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0,
                    minWidth: '210px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid rgba(1,40,84,0.08)',
                    padding: '6px 0',
                    zIndex: 50,
                    boxShadow:
                      '0 4px 16px rgba(1,40,84,0.1), 0 16px 40px rgba(1,40,84,0.08)',
                  }}
                >
                  {SERVICES.map(s => (
                    <a key={s.label} href={s.href} className="nav-dropdown-item" onClick={closeMenus}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Equipment Dropdown */}
              <div ref={equipmentRef} style={{ position: 'relative' }}>
                <button
                  className={`nav-link${activeSection === 'equipment' ? ' active' : ''}`}
                  onClick={() => { setEquipmentOpen(!equipmentOpen); setServicesOpen(false) }}
                  aria-expanded={equipmentOpen}
                  aria-controls="nav-equipment-menu"
                >
                  Equipment
                  <ChevronDown
                    size={13}
                    style={{
                      transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
                      transform: equipmentOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      marginLeft: '1px',
                    }}
                  />
                </button>
                <div
                  id="nav-equipment-menu"
                  inert={!equipmentOpen}
                  className={`nav-dropdown${equipmentOpen ? ' open' : ''}`}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0,
                    minWidth: '170px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid rgba(1,40,84,0.08)',
                    padding: '6px 0',
                    zIndex: 50,
                    boxShadow:
                      '0 4px 16px rgba(1,40,84,0.1), 0 16px 40px rgba(1,40,84,0.08)',
                  }}
                >
                  {EQUIPMENT.map(eq => (
                    <a key={eq.label} href={eq.href} className="nav-dropdown-item" onClick={closeMenus}>
                      {eq.label}
                    </a>
                  ))}
                </div>
              </div>

              {[
                { label: 'Our Work', href: '/#gallery', section: 'gallery' },
                { label: 'About', href: '/#about', section: 'about' },
                { label: 'Contact', href: '/#contact', section: 'contact' },
              ].map(({ label, href, section }) => (
                <a
                  key={label}
                  href={href}
                  className={`nav-link${activeSection === section ? ' active' : ''}`}
                  onClick={closeMenus}
                >
                  {label}
                </a>
              ))}

              <Link
                to="/blog"
                className="nav-link"
                onClick={closeMenus}
                style={{ color: location.pathname.startsWith('/blog') ? '#009fc1' : undefined }}
              >
                Blog
              </Link>

              {/* CTA */}
              <a
                href="/#contact"
                onClick={onQuoteClick}
                className="btn-amber"
                style={{ fontSize: '0.8rem', padding: '0.6rem 1.4rem', marginLeft: '0.75rem' }}
              >
                Get Service Quote
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden"
              style={{
                color: '#012854',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '8px',
                transition: 'background-color 0.2s ease',
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="nav-mobile-menu"
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(0,159,193,0.07)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu — inert while collapsed, like the dropdowns */}
        <div
          id="nav-mobile-menu"
          inert={!mobileOpen}
          style={{
            maxHeight: mobileOpen ? '520px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}
          className="lg:hidden"
        >
          <div
            style={{
              borderTop: '1px solid rgba(1,40,84,0.07)',
              padding: '0.75rem 1rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            {MOBILE_ITEMS.map(item =>
              item.href.startsWith('/#') ? (
                <a key={item.label} href={item.href} onClick={closeMenus} style={mobileItemStyle} onMouseEnter={mobileHoverIn} onMouseLeave={mobileHoverOut}>
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={item.href === '/' ? onHomeClick : closeMenus}
                  style={mobileItemStyle}
                  onMouseEnter={mobileHoverIn}
                  onMouseLeave={mobileHoverOut}
                >
                  {item.label}
                </Link>
              ),
            )}
            <a
              href="/#contact"
              onClick={onQuoteClick}
              className="btn-amber"
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              Get Service Quote
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
