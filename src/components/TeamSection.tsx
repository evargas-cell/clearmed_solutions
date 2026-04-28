const FOUNDERS = [
  {
    name: 'Eyad Albakri',
    title: 'Co-Founder',
    bio: 'With over two decades of hands-on experience servicing Siemens and GE imaging systems, Eyad brings deep OEM-level expertise to every engagement. His technical background and commitment to uptime have shaped ClearMed\'s reputation for reliable, precision service across the Southeast.',
    image: '/images/Eyad.png',
  },
  {
    name: 'Ankur Patel',
    title: 'Co-Founder',
    bio: 'Ankur combines extensive field experience in medical imaging installation and maintenance with a strong focus on client relationships and operational excellence. He leads ClearMed\'s service strategy, ensuring facilities receive responsive, high-quality support when it matters most.',
    image: '/images/Ankur.png',
  },
]

export default function TeamSection() {
  return (
    <section id="about" style={{ background: '#f8fafc', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
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
            Our Leadership
          </span>
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              color: '#012854',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Meet the Founders
          </h2>
          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: '1.7',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            ClearMed was built by engineers — people who have spent careers inside CT and MRI systems and understand what it takes to keep them running.
          </p>
        </div>

        {/* Founder cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {FOUNDERS.map(founder => (
            <div
              key={founder.name}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(1,40,84,0.06), 0 8px 28px rgba(1,40,84,0.09)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2.5rem 2rem 2rem',
                textAlign: 'center',
              }}
            >
              {/* Photo */}
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  boxShadow: '0 4px 16px rgba(1,40,84,0.15), 0 0 0 4px rgba(0,159,193,0.15)',
                  flexShrink: 0,
                }}
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </div>

              {/* Name & title */}
              <h3
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  color: '#012854',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.3rem',
                }}
              >
                {founder.name}
              </h3>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#009fc1',
                  marginBottom: '1.25rem',
                }}
              >
                {founder.title}
              </span>

              {/* Divider */}
              <div
                style={{
                  width: '40px',
                  height: '2px',
                  borderRadius: '9999px',
                  background: 'rgba(0,159,193,0.3)',
                  marginBottom: '1.25rem',
                }}
              />

              {/* Bio */}
              <p
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '0.88rem',
                  color: '#64748b',
                  lineHeight: '1.75',
                }}
              >
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
