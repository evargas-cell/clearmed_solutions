import { COMPANY } from '../data/company'
import { HOME_PAGE, OG_IMAGE, SITE_URL } from './pages'

// JSON-LD structured data, injected into the prerendered <head> by
// scripts/prerender.mjs. Everything here must match visible page content.

const BUSINESS_ID = `${SITE_URL}/#business`
// Nationwide coverage, with the Southeast as the primary region.
const AREA_SERVED = [
  { '@type': 'Country', name: COMPANY.areaServed.country },
  { '@type': 'Place', name: COMPANY.areaServed.primaryRegion },
]

// `anchor` is the on-page section that describes each service.
const SERVICES = [
  {
    key: 'ct-service',
    name: 'CT Scanner Service & Repair',
    serviceType: 'CT scanner service and repair',
    anchor: '#services',
    description: 'Preventive maintenance, corrective and emergency repair, X-ray tube replacement, and detector calibration for Siemens SOMATOM and GE Revolution, Discovery, Optima, and LightSpeed CT systems.',
  },
  {
    key: 'mri-service',
    name: 'MRI Service & Repair',
    serviceType: 'MRI service and repair',
    anchor: '#services',
    description: 'Preventive maintenance, emergency fault resolution, and magnet and cryogen (helium) management for Siemens MAGNETOM and GE SIGNA and Optima MRI systems.',
  },
  {
    key: 'installation',
    name: 'CT & MRI Installation and Deinstallation',
    serviceType: 'Medical imaging equipment installation and deinstallation',
    anchor: '#installation',
    description: 'Site planning, RF shielding inspection and site preparation, rigging, installation, and commissioning with ACR/AAPM acceptance, plus full system deinstallation and relocation for Siemens and GE CT and MRI systems.',
  },
  {
    key: 'preventive-maintenance',
    name: 'Preventive Maintenance for Siemens & GE CT and MRI',
    serviceType: 'Preventive maintenance for CT and MRI systems',
    anchor: '#preventive-maintenance',
    description: 'Scheduled preventive maintenance to OEM specifications for Siemens and GE CT and MRI systems, with planned maintenance programs and full-service or time-and-materials contracts.',
  },
]

const serviceId = (key: string) => `${SITE_URL}/#${key}-schema`

function homeJsonLd() {
  const { address } = COMPANY
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: COMPANY.name,
        publisher: { '@id': BUSINESS_ID },
      },
      {
        // LocalBusiness rather than MedicalBusiness: schema.org defines the
        // latter as a provider of medical care; ClearMed services equipment.
        '@type': 'LocalBusiness',
        '@id': BUSINESS_ID,
        name: COMPANY.name,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/images/logo.svg`,
        image: OG_IMAGE,
        description: HOME_PAGE.description,
        telephone: COMPANY.phoneIntl,
        email: COMPANY.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: address.street,
          addressLocality: address.city,
          addressRegion: address.region,
          postalCode: address.postalCode,
          addressCountry: address.country,
        },
        areaServed: AREA_SERVED,
        founder: [
          { '@type': 'Person', name: 'Eyad Albakri' },
          { '@type': 'Person', name: 'Ankur Patel' },
        ],
        sameAs: [COMPANY.social.facebook, COMPANY.social.linkedin],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'CT and MRI imaging equipment services',
          itemListElement: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@id': serviceId(s.key) } })),
        },
      },
      ...SERVICES.map(s => ({
        '@type': 'Service',
        '@id': serviceId(s.key),
        name: s.name,
        serviceType: s.serviceType,
        description: s.description,
        url: `${SITE_URL}/${s.anchor}`,
        provider: { '@id': BUSINESS_ID },
        areaServed: AREA_SERVED,
      })),
    ],
  }
}

/** JSON-LD documents for a route (currently only the homepage has any). */
export function jsonLdFor(path: string): object[] {
  return path === '/' ? [homeJsonLd()] : []
}
