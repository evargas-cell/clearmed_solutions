import { Mail, MapPin, Clock, Phone } from 'lucide-react'
import ServiceRequestForm from './ServiceRequestForm'
import SocialLinks from './SocialLinks'
import { COMPANY } from '../data/company'

export default function ContactSection() {
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
          {/* Form — same component the quote dialog uses */}
          <div className="lg:col-span-2">
            <ServiceRequestForm idPrefix="contact" />
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
                  href={`tel:${COMPANY.phoneIntl}`}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,159,193,0.2)' }}>
                    <Phone size={16} style={{ color: '#009fc1' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Phone</p>
                    <p style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>{COMPANY.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,159,193,0.2)' }}>
                    <Mail size={16} style={{ color: '#009fc1' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email</p>
                    <p style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>{COMPANY.email}</p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,159,193,0.2)' }}>
                    <MapPin size={16} style={{ color: '#009fc1' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Address</p>
                    <p style={{ fontSize: '0.875rem', color: '#fff', fontFamily: 'Montserrat, sans-serif', lineHeight: '1.5' }}>
                      {COMPANY.address.street}<br />{COMPANY.address.city}, {COMPANY.address.region} {COMPANY.address.postalCode}
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
                <div style={{ paddingTop: '0.25rem' }}>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Follow Us</p>
                  <SocialLinks />
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}
            >
              <h3
                className="mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#012854' }}
              >
                Free Consultation
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.6', marginBottom: '16px' }}>
                Schedule a no-obligation consultation with one of our imaging specialists.
              </p>
              {/* The form is right here, so jump into it rather than opening the dialog. */}
              <button
                onClick={() => {
                  const el = document.getElementById('contact-firstName')
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  el?.focus({ preventScroll: true })
                }}
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
