import { useRef, useState } from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Turnstile from './Turnstile'
import { COMPANY } from '../data/company'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  organization: string
  equipmentType: string
  serviceNeeded: string
  message: string
}

const INITIAL: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  organization: '', equipmentType: '', serviceNeeded: '', message: '',
}

interface Props {
  /** Prefixes field ids so the page can hold more than one copy of this form. */
  idPrefix: string
  /** Provided by the modal: shows a Close button on the success screen. */
  onClose?: () => void
}

/** The service-request form. Used by the contact section and the quote dialog. */
export default function ServiceRequestForm({ idPrefix, onClose }: Props) {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [sending, setSending] = useState(false)

  // ── Spam defenses ───────────────────────────────────────────────────────────
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaNonce, setCaptchaNonce] = useState(0)
  // Honeypot: hidden from real users, irresistible to naive bots.
  const [website, setWebsite] = useState('')
  // Bots fill and submit near-instantly; humans do not.
  const openedAt = useRef(Date.now())

  const id = (name: string) => `${idPrefix}-${name}`

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const encode = (data: Record<string, string>) =>
    Object.entries(data)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    setErrorMsg('')

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setError(true)
      setErrorMsg('Please complete the "I\'m not a robot" verification below before submitting.')
      return
    }

    setSending(true)
    try {
      const res = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          ...(form as unknown as Record<string, string>),
          'cf-turnstile-response': captchaToken,
          website,
          elapsed: String(Date.now() - openedAt.current),
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(true)
        setCaptchaToken('')
        setCaptchaNonce(n => n + 1)
      }
    } catch {
      setError(true)
      setCaptchaToken('')
      setCaptchaNonce(n => n + 1)
    } finally {
      setSending(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setForm(INITIAL)
    setWebsite('')
    setCaptchaToken('')
    setCaptchaNonce(n => n + 1)
    openedAt.current = Date.now()
  }

  const inputClass = `
    w-full rounded-xl border px-4 py-3 text-sm focus:outline-none
  `
  const inputStyle = {
    borderColor: '#e2e8f0',
    fontFamily: 'Open Sans, sans-serif',
    color: '#1e293b',
    background: '#f8fafc',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  }
  const focusRingColor = '#009fc1'
  const labelClass = 'block text-sm font-semibold mb-1.5'
  const labelStyle = { color: '#374151', fontFamily: 'Montserrat, sans-serif' }

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-10 flex flex-col items-center justify-center text-center"
        style={{ background: '#f0fdf4', border: '2px solid #86efac', minHeight: onClose ? undefined : '400px' }}
      >
        <CheckCircle size={56} style={{ color: '#16a34a' }} className="mb-4" />
        <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#166534' }}>
          Thank You!
        </h3>
        <p className="mt-3 max-w-sm" style={{ color: '#15803d', fontSize: '1rem', lineHeight: '1.7' }}>
          Your request has been received. A ClearMed specialist will contact you within one business day.
        </p>
        <button
          onClick={onClose ?? resetForm}
          className="btn-sky mt-6"
          style={{ fontSize: '0.85rem' }}
        >
          {onClose ? 'Close' : 'Submit Another Request'}
        </button>
      </div>
    )
  }

  return (
    <>
      {error ? (
        <div
          role="alert"
          style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', color: '#dc2626', fontFamily: 'Open Sans, sans-serif', fontSize: '0.875rem' }}
        >
          {errorMsg || `Something went wrong. Please try again, call ${COMPANY.phone}, or email us directly at ${COMPANY.email}`}
        </div>
      ) : null}
      <form onSubmit={submit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor={id('firstName')} className={labelClass} style={labelStyle}>
              First Name <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              required
              id={id('firstName')}
              type="text"
              name="firstName"
              autoComplete="given-name"
              value={form.firstName}
              onChange={handle}
              placeholder="John"
              className={inputClass}
              style={{ ...inputStyle, outline: 'none' }}
              onFocus={e => (e.target.style.borderColor = focusRingColor)}
              onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
            />
          </div>
          <div>
            <label htmlFor={id('lastName')} className={labelClass} style={labelStyle}>
              Last Name <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              required
              id={id('lastName')}
              type="text"
              name="lastName"
              autoComplete="family-name"
              value={form.lastName}
              onChange={handle}
              placeholder="Smith"
              className={inputClass}
              style={{ ...inputStyle, outline: 'none' }}
              onFocus={e => (e.target.style.borderColor = focusRingColor)}
              onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor={id('email')} className={labelClass} style={labelStyle}>
              Email <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              required
              id={id('email')}
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handle}
              placeholder="john@hospital.com"
              className={inputClass}
              style={{ ...inputStyle, outline: 'none' }}
              onFocus={e => (e.target.style.borderColor = focusRingColor)}
              onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
            />
          </div>
          <div>
            <label htmlFor={id('phone')} className={labelClass} style={labelStyle}>
              Phone <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              required
              id={id('phone')}
              type="tel"
              name="phone"
              autoComplete="tel"
              value={form.phone}
              onChange={handle}
              placeholder="(555) 000-0000"
              className={inputClass}
              style={{ ...inputStyle, outline: 'none' }}
              onFocus={e => (e.target.style.borderColor = focusRingColor)}
              onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
            />
          </div>
        </div>

        <div>
          <label htmlFor={id('organization')} className={labelClass} style={labelStyle}>
            Organization <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            required
            id={id('organization')}
            type="text"
            name="organization"
            autoComplete="organization"
            value={form.organization}
            onChange={handle}
            placeholder="Hospital or Imaging Center Name"
            className={inputClass}
            style={{ ...inputStyle, outline: 'none' }}
            onFocus={e => (e.target.style.borderColor = focusRingColor)}
            onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor={id('equipmentType')} className={labelClass} style={labelStyle}>
              Equipment Type
            </label>
            <select
              id={id('equipmentType')}
              name="equipmentType"
              value={form.equipmentType}
              onChange={handle}
              className={inputClass}
              style={{ ...inputStyle, outline: 'none', cursor: 'pointer' }}
              onFocus={e => (e.target.style.borderColor = focusRingColor)}
              onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="">Select equipment type</option>
              <option>GE CT</option>
              <option>GE MRI</option>
              <option>Siemens CT</option>
              <option>Siemens MRI</option>
              <option>Multiple Systems</option>
            </select>
          </div>
          <div>
            <label htmlFor={id('serviceNeeded')} className={labelClass} style={labelStyle}>
              Service Needed
            </label>
            <select
              id={id('serviceNeeded')}
              name="serviceNeeded"
              value={form.serviceNeeded}
              onChange={handle}
              className={inputClass}
              style={{ ...inputStyle, outline: 'none', cursor: 'pointer' }}
              onFocus={e => (e.target.style.borderColor = focusRingColor)}
              onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="">Select service type</option>
              <option>Service &amp; Install</option>
              <option>Preventive Maintenance</option>
              <option>Remote Diagnostics</option>
              <option>Technical Support</option>
              <option>Emergency Repair</option>
              <option>Service Quote</option>
              <option>System Installation</option>
              <option>Technical Consultation</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor={id('message')} className={labelClass} style={labelStyle}>
            Message
          </label>
          <textarea
            id={id('message')}
            name="message"
            value={form.message}
            onChange={handle}
            rows={4}
            placeholder="Tell us more about your equipment and service needs..."
            className={inputClass}
            style={{ ...inputStyle, outline: 'none', resize: 'vertical' }}
            onFocus={e => (e.target.style.borderColor = focusRingColor)}
            onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
          />
        </div>

        {/* Honeypot — hidden from humans, off-screen rather than display:none
            so bots that skip hidden inputs still see it. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <label htmlFor={id('website')}>Do not fill this out</label>
          <input
            id={id('website')}
            type="text"
            name="website"
            value={website}
            onChange={e => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {TURNSTILE_SITE_KEY ? (
          <div>
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onVerify={setCaptchaToken}
              resetKey={captchaNonce}
            />
          </div>
        ) : null}

        <button
          type="submit"
          disabled={sending}
          className="btn-amber flex items-center gap-2 w-full justify-center"
          style={{ opacity: sending ? 0.7 : 1, cursor: sending ? 'wait' : 'pointer' }}
        >
          {sending ? 'Sending…' : <>Submit Request <ArrowRight size={16} /></>}
        </button>
      </form>
    </>
  )
}
