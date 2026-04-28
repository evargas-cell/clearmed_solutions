export default function BrandsBanner() {
  return (
    <section style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#64748b',
            }}
          >
            OEM-Certified Service For
          </span>

          <div className="flex items-center gap-8">
            {/* Siemens Healthineers badge */}
            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
                style={{ background: '#009999', fontFamily: 'Montserrat, sans-serif' }}
              >
                S
              </div>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.875rem', color: '#007070' }}>
                Siemens Healthineers
              </span>
            </div>

            <div style={{ width: '1px', height: '32px', background: '#cbd5e1' }} />

            {/* GE Healthcare badge */}
            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
              style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
                style={{ background: '#003087', fontFamily: 'Montserrat, sans-serif' }}
              >
                GE
              </div>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.875rem', color: '#003087' }}>
                GE Healthcare
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
