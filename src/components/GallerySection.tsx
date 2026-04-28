const GALLERY = [
  {
    src: '/images/mri-aera-installed.jpg',
    caption: 'Siemens MAGNETOM Aera — Installed & Commissioned',
    tag: 'MRI Installation',
    objectPosition: '65% 40%',
  },
  {
    src: '/images/mri-espree-front.jpg',
    caption: 'Siemens MAGNETOM Espree — Clinical Room Ready',
    tag: 'MRI Service',
    objectPosition: 'center 35%',
  },
  {
    src: '/images/mri-espree-side.jpg',
    caption: 'Siemens MAGNETOM Espree — Full Installation',
    tag: 'MRI Installation',
    objectPosition: '40% center',
  },
  {
    src: '/images/ct-definition-flash.jpg',
    caption: 'Siemens SOMATOM Definition Flash — Mobile CT',
    tag: 'CT Service',
    objectPosition: 'center 40%',
  },
  {
    src: '/images/mri-crane-1.jpg',
    caption: 'Crane Lift — MRI Magnet Bore Rigging',
    tag: 'Heavy Equipment Moving',
    objectPosition: '35% 55%',
  },
  {
    src: '/images/mri-install-rolling-2.jpg',
    caption: 'MRI Magnet — Precision Maneuvering Into Facility',
    tag: 'System Installation',
    objectPosition: 'center center',
  },
]

export default function GallerySection() {
  return (
    <section id="gallery" style={{ background: '#f8fafc', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(1,40,84,0.08)', color: '#012854', fontFamily: 'Montserrat, sans-serif' }}
          >
            Our Work
          </span>
          <h2
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#012854', letterSpacing: '-0.02em' }}
          >
            Real Installations. Real Expertise.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.7' }}>
            From crane rigging and heavy magnet moves to full clinical commissioning — our team handles every aspect
            of the installation process with precision and professionalism.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALLERY.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 2px 8px rgba(1,40,84,0.08), 0 8px 24px rgba(1,40,84,0.12)' }}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ height: '280px', objectPosition: item.objectPosition }}
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(1,40,84,0.85) 0%, rgba(1,40,84,0.2) 55%, transparent 100%)' }}
              />
              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(0,159,193,0.85)', color: '#fff', fontFamily: 'Montserrat, sans-serif' }}
                >
                  {item.tag}
                </span>
              </div>
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, color: '#fff', fontSize: '0.875rem', lineHeight: '1.4' }}>
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '16px' }}>
            Ready to get your system installed or serviced by the pros?
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-amber"
          >
            Request a Quote
          </button>
        </div>
      </div>
    </section>
  )
}
