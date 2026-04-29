import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxItem {
  src: string
  caption: string
  tag: string
}

interface LightboxProps {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const btnStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.09)',
    border: 'none',
    color: '#fff',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s ease',
    flexShrink: 0,
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(1,18,48,0.97)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{ ...btnStyle, position: 'absolute', top: '1.25rem', right: '1.25rem' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        style={{
          ...btnStyle,
          position: 'absolute',
          left: '1.25rem',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: index === 0 ? 0.2 : 1,
          pointerEvents: index === 0 ? 'none' : 'auto',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Image + caption */}
      <div
        style={{ maxWidth: 'min(90vw, 1000px)', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Counter */}
        <div
          style={{
            textAlign: 'right',
            marginBottom: '0.5rem',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.3)',
            fontWeight: 600,
          }}
        >
          {index + 1} / {items.length}
        </div>

        <img
          key={item.src}
          src={item.src}
          alt={item.caption}
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
            display: 'block',
            borderRadius: '12px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            animation: 'fadeIn 0.25s ease',
          }}
        />

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(0,159,193,0.85)',
              color: '#fff',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
              marginBottom: '0.5rem',
            }}
          >
            {item.tag}
          </span>
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: '1.4',
            }}
          >
            {item.caption}
          </p>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        style={{
          ...btnStyle,
          position: 'absolute',
          right: '1.25rem',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: index === items.length - 1 ? 0.2 : 1,
          pointerEvents: index === items.length - 1 ? 'none' : 'auto',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}
