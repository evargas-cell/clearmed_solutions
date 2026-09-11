/**
 * Company facts shown on the site and repeated in structured data and
 * llms.txt. Change them here only, so every copy stays in agreement.
 */
export const COMPANY = {
  name: 'ClearMed Imaging Solutions',
  phone: '(678) 471-9881',
  /** Machine-readable form for tel: links and schema.org telephone. */
  phoneIntl: '+1-678-471-9881',
  email: 'support@clearmedimaging.com',
  address: {
    street: '1005 Evenflow Dr.',
    city: 'Ball Ground',
    region: 'GA',
    postalCode: '30107',
    country: 'US',
  },
  /** Serves the whole US; the Southeast is the primary focus. */
  areaServed: {
    country: 'United States',
    primaryRegion: 'Southeastern United States',
  },
  social: {
    facebook: 'https://www.facebook.com/ClearMedImaging',
    linkedin: 'https://www.linkedin.com/company/clearmed-imaging-solutions',
  },
} as const
