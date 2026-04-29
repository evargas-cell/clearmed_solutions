import React, { useEffect, useRef, useState } from 'react'
import { Award, Clock, FileText } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const FEATURES = [
  {
    Icon: Award,
    title: 'OEM-Certified Engineers',
    bullets: [
      'GE and Siemens factory-certified technicians',
      'Continuous OEM training and recertification',
      'Repairs performed to OEM specifications',
    ],
  },
  {
    Icon: Clock,
    title: 'Rapid Response & On-Site Support',
    bullets: [
      'Regional coverage across the Southeast',
      'Remote diagnostics before dispatch',
      'Same-day emergency response available',
    ],
  },
  {
    Icon: FileText,
    title: 'Flexible Service Contracts',
    bullets: [
      'Full-service and time-and-materials options',
      'Multi-system discounts for imaging centers',
      'Free initial consultation and quote',
    ],
  },
]

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '500+', label: 'Systems Serviced' },
  { value: '100%', label: 'OEM-Certified' },
  { value: '24/7', label: 'Emergency Support' },
]

function parseStat(value: string) {
  const m = value.match(/^(\d+)([+%]?)$/)
  if (!m) return null
  return { num: parseInt(m[1]), suffix: m[2] }
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const { ref, inView } = useInView(0.3)
  const [count, setCount] = useState(0)
  const started = useRef(false)
  const parsed = parseStat(value)

  useEffect(() => {
    if (!inView || started.current || !parsed) return
    started.current = true
    const { num } = parsed
    const duration = 1800
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * num))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView])

  const display = parsed ? `${count}${parsed.suffix}` : value

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          color: '#009fc1',
          lineHeight: 1,
          marginBottom: '0.35rem',
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontFamily: 'Open Sans, sans-serif',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.65)',
          fontWeight: 600,
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </div>
    </div>
  )
}

export default function WhyChooseUs() {
  return (
    <>
      <section style={{ background: '#fff', padding: '5rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            {/* Left: text */}
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
                  marginBottom: '1.25rem',
                }}
              >
                Why ClearMed
              </span>

              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)',
                  color: '#012854',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                }}
              >
                Choose the Leading Independent Provider of Imaging Service
              </h2>

              <p
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.75',
                  marginBottom: '2rem',
                }}
              >
                ClearMed Imaging Solutions combines factory-level expertise with the flexibility and responsiveness of an independent service organization. We're not tied to manufacturer pricing models — we're focused entirely on keeping your equipment performing and your patients served.
              </p>

              {/* Feature items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {FEATURES.map(({ Icon, title, bullets }) => (
                  <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(1,40,84,0.07)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} style={{ color: '#012854' }} />
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#012854',
                          marginBottom: '0.4rem',
                        }}
                      >
                        {title}
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {bullets.map((b, i) => (
                          <li
                            key={i}
                            style={{
                              fontFamily: 'Open Sans, sans-serif',
                              fontSize: '0.83rem',
                              color: '#64748b',
                              lineHeight: '1.6',
                              paddingLeft: '0.75rem',
                              position: 'relative',
                            }}
                          >
                            <span
                              style={{
                                position: 'absolute',
                                left: 0,
                                top: '0.45em',
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                background: '#009fc1',
                              }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const el = document.querySelector('#contact')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-amber"
              >
                Get a Free Consultation
              </button>
            </div>

            {/* Right: image */}
            <div>
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(1,40,84,0.08), 0 8px 24px rgba(1,40,84,0.12)',
                }}
              >
                <img
                  src="/images/mri-espree-front.jpg"
                  alt="Siemens MAGNETOM Espree"
                  style={{
                    width: '100%',
                    height: '520px',
                    objectFit: 'cover',
                    objectPosition: 'center 35%',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip — full-width */}
      <div
        style={{
          background: '#012854',
          padding: '2.25rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1rem',
        }}
      >
        {STATS.map(s => (
          <AnimatedCounter key={s.value} value={s.value} label={s.label} />
        ))}
      </div>
    </>
  )
}
