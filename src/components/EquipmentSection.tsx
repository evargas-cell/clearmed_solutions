import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const TABS = [
  {
    id: 'siemens-ct',
    label: 'Siemens CT',
    color: '#007070',
    activeBg: 'rgba(0,112,112,0.1)',
    models: [
      'SOMATOM Definition Flash',
      'SOMATOM Force',
      'SOMATOM Definition AS+',
      'SOMATOM Perspective',
      'SOMATOM go.Now',
      'SOMATOM go.Up',
    ],
    image: '/images/ct-definition-flash.jpg',
    imageAlt: 'Siemens SOMATOM Definition Flash CT Scanner',
    objectPosition: 'center 25%',
  },
  {
    id: 'siemens-mri',
    label: 'Siemens MRI',
    color: '#007070',
    activeBg: 'rgba(0,112,112,0.1)',
    models: [
      'MAGNETOM Aera',
      'MAGNETOM Espree',
      'MAGNETOM Vida',
      'MAGNETOM Sola',
      'MAGNETOM Lumina',
      'MAGNETOM Skyra',
    ],
    image: '/images/mri-aera-installed.jpg',
    imageAlt: 'Siemens MAGNETOM Aera MRI System',
    objectPosition: '65% 40%',
  },
  {
    id: 'ge-ct',
    label: 'GE CT',
    color: '#003087',
    activeBg: 'rgba(0,48,135,0.08)',
    models: [
      'Revolution EVO',
      'Revolution HD',
      'Discovery CT750 HD',
      'Optima CT660',
      'LightSpeed VCT',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/27/UPMCEast_CTscan.jpg',
    imageAlt: 'GE LightSpeed CT Scanner',
    objectPosition: 'center 40%',
  },
  {
    id: 'ge-mri',
    label: 'GE MRI',
    color: '#003087',
    activeBg: 'rgba(0,48,135,0.08)',
    models: [
      'SIGNA Architect',
      'SIGNA Artist',
      'SIGNA Explorer',
      'SIGNA Voyager',
      'Optima MR450w',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/11/GE_Optima_MR360_Advance.jpg',
    imageAlt: 'GE Optima MRI System',
    objectPosition: 'center center',
  },
]

export default function EquipmentSection() {
  const [active, setActive] = useState(0)
  const tab = TABS[active]

  return (
    <section id="equipment" style={{ background: '#f8fafc', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
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
            GE &amp; Siemens Imaging Systems
          </span>
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              color: '#012854',
              letterSpacing: '-0.02em',
            }}
          >
            Equipment We Service &amp; Install
          </h2>
        </div>

        {/* Tab row */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
            justifyContent: 'center',
          }}
        >
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '9999px',
                border: `2px solid ${active === i ? t.color : '#e2e8f0'}`,
                background: active === i ? t.activeBg : '#fff',
                color: active === i ? t.color : '#64748b',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease',
                outline: 'none',
              }}
              onFocus={e => (e.currentTarget.style.outline = `2px solid ${t.color}`)}
              onBlur={e => (e.currentTarget.style.outline = 'none')}
              onMouseEnter={e => {
                if (active !== i) {
                  e.currentTarget.style.borderColor = t.color + '80'
                  e.currentTarget.style.color = t.color
                }
              }}
              onMouseLeave={e => {
                if (active !== i) {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.color = '#64748b'
                }
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content: two columns */}
        <div
          key={tab.id}
          className="animate-fadeIn"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            background: '#fff',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 2px 8px rgba(1,40,84,0.08), 0 8px 24px rgba(1,40,84,0.06)',
          }}
        >
          {/* Model checklist */}
          <div>
            <h3
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#012854',
                marginBottom: '1.5rem',
              }}
            >
              {tab.label} Models We Service
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {tab.models.map(model => (
                <li
                  key={model}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  <CheckCircle2
                    size={18}
                    style={{ color: tab.color, flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: '#1e293b',
                    }}
                  >
                    {model}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment photo */}
          <div>
            <div
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(1,40,84,0.08), 0 8px 24px rgba(1,40,84,0.12)',
              }}
            >
              <img
                src={tab.image}
                alt={tab.imageAlt}
                style={{
                  width: '100%',
                  height: '340px',
                  objectFit: 'cover',
                  objectPosition: tab.objectPosition,
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => {
              const el = document.querySelector('#contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-amber"
          >
            Contact Us About Your Equipment
          </button>
        </div>
      </div>
    </section>
  )
}
