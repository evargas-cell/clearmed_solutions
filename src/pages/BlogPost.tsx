import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import { getPostBySlug, BLOG_POSTS } from '../data/blogPosts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = getPostBySlug(slug ?? '')

  if (!post) return <Navigate to="/blog" replace />

  const otherPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        <Navbar />
      </div>

      <main style={{ paddingTop: '72px' }}>
        {/* Hero */}
        <div style={{ background: '#012854', padding: '3.5rem 1.5rem 4rem' }}>
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                marginBottom: '1.75rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              <ArrowLeft size={13} /> Back to all articles
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.68rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: post.categoryColor,
                  background: `${post.categoryColor}20`,
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                }}
              >
                {post.category}
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                <Clock size={12} /> {post.readTime}
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                <Calendar size={12} /> {post.date}
              </span>
            </div>

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
              {post.title}
            </h1>
            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: '1.6',
              }}
            >
              {post.subtitle}
            </p>
          </div>
        </div>

        {/* Article body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6" style={{ padding: '3.5rem 1.5rem' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: 'clamp(1.75rem, 4vw, 3rem)',
              boxShadow: '0 2px 8px rgba(1,40,84,0.06), 0 8px 32px rgba(1,40,84,0.08)',
            }}
          >
            {/* Accent bar */}
            <div
              style={{
                height: '3px',
                background: post.categoryColor,
                borderRadius: '9999px',
                marginBottom: '2.5rem',
                width: '48px',
              }}
            />

            {post.sections.map((section, si) => (
              <div key={si} style={{ marginBottom: '2.25rem' }}>
                {section.heading && (
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
                )}

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

                {section.callout && (
                  <div
                    style={{
                      borderLeft: `4px solid ${post.categoryColor}`,
                      background: `${post.categoryColor}08`,
                      borderRadius: '0 12px 12px 0',
                      padding: '1.1rem 1.5rem',
                      margin: '1.5rem 0',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: '#012854',
                        lineHeight: '1.6',
                        margin: 0,
                      }}
                    >
                      {section.callout}
                    </p>
                  </div>
                )}

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
                            background: post.categoryColor,
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

            {/* End CTA */}
            <div
              style={{
                marginTop: '3rem',
                padding: '2rem',
                background: '#012854',
                borderRadius: '14px',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: '#fff',
                  marginBottom: '0.6rem',
                }}
              >
                Questions about your facility's imaging equipment?
              </h3>
              <p
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.65)',
                  marginBottom: '1.25rem',
                }}
              >
                ClearMed Imaging Solutions provides free consultations for facilities across the Southeast.
              </p>
              <Link to="/#contact" style={{ textDecoration: 'none' }}>
                <button className="btn-amber">Get a Free Consultation</button>
              </Link>
            </div>
          </div>
        </div>

        {/* More articles */}
        {otherPosts.length > 0 && (
          <div
            style={{ background: '#fff', padding: '3.5rem 1.5rem', borderTop: '1px solid #f1f5f9' }}
          >
            <div className="max-w-7xl mx-auto">
              <h3
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: '#012854',
                  marginBottom: '2rem',
                }}
              >
                More from the Resource Library
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {otherPosts.map(p => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div
                      style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        borderTop: `3px solid ${p.categoryColor}`,
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'pointer',
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
                      <span
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.65rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: p.categoryColor,
                          display: 'block',
                          marginBottom: '0.6rem',
                        }}
                      >
                        {p.category}
                      </span>
                      <h4
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#012854',
                          lineHeight: 1.35,
                          marginBottom: '0.75rem',
                        }}
                      >
                        {p.title}
                      </h4>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          color: p.categoryColor,
                        }}
                      >
                        Read <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
