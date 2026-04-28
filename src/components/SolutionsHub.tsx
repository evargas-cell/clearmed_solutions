import { useEffect, useRef, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const PANELS = [
  {
    step: '01',
    label: 'Siemens Service',
    title: 'SOMATOM CT & MAGNETOM MRI',
    desc: 'Factory-certified engineers across the full Siemens Healthineers portfolio. Preventive maintenance, corrective repairs, tube replacements, and helium management.',
    highlights: [
      'SOMATOM Definition, Force, go-series CT coverage',
      'MAGNETOM Aera, Espree, Vida, Sola, Skyra MRI',
      'Tube lifecycle management & predictive maintenance',
      'Helium level monitoring and top-off service',
    ],
    accent: '#5de0e0',
    brand: 'Siemens Healthineers',
    brandColor: 'rgba(0,112,112,0.22)',
    brandBorder: 'rgba(0,112,112,0.5)',
  },
  {
    step: '02',
    label: 'GE Service',
    title: 'Revolution CT & SIGNA MRI',
    desc: 'Comprehensive service for the full GE Healthcare imaging portfolio. OEM-quality parts, certified engineers, and multi-site contract options.',
    highlights: [
      'Revolution EVO, HD, Discovery CT750 HD coverage',
      'SIGNA Architect, Artist, Explorer, Voyager MRI',
      'X-ray tube replacement and detector calibration',
      'Magnet and cryogen system management',
    ],
    accent: '#7ba7e0',
    brand: 'GE Healthcare',
    brandColor: 'rgba(0,48,135,0.28)',
    brandBorder: 'rgba(0,48,135,0.55)',
  },
  {
    step: '03',
    label: 'Installation & Commissioning',
    title: 'Site Planning to Handoff',
    desc: 'End-to-end project management for new installations, system relocations, and full recommissioning. Logistics, rigging, and regulatory sign-off included.',
    highlights: [
      'Full system deinstallation and relocation',
      'RF shielding inspection and site preparation',
      'System commissioning and ACR/AAPM acceptance',
      'Staff training and handoff documentation',
    ],
    accent: '#f4a500',
    brand: 'Full-Service Projects',
    brandColor: 'rgba(244,165,0,0.15)',
    brandBorder: 'rgba(244,165,0,0.4)',
  },
  {
    step: '04',
    label: 'Parts & Components',
    title: 'OEM & Aftermarket Supply',
    desc: 'Direct access to certified OEM and high-quality aftermarket components. We source, test, and deliver tubes, coils, gradient boards, and HV cables with guaranteed compatibility.',
    highlights: [
      'CT and MRI tube procurement and installation',
      'Gradient amplifier and RF coil supply',
      'HV cable, detector module, and board parts',
      'Emergency and planned repair sourcing',
    ],
    accent: '#6ecbb5',
    brand: 'Parts Sales',
    brandColor: 'rgba(110,203,181,0.15)',
    brandBorder: 'rgba(110,203,181,0.4)',
  },
]

// Minimum progress change before issuing a seek — avoids redundant decodes
const MIN_SEEK_DELTA = 0.004

export default function SolutionsHub() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)
  const lastProgressRef = useRef<number>(-1)
  const [activePanel, setActivePanel] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.pause()
      // Promote video to its own GPU layer to reduce composite cost
      video.style.willChange = 'contents'
    }

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current
        const vid = videoRef.current
        if (!section) return

        const rect = section.getBoundingClientRect()
        const scrollable = section.offsetHeight - window.innerHeight
        const scrolled = -rect.top
        const progress = Math.max(0, Math.min(1, scrolled / scrollable))

        setScrollProgress(progress)

        const panelCount = PANELS.length
        setActivePanel(Math.min(panelCount - 1, Math.floor(progress * panelCount)))

        // Only seek if the change is meaningful — skips redundant decodes
        if (
          vid &&
          vid.duration &&
          Math.abs(progress - lastProgressRef.current) > MIN_SEEK_DELTA
        ) {
          const targetTime = progress * vid.duration
          // fastSeek() is lower-precision but much faster; fall back to currentTime
          if (typeof (vid as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek === 'function') {
            (vid as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(targetTime)
          } else {
            vid.currentTime = targetTime
          }
          lastProgressRef.current = progress
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    // 400vh gives 300vh of scroll travel — more px-per-second = gentler seek rate
    <div
      id="about"
      ref={sectionRef}
      style={{ height: '400vh', position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          background: '#012854',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          style={{
            width: '100%',
            gap: 'clamp(2rem,4vw,4.5rem)',
            alignItems: 'center',
            paddingTop: '5rem',
            paddingBottom: '1.5rem',
          }}
        >
          {/* ── LEFT: text column ── */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Section label — left-aligned */}
            <div style={{ marginBottom: '1.75rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(0,159,193,0.12)',
                  color: '#009fc1',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '9999px',
                  marginBottom: '0.65rem',
                }}
              >
                Your Medical Imaging
              </span>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)',
                  color: '#fff',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.1,
                }}
              >
                Made Simple
              </h2>
            </div>

            {/* Step progress — expandable pills */}
            <div
              style={{
                display: 'flex',
                gap: '0.35rem',
                alignItems: 'center',
                marginBottom: '1.75rem',
              }}
            >
              {PANELS.map((p, i) => (
                <div
                  key={i}
                  style={{
                    height: '3px',
                    borderRadius: '9999px',
                    flexGrow: i === activePanel ? 3 : 1,
                    background:
                      i === activePanel
                        ? p.accent
                        : i < activePanel
                        ? 'rgba(255,255,255,0.28)'
                        : 'rgba(255,255,255,0.1)',
                    transition:
                      'flex-grow 0.55s cubic-bezier(0.16,1,0.3,1), background 0.4s ease',
                  }}
                />
              ))}
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.62rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.1em',
                  marginLeft: '0.4rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {PANELS[activePanel].step} / 04
              </span>
            </div>

            {/* Stacked panels — crossfade + slide */}
            <div style={{ position: 'relative', minHeight: '330px' }}>
              {PANELS.map((panel, i) => (
                <div
                  key={panel.label}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: i === activePanel ? 1 : 0,
                    transform: `translateY(${
                      i === activePanel ? '0px' : i < activePanel ? '-20px' : '20px'
                    })`,
                    transition:
                      'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                    pointerEvents: i === activePanel ? 'auto' : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      marginBottom: '0.95rem',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        background: panel.brandColor,
                        border: `1px solid ${panel.brandBorder}`,
                        color: panel.accent,
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.64rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '0.24rem 0.75rem',
                        borderRadius: '5px',
                      }}
                    >
                      {panel.brand}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 800,
                        fontSize: '0.62rem',
                        color: 'rgba(255,255,255,0.18)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {panel.step}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(1.3rem, 1.9vw, 1.7rem)',
                      color: '#fff',
                      letterSpacing: '-0.022em',
                      lineHeight: 1.18,
                      marginBottom: '0.8rem',
                    }}
                  >
                    {panel.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: '1.72',
                      marginBottom: '1.1rem',
                      maxWidth: '46ch',
                    }}
                  >
                    {panel.desc}
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                    {panel.highlights.map((h, j) => (
                      <li
                        key={j}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.55rem',
                          marginBottom: '0.48rem',
                        }}
                      >
                        <CheckCircle2
                          size={13}
                          style={{ color: panel.accent, flexShrink: 0, marginTop: '3px' }}
                        />
                        <span
                          style={{
                            fontFamily: 'Open Sans, sans-serif',
                            fontSize: '0.825rem',
                            color: 'rgba(255,255,255,0.7)',
                            lineHeight: '1.5',
                          }}
                        >
                          {h}
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
                    Get a Quote
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: scroll-scrubbed video ── */}
          <div className="hidden lg:block">
            <div
              style={{
                borderRadius: '18px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.35), 0 28px 56px rgba(0,0,0,0.22)',
              }}
            >
              <video
                ref={videoRef}
                src="/images/Siemens_CT_motion.mp4"
                muted
                playsInline
                preload="auto"
                style={{
                  width: '100%',
                  height: '440px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(1,40,84,0.82) 0%, transparent 52%)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.2rem 1.4rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  gap: '1rem',
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.9)',
                      lineHeight: 1.35,
                      marginBottom: '0.15rem',
                    }}
                  >
                    {PANELS[activePanel].label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '0.66rem',
                      color: 'rgba(255,255,255,0.42)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Serviced &amp; Commissioned by ClearMed
                  </p>
                </div>

                <div
                  style={{
                    width: '72px',
                    height: '2px',
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${scrollProgress * 100}%`,
                      background: '#009fc1',
                      borderRadius: '9999px',
                      transition: 'width 0.06s linear',
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                textAlign: 'right',
                marginTop: '0.7rem',
                opacity: scrollProgress < 0.04 ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            >
              <span
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '0.66rem',
                  color: 'rgba(255,255,255,0.28)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Scroll to explore
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
