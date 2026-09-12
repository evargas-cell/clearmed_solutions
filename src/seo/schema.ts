import { COMPANY } from '../data/company'
import { SERVICES, SERVICES_HUB, getServiceBySlug, servicePath, type ServiceDetail } from '../data/services'
import { HOME_PAGE, OG_IMAGE, SITE_URL } from './pages'

// JSON-LD structured data, injected into the prerendered <head> by
// scripts/prerender.mjs. Everything here must match visible page content.

const BUSINESS_ID = `${SITE_URL}/#business`
// Nationwide coverage, with the Southeast as the primary region.
const AREA_SERVED = [
  { '@type': 'Country', name: COMPANY.areaServed.country },
  { '@type': 'Place', name: COMPANY.areaServed.primaryRegion },
]

const abs = (path: string) => `${SITE_URL}${path}`
/** Each service's canonical node lives on its own page. */
const serviceId = (slug: string) => `${abs(servicePath(slug))}#service`

/**
 * The business. The homepage carries the full record; other pages carry a
 * short form under the same @id so each page stands on its own without
 * repeating the address block nine times.
 */
function businessNode(full: boolean) {
  const { address } = COMPANY
  const short = {
    // LocalBusiness rather than MedicalBusiness: schema.org defines the
    // latter as a provider of medical care; ClearMed services equipment.
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: COMPANY.name,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/logo.svg`,
    telephone: COMPANY.phoneIntl,
    email: COMPANY.email,
  }
  if (!full) return short
  return {
    ...short,
    image: OG_IMAGE,
    description: HOME_PAGE.description,
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
      itemListElement: SERVICES.map(s => ({
        '@type': 'Offer',
        itemOffered: { '@id': serviceId(s.slug) },
      })),
    },
  }
}

function serviceNode(service: ServiceDetail) {
  return {
    '@type': 'Service',
    '@id': serviceId(service.slug),
    name: service.h1,
    serviceType: service.serviceType,
    description: service.description,
    url: abs(servicePath(service.slug)),
    provider: { '@id': BUSINESS_ID },
    areaServed: AREA_SERVED,
  }
}

/** Mirrors the visible <Breadcrumbs> trail on the page. */
function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  }
}

function homeJsonLd() {
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
      businessNode(true),
      ...SERVICES.map(serviceNode),
    ],
  }
}

function servicesHubJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Services', path: SERVICES_HUB.path },
      ]),
      businessNode(false),
      {
        '@type': 'CollectionPage',
        '@id': `${abs(SERVICES_HUB.path)}#page`,
        url: abs(SERVICES_HUB.path),
        name: SERVICES_HUB.title,
        description: SERVICES_HUB.description,
        about: { '@id': BUSINESS_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: SERVICES.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.h1,
            url: abs(servicePath(s.slug)),
          })),
        },
      },
    ],
  }
}

function serviceJsonLd(service: ServiceDetail) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Services', path: SERVICES_HUB.path },
        { name: service.label, path: servicePath(service.slug) },
      ]),
      businessNode(false),
      serviceNode(service),
    ],
  }
}

/** JSON-LD documents for a route. Routes with none return an empty list. */
export function jsonLdFor(path: string): object[] {
  if (path === '/') return [homeJsonLd()]
  if (path === SERVICES_HUB.path) return [servicesHubJsonLd()]

  const match = /^\/services\/([\w-]+)$/.exec(path)
  if (match) {
    const service = getServiceBySlug(match[1])
    if (service) return [serviceJsonLd(service)]
  }
  return []
}
