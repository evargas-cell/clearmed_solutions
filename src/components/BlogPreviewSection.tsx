import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { BLOG_POSTS } from '../data/blogPosts'

const PREVIEW = BLOG_POSTS.slice(0, 3)

export default function BlogPreviewSection() {
  return (
    <section style={{ background: '#ffffff', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(1,40,84,0.08)',
                color: '#012854',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                marginBottom: '1rem',
              }}
            >
              Resource Library
            </span>
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                color: '#012854',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Insights for Imaging Decision Makers
            </h2>
            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '0.95rem',
                color: '#64748b',
                lineHeight: '1.7',
                marginTop: '0.75rem',
                maxWidth: '520px',
              }}
            >
              In-depth guides on service, maintenance, installation, and cost management for CT and MRI systems.
            </p>
          </div>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: '#009fc1',
              textDecoration: 'none',
              transition: 'gap 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.gap = '0.75rem')}
            onMouseLeave={e => (e.currentTarget.style.gap = '0.5rem')}
          >
            View all articles <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {PREVIEW.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article
                style={{
                  background: '#f8fafc',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: `3px solid ${post.categoryColor}`,
                  transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s cubic-bezier(0.16,1,0.3,1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(1,40,84,0.1), 0 12px 40px rgba(1,40,84,0.12)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: post.categoryColor,
                      }}
                    >
                      {post.category}
                    </span>
                    <span
                      style={{
                        width: '3px',
                        height: '3px',
                        borderRadius: '50%',
                        background: '#cbd5e1',
                        display: 'inline-block',
                      }}
                    />
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '0.75rem',
                        color: '#94a3b8',
                      }}
                    >
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      color: '#012854',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.35,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '0.85rem',
                      color: '#64748b',
                      lineHeight: '1.7',
                      flex: 1,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {post.excerpt.slice(0, 160)}…
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      color: post.categoryColor,
                    }}
                  >
                    Read article <ArrowRight size={13} />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
