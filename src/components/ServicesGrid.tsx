import React from 'react'
import { Zap, Activity, Scan, Brain } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const CARDS = [
  {
    id: 'siemens-ct',
    brand: 'Siemens',
    title: 'CT Service',
    color: '#007070',
    bg: '#f0fdfb',
    iconBg: 'rgba(0,112,112,0.1)',
    Icon: Zap,
    desc: 'Full-service maintenance and repair for Siemens SOMATOM CT systems. OEM-certified engineers keep your scanner operating at peak diagnostic performance.',
  },
  {
    id: 'siemens-mri',
    brand: 'Siemens',
    title: 'MRI Service',
    color: '#007070',
    bg: '#f0fdfb',
    iconBg: 'rgba(0,112,112,0.1)',
    Icon: Activity,
    desc: 'Expert service for the full Siemens MAGNETOM MRI portfolio. From preventive maintenance to emergency fault resolution, we minimize downtime.',
  },
  {
    id: 'ge-ct',
    brand: 'GE',
    title: 'CT Service',
    color: '#003087',
    bg: '#eff6ff',
    iconBg: 'rgba(0,48,135,0.08)',
    Icon: Scan,
    desc: 'Comprehensive service coverage for GE Revolution and Discovery CT systems. Certified engineers deliver reliable, fast support nationwide.',
  },
  {
    id: 'ge-mri',
    brand: 'GE',
    title: 'MRI Service',
    color: '#003087',
    bg: '#eff6ff',
    iconBg: 'rgba(0,48,135,0.08)',
    Icon: Brain,
    desc: 'Dedicated service for GE SIGNA MRI systems. Our team provides OEM-quality repairs, preventive maintenance, and rapid emergency response.',
  },
]

export default function ServicesGrid() {
  const { ref, inView } = useInView(0.1)

  return (
    <section id="services" style={{ background: '#fff', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(0,159,193,0.1)',
              color: '#009fc1',
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
            What We Do
          </span>
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              color: '#012854',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Your Medical Imaging Service Hub
          </h2>
          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#64748b',
              fontSize: '1rem',
              lineHeight: '1.7',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Independent, OEM-certified service for Siemens and GE CT and MRI systems — keeping your imaging department running with confidence.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {CARDS.map((card, i) => {
            const Icon = card.Icon
            return (
              <div
                key={card.id}
                id={card.id}
                style={{
                  background: card.bg,
                  borderRadius: '16px',
                  padding: '1.75rem',
                  border: `1px solid ${card.color}20`,
                  boxShadow: '0 1px 2px rgba(1,40,84,0.04), 0 2px 8px rgba(1,40,84,0.06)',
                  transition: `transform 0.2s ease, box-shadow 0.2s ease, opacity 0.6s ease ${i * 0.1}s, translate 0.6s ease ${i * 0.1}s`,
                  cursor: 'default',
                  opacity: inView ? 1 : 0,
                  translate: inView ? '0 0' : '0 28px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = `0 4px 16px ${card.color}22, 0 12px 32px ${card.color}18`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 1px 2px rgba(1,40,84,0.04), 0 2px 8px rgba(1,40,84,0.06)'
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: card.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Icon size={22} style={{ color: card.color }} />
                </div>

                {/* Brand label */}
                <p
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: card.color,
                    marginBottom: '0.35rem',
                    opacity: 0.75,
                  }}
                >
                  {card.brand}
                </p>

                <h3
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.15rem',
                    color: '#012854',
                    marginBottom: '0.75rem',
                    lineHeight: 1.25,
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontSize: '0.875rem',
                    color: '#475569',
                    lineHeight: '1.65',
                    marginBottom: '1.25rem',
                  }}
                >
                  {card.desc}
                </p>

                <button
                  onClick={() => {
                    const el = document.querySelector('#about')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: card.color,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'gap 0.2s ease, opacity 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.gap = '8px'
                    e.currentTarget.style.opacity = '0.8'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.gap = '4px'
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  Learn More →
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
