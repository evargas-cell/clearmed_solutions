import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { getServiceBySlug, servicePath, textOnDark, textOnLight, type ServiceDetail } from '../data/services'
import { getPostBySlug } from '../data/blogPosts'
import SEOHead from '../components/SEOHead'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import { servicePage } from '../seo/pages'
import { COMPANY } from '../data/company'
import { useQuoteModal } from '../components/quoteModalContext'

/**
 * One /services/<slug> page, rendered from src/data/services.ts. The layout
 * deliberately mirrors BlogPost.tsx — navy hero, white card on a slate ground —
 * so the new pages read as part of the same site.
 */
export default function ServicePage() {
  const quote = useQuoteModal()
  const { slug } = useParams<{ slug: string }>()
  const service = getServiceBySlug(slug ?? '')

  if (!service) return <Navigate to="/services" replace />

  const articles = service.related.map(getPostBySlug).filter(Boolean)
  const siblings = service.siblings.map(getServiceBySlug).filter(Boolean) as ServiceDetail[]

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#f8fafc' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        <Navbar />
      </header>

      <SEOHead {...servicePage(service)} />
      <main style={{ paddingTop: '72px' }}>
        <article>
          {/* Hero */}
          <div style={{ background: '#012854', padding: '3.5rem 1.5rem 4rem' }}>
            <div className="max-w-3xl mx-auto">
              <Breadcrumbs
                items={[
                  { label: 'Home', to: '/' },
                  { label: 'Services', to: '/services' },
                  { label: service.label },
                ]}
              />

              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.68rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: textOnDark(service.color),
                  background: 'rgba(255,255,255,0.08)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  marginBottom: '1.25rem',
                }}
              >
                {service.label}
              </span>

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
                {service.h1}
              </h1>
              <p
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '1.05rem',
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: '1.6',
                }}
              >
                {service.summary}
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

          {/* Body */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6" style={{ padding: '3.5rem 1.5rem' }}>
            <div
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: 'clamp(1.75rem, 4vw, 3rem)',
                boxShadow: '0 2px 8px rgba(1,40,84,0.06), 0 8px 32px rgba(1,40,84,0.08)',
              }}
            >
              <div
                style={{
                  height: '3px',
                  background: service.color,
                  borderRadius: '9999px',
                  marginBottom: '2.5rem',
                  width: '48px',
                }}
              />

              {service.image && (
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: 'clamp(200px, 34vw, 320px)',
                    objectFit: 'cover',
                    borderRadius: '14px',
                    marginBottom: '2.5rem',
                    display: 'block',
                  }}
                />
              )}

              {service.sections.map((section, si) => (
                <div key={si} style={{ marginBottom: '2.25rem' }}>
                  <h2
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      color: '#012854',
                      letterSpacing: '-0.02em',
                      marginBottom: '1rem',
                      marginTop: si > 0 ? '0.5rem' : 0,
                    }}
                  >
                    {section.heading}
                  </h2>

                  {section.paragraphs?.map((p, pi) => (
                    <p
                      key={pi}
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '1rem',
                        color: '#374151',
                        lineHeight: '1.8',
                        marginBottom: '1.1rem',
                      }}
                    >
                      {p}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0' }}>
                      {section.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            padding: '0.6rem 0',
                            borderBottom: '1px solid #f1f5f9',
                            fontFamily: 'Open Sans, sans-serif',
                            fontSize: '0.9rem',
                            color: '#374151',
                            lineHeight: '1.55',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: service.color,
                              flexShrink: 0,
                              marginTop: '0.5em',
                            }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Systems covered */}
              {service.systems && (
                <div style={{ marginBottom: '2.25rem' }}>
                  <h2
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      color: '#012854',
                      letterSpacing: '-0.02em',
                      marginBottom: '1rem',
                    }}
                  >
                    {service.systems.heading}
                  </h2>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: '0.6rem',
                    }}
                  >
                    {service.systems.models.map(model => (
                      <li
                        key={model}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          background: '#f8fafc',
                          border: '1px solid #eef2f7',
                          borderRadius: '10px',
                          padding: '0.65rem 0.9rem',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 600,
                          fontSize: '0.83rem',
                          color: '#012854',
                        }}
                      >
                        <CheckCircle2 size={15} style={{ color: service.color, flexShrink: 0 }} />
                        {model}
                      </li>
                    ))}
                  </ul>
                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '0.875rem',
                      color: '#64748b',
                      lineHeight: '1.7',
                      marginTop: '1rem',
                    }}
                  >
                    Running something not listed here?{' '}
                    <a
                      href="/#contact"
                      onClick={e => { e.preventDefault(); quote.open() }}
                      style={{ color: '#00697f', fontWeight: 600, textDecoration: 'none' }}
                    >
                      Ask us about your system
                    </a>{' '}
                    — the list covers the platforms we see most often, not the limit of what we service.
                  </p>
                </div>
              )}

              {/* CTA */}
              <div
                style={{
                  marginTop: '3rem',
                  padding: '2rem',
                  background: '#012854',
                  borderRadius: '14px',
                  textAlign: 'center',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    color: '#fff',
                    marginBottom: '0.6rem',
                  }}
                >
                  {/* Not lowercased: the labels carry proper nouns and acronyms
                      ("Siemens CT Service"), which toLowerCase() mangles. */}
                  Talk to us about {service.label}
                </h2>
                <p
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.65)',
                    marginBottom: '1.25rem',
                  }}
                >
                  Free consultation and quote, with a reply within one business day.
                </p>
                <a href="/#contact" className="btn-amber" onClick={e => { e.preventDefault(); quote.open() }}>
                  Get a Free Quote
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Other services */}
        {siblings.length > 0 && (
          <section style={{ background: '#fff', padding: '3.5rem 1.5rem', borderTop: '1px solid #f1f5f9' }}>
            <div className="max-w-7xl mx-auto">
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: '#012854',
                  marginBottom: '2rem',
                }}
              >
                Related Services
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {siblings.map(s => (
                  <Link key={s.slug} to={servicePath(s.slug)} style={{ textDecoration: 'none' }}>
                    <div
                      style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        borderTop: `3px solid ${s.color}`,
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        height: '100%',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(1,40,84,0.1)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#012854',
                          lineHeight: 1.35,
                          marginBottom: '0.6rem',
                        }}
                      >
                        {s.h1}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontSize: '0.83rem',
                          color: '#64748b',
                          lineHeight: '1.6',
                          marginBottom: '0.9rem',
                        }}
                      >
                        {s.summary}
                      </p>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          color: textOnLight(s.color),
                        }}
                      >
                        View service <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Related reading */}
              {articles.length > 0 && (
                <>
                  <h2
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      color: '#012854',
                      margin: '3rem 0 1.25rem',
                    }}
                  >
                    Further Reading
                  </h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {articles.map(post => (
                      <li key={post!.slug} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <Link
                          to={`/blog/${post!.slug}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            padding: '0.9rem 0',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color: '#012854',
                            textDecoration: 'none',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#00697f')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#012854')}
                        >
                          {post!.title}
                          <ArrowRight size={14} style={{ flexShrink: 0 }} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <Link
                to="/services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginTop: '2.5rem',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: '#00697f',
                  textDecoration: 'none',
                }}
              >
                <ArrowLeft size={13} /> All services
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
