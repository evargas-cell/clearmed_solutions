import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SERVICES, SERVICES_HUB, servicePath, textOnLight } from '../data/services'
import SEOHead from '../components/SEOHead'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import { SERVICES_PAGE } from '../seo/pages'
import { COMPANY } from '../data/company'
import { useQuoteModal } from '../components/quoteModalContext'

/** /services — the hub that links to every service detail page. */
export default function ServicesHub() {
  const quote = useQuoteModal()

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#f8fafc' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        <Navbar />
      </header>

      <SEOHead {...SERVICES_PAGE} />
      <main style={{ paddingTop: '72px' }}>
        {/* Hero */}
        <div style={{ background: '#012854', padding: '3.5rem 1.5rem 4rem' }}>
          <div className="max-w-3xl mx-auto">
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
            <h1
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: '1rem',
              }}
            >
              {SERVICES_HUB.h1}
            </h1>
            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: '1.6',
              }}
            >
              {SERVICES_HUB.summary}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <a href="/#contact" className="btn-amber" onClick={e => { e.preventDefault(); quote.open() }}>
                Request a Quote
              </a>
              <a href={`tel:${COMPANY.phoneIntl}`} className="btn-outline-white">
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Service cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: '3.5rem 1.5rem' }}>
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              fontSize: '1.35rem',
              color: '#012854',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            What We Do
          </h2>
          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '0.95rem',
              color: '#64748b',
              lineHeight: '1.75',
              maxWidth: '640px',
              marginBottom: '2.25rem',
            }}
          >
            ClearMed is an independent service organization with OEM-certified engineers for Siemens
            and GE CT and MRI systems. That means factory-standard service without being tied to a
            single manufacturer&apos;s contract, pricing, or parts catalog.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {SERVICES.map(service => (
              <Link key={service.slug} to={servicePath(service.slug)} style={{ textDecoration: 'none' }}>
                <article
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    borderTop: `3px solid ${service.color}`,
                    boxShadow: '0 1px 2px rgba(1,40,84,0.04), 0 2px 8px rgba(1,40,84,0.06)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = `0 4px 16px ${service.color}22, 0 12px 32px ${service.color}18`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = '0 1px 2px rgba(1,40,84,0.04), 0 2px 8px rgba(1,40,84,0.06)'
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      color: '#012854',
                      lineHeight: 1.3,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {service.h1}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '0.875rem',
                      color: '#475569',
                      lineHeight: '1.65',
                      marginBottom: '1.25rem',
                      flexGrow: 1,
                    }}
                  >
                    {service.summary}
                  </p>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      color: textOnLight(service.color),
                    }}
                  >
                    View service <ArrowRight size={13} />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Coverage + CTA */}
        <section style={{ background: '#fff', padding: '3.5rem 1.5rem', borderTop: '1px solid #f1f5f9' }}>
          <div className="max-w-3xl mx-auto">
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#012854',
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              Where We Work
            </h2>
            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '0.95rem',
                color: '#475569',
                lineHeight: '1.8',
                marginBottom: '1.5rem',
              }}
            >
              We serve hospitals and imaging centers across the {COMPANY.areaServed.country}, with a
              primary focus on the {COMPANY.areaServed.primaryRegion}. Emergency support is available
              24/7, and every engagement starts with a free consultation — we reply within one
              business day.
            </p>
            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '0.95rem',
                color: '#475569',
                lineHeight: '1.8',
              }}
            >
              Not sure which service you need?{' '}
              <a
                href="/#contact"
                onClick={e => { e.preventDefault(); quote.open() }}
                style={{ color: '#00697f', fontWeight: 600, textDecoration: 'none' }}
              >
                Tell us what the system is doing
              </a>{' '}
              and we will point you to the right one. You can also browse the{' '}
              <Link to="/blog" style={{ color: '#00697f', fontWeight: 600, textDecoration: 'none' }}>
                CT &amp; MRI resource library
              </Link>{' '}
              or see the{' '}
              <a href="/#equipment" style={{ color: '#00697f', fontWeight: 600, textDecoration: 'none' }}>
                systems we cover
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
