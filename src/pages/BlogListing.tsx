import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { BLOG_POSTS } from '../data/blogPosts'
import SEOHead from '../components/SEOHead'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function BlogListing() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        <Navbar />
      </div>

      <SEOHead
        title="Resource Library | ClearMed Imaging Solutions"
        description="In-depth guides on CT and MRI service, maintenance, installation, parts, and contract pricing — written for imaging directors and hospital administrators."
        path="/blog"
      />
      <main style={{ paddingTop: '72px' }}>
        {/* Hero */}
        <div style={{ background: '#012854', padding: '4rem 1.5rem 3.5rem' }}>
          <div className="max-w-4xl mx-auto text-center">
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(0,159,193,0.2)',
                color: '#009fc1',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                marginBottom: '1.25rem',
              }}
            >
              Resources &amp; Insights
            </span>
            <h1
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              The ClearMed Resource Library
            </h1>
            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: '1.7',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              In-depth guides for imaging directors, hospital administrators, and facilities teams on service, maintenance, installation, and cost management for CT and MRI systems.
            </p>
          </div>
        </div>

        {/* Articles grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: '4rem 1.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem',
            }}
          >
            {BLOG_POSTS.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <article
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(1,40,84,0.06), 0 8px 24px rgba(1,40,84,0.08)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s cubic-bezier(0.16,1,0.3,1)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(1,40,84,0.1), 0 16px 40px rgba(1,40,84,0.14)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(1,40,84,0.06), 0 8px 24px rgba(1,40,84,0.08)'
                  }}
                >
                  {/* Color accent bar */}
                  <div style={{ height: '4px', background: post.categoryColor }} />

                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.68rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: post.categoryColor,
                          background: `${post.categoryColor}12`,
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
                          fontSize: '0.78rem',
                          color: '#94a3b8',
                        }}
                      >
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Number */}
                    <div
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 900,
                        fontSize: '3.5rem',
                        color: 'rgba(1,40,84,0.04)',
                        lineHeight: 1,
                        marginBottom: '-0.5rem',
                        userSelect: 'none',
                      }}
                    >
                      0{i + 1}
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        color: '#012854',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.3,
                        marginBottom: '0.75rem',
                      }}
                    >
                      {post.title}
                    </h2>

                    <p
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '0.875rem',
                        color: '#64748b',
                        lineHeight: '1.7',
                        flex: 1,
                        marginBottom: '1.5rem',
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* CTA */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        color: post.categoryColor,
                      }}
                    >
                      Read Article <ArrowRight size={14} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div
          style={{
            background: '#012854',
            padding: '3rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              color: '#ffffff',
              marginBottom: '0.75rem',
            }}
          >
            Ready to discuss your facility's imaging service needs?
          </h3>
          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '1.75rem',
            }}
          >
            Our team provides free consultations and service quotes for facilities across the Southeast.
          </p>
          <Link to="/#contact" style={{ textDecoration: 'none' }}>
            <button className="btn-amber">Request a Service Quote</button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
