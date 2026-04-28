import { CheckCircle } from 'lucide-react'

const CHECKLIST = [
  'OEM-certified preventive maintenance',
  'Emergency corrective repair service',
  'System installation and commissioning',
  'Remote diagnostics and troubleshooting',
  'Planned maintenance programs',
  'Magnet and cryogen management',
  'Software upgrades and patches',
  'Multi-system service contracts',
]

const OFFERINGS = [
  {
    title: 'Preventive Maintenance',
    desc: 'Scheduled PMs that meet OEM standards and keep your system warranty-compliant.',
  },
  {
    title: 'Emergency Repair',
    desc: 'Same-day emergency response for critical failures — minimizing patient care disruption.',
  },
  {
    title: 'System Installation',
    desc: 'Full-service rigging, siting, installation, and clinical commissioning of CT and MRI systems.',
  },
  {
    title: 'Remote Support',
    desc: 'Remote diagnostics and guided troubleshooting to resolve issues before dispatching on-site.',
  },
]

export default function SupportSection() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '5rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/mri-espree-front.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Heavy navy overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(1,28,64,0.91)',
        }}
      />

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left column */}
          <div>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(0,159,193,0.15)',
                color: '#009fc1',
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
              Expert Support
            </span>

            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Dependable Service When Your Equipment Can't Wait
            </h2>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.25rem' }}>
              {CHECKLIST.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    marginBottom: '0.6rem',
                  }}
                >
                  <CheckCircle size={16} style={{ color: '#009fc1', flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.82)',
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                const el = document.querySelector('#contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-amber"
            >
              Request Support
            </button>
          </div>

          {/* Right column: glassmorphism card */}
          <div
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: '20px',
              padding: '2rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#fff',
                marginBottom: '1.5rem',
              }}
            >
              Our Service Offerings
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {OFFERINGS.map(o => (
                <div
                  key={o.title}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#009fc1',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {o.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '0.83rem',
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: '1.6',
                    }}
                  >
                    {o.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
