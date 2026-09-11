import { useEffect, useRef, useState, type RefObject } from 'react'
import { useQuoteModal } from './quoteModalContext'

function parseStat(value: string) {
  const m = value.match(/^(\d+)([+%]?)$/)
  if (!m) return null
  return { num: parseInt(m[1]), suffix: m[2] }
}

function HeroStat({ value, label, startDelay, rowRef }: {
  value: string
  label: string
  startDelay: number
  rowRef: RefObject<HTMLDivElement | null>
}) {
  const parsed = parseStat(value)
  // Starts at the final value so the prerendered HTML (what crawlers read)
  // shows the real number rather than "0+".
  const [count, setCount] = useState(parsed ? parsed.num : 0)

  useEffect(() => {
    const target = parseStat(value)
    const row = rowRef.current
    // Count up only while the stats row is still hidden by its fade-in delay.
    // If the prerendered page was already on screen before JS hydrated, the
    // visitor has seen the final numbers — don't drop them back to zero.
    if (!target || !row || parseFloat(getComputedStyle(row).opacity) > 0.05) return
    const duration = 1600
    const start = performance.now() + startDelay
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(Math.max((now - start) / duration, 0), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target.num))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, startDelay, rowRef])

  const display = parsed ? `${count}${parsed.suffix}` : value

  return (
    <div
      style={{
        background: 'rgba(1,40,84,0.55)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
          color: '#009fc1',
          lineHeight: 1,
          marginBottom: '0.25rem',
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontFamily: 'Open Sans, sans-serif',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export default function HeroSection() {
  const quote = useQuoteModal()
  const statsRowRef = useRef<HTMLDivElement>(null)

  const stats = [
    { value: '20+', label: 'Years Experience' },
    { value: '500+', label: 'Systems Serviced' },
    { value: '24/7', label: 'Emergency Support' },
    { value: '100%', label: 'OEM-Certified Staff' },
  ]

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/mri-aera-room.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(1,40,84,0.95) 0%, rgba(1,40,84,0.82) 60%, rgba(0,80,100,0.78) 100%)',
        }}
      />

      {/* Content */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        style={{ position: 'relative', zIndex: 1, paddingTop: '2rem', paddingBottom: '2rem', marginTop: '5rem' }}
      >
        <div style={{ textAlign: 'center' }}>
          {/* The page's single h1 reads "GE & Siemens CT and MRI Service,
              Installation & Maintenance": the sky subline and the headline are
              block spans inside it, styled and animated exactly as before. */}
          <h1>
            <span
              className="animate-fadeInUp"
              style={{
                display: 'block',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                color: '#009fc1',
                letterSpacing: '0.1em',
                lineHeight: 1.5,
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              GE &amp; Siemens CT and MRI
            </span>{' '}
            <span
              className="animate-fadeInUp delay-100"
              style={{
                display: 'block',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#fff',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
              }}
            >
              Service, Installation &amp; Maintenance
            </span>
          </h1>

          {/* Body copy */}
          <p
            className="animate-fadeInUp delay-300"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'rgba(255,255,255,0.82)',
              lineHeight: '1.75',
              maxWidth: '620px',
              marginBottom: '2.25rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            ClearMed Imaging Solutions provides OEM-certified service, installation, and preventive maintenance for Siemens and GE CT and MRI systems. From routine PMs to emergency repairs and full system relocations — we keep your imaging equipment performing at its best.
          </p>

          {/* CTA buttons */}
          <div
            className="animate-fadeInUp delay-400"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem', justifyContent: 'center' }}
          >
            {/* Real links (smooth-scrolled by html { scroll-behavior }) */}
            <a href="#services" className="btn-amber">
              Our Services
            </a>
            <a
              href="#contact"
              className="btn-outline-white"
              onClick={e => { e.preventDefault(); quote.open() }}
            >
              Contact Us
            </a>
          </div>

          {/* Stats row */}
          <div
            ref={statsRowRef}
            className="animate-fadeInUp delay-500"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem',
              maxWidth: '600px',
              marginBottom: '2.5rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {stats.map((stat, i) => (
              <HeroStat
                key={i}
                value={stat.value}
                label={stat.label}
                startDelay={800 + i * 120}
                rowRef={statsRowRef}
              />
            ))}
          </div>

          {/* Brand row */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.15)',
              paddingTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.55)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              OEM-Certified Service For
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: 'rgba(0,112,112,0.25)',
                  border: '1px solid rgba(0,112,112,0.5)',
                  color: '#5de0e0',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '6px',
                }}
              >
                Siemens Healthineers
              </span>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '1.2rem' }}>|</span>
              <span
                style={{
                  background: 'rgba(0,48,135,0.3)',
                  border: '1px solid rgba(0,48,135,0.6)',
                  color: '#7ba7e0',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '6px',
                }}
              >
                GE Healthcare
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
