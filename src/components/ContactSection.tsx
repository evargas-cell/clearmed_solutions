import { useState } from 'react'
import { Mail, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react'

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

export default function ContactSection() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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

  return (
    <section id="contact" style={{ background: '#fff', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(0,159,193,0.1)', color: '#009fc1', fontFamily: 'Montserrat, sans-serif' }}
          >
            Get In Touch
          </span>
          <h2
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#012854', letterSpacing: '-0.02em' }}
          >
            Request a Service Quote
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.7' }}>
            Tell us about your Siemens or GE imaging equipment and service needs. Our certified team will respond within one business day with a customized service proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center text-center"
                style={{ background: '#f0fdf4', border: '2px solid #86efac', minHeight: '400px' }}
              >
                <CheckCircle size={56} style={{ color: '#16a34a' }} className="mb-4" />
                <h3
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#166534' }}
                >
                  Thank You!
                </h3>
                <p className="mt-3 max-w-sm" style={{ color: '#15803d', fontSize: '1rem', lineHeight: '1.7' }}>
                  Your request has been received. A ClearMed specialist will contact you within one business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(INITIAL) }}
                  className="btn-sky mt-6"
                  style={{ fontSize: '0.85rem' }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
                      First Name <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="firstName"
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
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
                      Last Name <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="lastName"
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
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
                      Email <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
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
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
                      Phone <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
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
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
                    Organization <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="organization"
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
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
                      Equipment Type
                    </label>
                    <select
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
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
                      Service Needed
                    </label>
                    <select
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
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151', fontFamily: 'Montserrat, sans-serif' }}>
                    Message
                  </label>
                  <textarea
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

                <button type="submit" className="btn-amber flex items-center gap-2 w-full justify-center">
                  Submit Request <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Contact info sidebar */}
          <div className="flex flex-col gap-5">
            <div
              className="rounded-2xl p-6"
              style={{ background: '#012854' }}
            >
              <h3
                className="mb-5"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff' }}
              >
                Contact Information
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:support@clearmedimaging.com"
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,159,193,0.2)' }}>
                    <Mail size={16} style={{ color: '#009fc1' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email</p>
                    <p style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>support@clearmedimaging.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,159,193,0.2)' }}>
                    <MapPin size={16} style={{ color: '#009fc1' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Address</p>
                    <p style={{ fontSize: '0.875rem', color: '#fff', fontFamily: 'Montserrat, sans-serif', lineHeight: '1.5' }}>
                      1005 Evenflow Dr.<br />Ball Ground, GA 30107
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,159,193,0.2)' }}>
                    <Clock size={16} style={{ color: '#009fc1' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Response Time</p>
                    <p style={{ fontSize: '0.875rem', color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>We respond within 1 business day</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}
            >
              <h4
                className="mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#012854' }}
              >
                Free Consultation
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.6', marginBottom: '16px' }}>
                Schedule a no-obligation consultation with one of our imaging specialists.
              </p>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-sky w-full"
                style={{ fontSize: '0.85rem', padding: '0.65rem 1rem' }}
              >
                Get a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
