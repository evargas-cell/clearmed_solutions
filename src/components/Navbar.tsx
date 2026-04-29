import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const SERVICES = [
  { label: 'Siemens CT Service', href: '#siemens-ct' },
  { label: 'Siemens MRI Service', href: '#siemens-mri' },
  { label: 'GE CT Service', href: '#ge-ct' },
  { label: 'GE MRI Service', href: '#ge-mri' },
]

const EQUIPMENT = [
  { label: 'CT Scanners', href: '#equipment' },
  { label: 'MRI Systems', href: '#equipment' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [equipmentOpen, setEquipmentOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const servicesRef = useRef<HTMLDivElement>(null)
  const equipmentRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

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
    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false)
      if (equipmentRef.current && !equipmentRef.current.contains(e.target as Node)) setEquipmentOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    setServicesOpen(false)
    setEquipmentOpen(false)
    if (!isHome) {
      if (href === '#') { navigate('/'); return }
      window.location.href = '/' + href
      return
    }
    if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
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
        }
        .nav-dropdown-item:hover {
          background-color: rgba(0,159,193,0.07);
          color: #009fc1;
          padding-left: 1.25rem;
        }
      `}</style>

      <nav
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
            <button
              onClick={() => scrollTo('#')}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
              aria-label="ClearMed Imaging Solutions – go to top"
            >
              <img
                src="/images/logo.svg"
                alt="ClearMed Imaging Solutions"
                style={{
                  height: '52px',
                  width: 'auto',
                  display: 'block',
                }}
                draggable={false}
              />
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center" style={{ gap: '0.15rem' }}>

              <button className={`nav-link${isHome && !activeSection ? ' active' : ''}`} onClick={() => scrollTo('#')}>
                Home
              </button>

              {/* Services Dropdown */}
              <div ref={servicesRef} style={{ position: 'relative' }}>
                <button
                  className={`nav-link${activeSection === 'services' ? ' active' : ''}`}
                  onClick={() => { setServicesOpen(!servicesOpen); setEquipmentOpen(false) }}
                  aria-expanded={servicesOpen}
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
                <div
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
                    <button
                      key={s.label}
                      className="nav-dropdown-item"
                      onClick={() => scrollTo(s.href)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Equipment Dropdown */}
              <div ref={equipmentRef} style={{ position: 'relative' }}>
                <button
                  className={`nav-link${activeSection === 'equipment' ? ' active' : ''}`}
                  onClick={() => { setEquipmentOpen(!equipmentOpen); setServicesOpen(false) }}
                  aria-expanded={equipmentOpen}
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
                    <button
                      key={eq.label}
                      className="nav-dropdown-item"
                      onClick={() => scrollTo(eq.href)}
                    >
                      {eq.label}
                    </button>
                  ))}
                </div>
              </div>

              {[
                { label: 'Our Work', href: '#gallery', section: 'gallery' },
                { label: 'About', href: '#about', section: 'about' },
                { label: 'Contact', href: '#contact', section: 'contact' },
              ].map(({ label, href, section }) => (
                <button
                  key={label}
                  className={`nav-link${activeSection === section ? ' active' : ''}`}
                  onClick={() => scrollTo(href)}
                >
                  {label}
                </button>
              ))}

              <button
                className="nav-link"
                onClick={() => navigate('/blog')}
                style={{ color: location.pathname.startsWith('/blog') ? '#009fc1' : undefined }}
              >
                Blog
              </button>

              {/* CTA */}
              <button
                onClick={() => scrollTo('#contact')}
                className="btn-amber"
                style={{ fontSize: '0.8rem', padding: '0.6rem 1.4rem', marginLeft: '0.75rem' }}
              >
                Get Service Quote
              </button>
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
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(0,159,193,0.07)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
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
            {[
              { label: 'Home', href: '#' },
              { label: 'Siemens CT Service', href: '#siemens-ct' },
              { label: 'Siemens MRI Service', href: '#siemens-mri' },
              { label: 'GE CT Service', href: '#ge-ct' },
              { label: 'GE MRI Service', href: '#ge-mri' },
              { label: 'Equipment', href: '#equipment' },
              { label: 'Our Work', href: '#gallery' },
              { label: 'About', href: '#about' },
              { label: 'Contact', href: '#contact' },
              { label: 'Blog', href: '/blog' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => item.href.startsWith('/') ? (setMobileOpen(false), navigate(item.href)) : scrollTo(item.href)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.7rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: '#012854',
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,159,193,0.07)'
                  e.currentTarget.style.color = '#009fc1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#012854'
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-amber"
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              Get Service Quote
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
