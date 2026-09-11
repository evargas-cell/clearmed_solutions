import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import ServiceRequestForm from './ServiceRequestForm'
import { useQuoteModal } from './quoteModalContext'

/**
 * The quote form in a native <dialog>, so the browser handles focus trapping,
 * Esc to close, and returning focus to whichever button opened it.
 */
export default function QuoteModal() {
  const { isOpen, close } = useQuoteModal()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
    // showModal() blocks interaction but not scrolling on every browser.
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <dialog
      ref={ref}
      className="quote-dialog"
      aria-labelledby="quote-dialog-title"
      onClose={close}
      onClick={e => { if (e.target === ref.current) close() }} // click outside the panel
    >
      {/* Mounted only while open: each visit starts with an empty form and a
          single Turnstile widget. */}
      {isOpen && (
        <div className="quote-dialog-inner">
          <button type="button" className="quote-dialog-close" onClick={close} aria-label="Close">
            <X size={18} />
          </button>
          <h2
            id="quote-dialog-title"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.35rem, 2.4vw, 1.75rem)',
              color: '#012854',
              letterSpacing: '-0.02em',
              paddingRight: '2.5rem',
            }}
          >
            Request a Service Quote
          </h2>
          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '0.9rem',
              color: '#64748b',
              lineHeight: '1.7',
              margin: '0.6rem 0 1.5rem',
            }}
          >
            Tell us about your Siemens or GE imaging equipment and service needs. Our certified team
            will respond within one business day.
          </p>
          <ServiceRequestForm idPrefix="quote-modal" onClose={close} />
        </div>
      )}
    </dialog>
  )
}
