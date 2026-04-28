import { Mail } from 'lucide-react'

export default function TopBar() {
  return (
    <div
      style={{
        background: '#012854',
        padding: '0.45rem 0',
        width: '100%',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: email */}
        <a
          href="mailto:support@clearmedimaging.com"
          className="flex items-center gap-2"
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '0.8rem',
            fontFamily: 'Open Sans, sans-serif',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
        >
          <Mail size={13} style={{ color: '#009fc1', flexShrink: 0 }} />
          support@clearmedimaging.com
        </a>

        {/* Right: pill button */}
        <a
          href="mailto:support@clearmedimaging.com"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'transparent',
            color: '#009fc1',
            border: '1px solid #009fc1',
            borderRadius: '9999px',
            padding: '0.25rem 0.9rem',
            fontSize: '0.75rem',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'background-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#009fc1'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#009fc1'
          }}
        >
          <Mail size={11} />
          Email Us
        </a>
      </div>
    </div>
  )
}
