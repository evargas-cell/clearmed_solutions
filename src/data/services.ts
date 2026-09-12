/**
 * Content for the /services pages. Every claim here restates something the
 * homepage already says (the service cards, the Solutions Hub panels, the
 * support checklist) — keep the two in agreement when either changes.
 *
 * Adding a service here is all that is needed: src/seo/pages.ts turns it into
 * a prerendered page, a sitemap entry, an llms.txt line, and a schema.org
 * Service node automatically.
 */

export interface ServiceSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface ServiceDetail {
  slug: string
  /** Short label for nav menus and cards. */
  label: string
  /** The page's single <h1>. */
  h1: string
  /** <title> — kept under 60 characters so search results don't truncate it. */
  title: string
  /** Meta description — kept under ~155 characters. */
  description: string
  /** Lede under the h1, reused as the card blurb on /services. */
  summary: string
  /** schema.org Service.serviceType. */
  serviceType: string
  /** Accent colour: Siemens teal, GE navy, or a ClearMed brand colour. */
  color: string
  image?: string
  imageAlt?: string
  systems?: { heading: string; models: string[] }
  sections: ServiceSection[]
  /** Slugs of related articles in src/data/blogPosts.ts. */
  related: string[]
  /** Slugs of related services, linked at the foot of the page. */
  siblings: string[]
}

const SIEMENS = '#007070'
const GE = '#003087'
const SKY = '#009fc1'
const AMBER = '#f4a500'
const MINT = '#6ecbb5'

export const SERVICES: ServiceDetail[] = [
  {
    slug: 'siemens-ct-service',
    label: 'Siemens CT Service',
    h1: 'Siemens SOMATOM CT Service & Repair',
    title: 'Siemens SOMATOM CT Service & Repair | ClearMed',
    description:
      'OEM-certified preventive maintenance, corrective repair, and X-ray tube replacement for Siemens SOMATOM CT scanners, nationwide with a Southeast focus.',
    summary:
      'Factory-certified engineers covering the full SOMATOM portfolio — from scheduled preventive maintenance to emergency X-ray tube replacement.',
    serviceType: 'Siemens CT scanner service and repair',
    color: SIEMENS,
    image: '/images/ct-definition-flash.jpg',
    imageAlt:
      'Siemens SOMATOM Definition Flash dual-source CT scanner installed in a mobile imaging trailer',
    systems: {
      heading: 'Siemens CT Systems We Service',
      models: [
        'SOMATOM Definition Flash',
        'SOMATOM Force',
        'SOMATOM Definition AS+',
        'SOMATOM Perspective',
        'SOMATOM go.Now',
        'SOMATOM go.Up',
      ],
    },
    sections: [
      {
        heading: 'What Siemens CT Service Covers',
        paragraphs: [
          'ClearMed is an independent service organization: our engineers are OEM-certified on Siemens CT platforms, but our contracts are not tied to a single manufacturer. Every visit follows OEM service specifications, and findings are documented so you can see how the system is trending between visits rather than only when something breaks.',
        ],
        bullets: [
          'X-ray tube performance verification and replacement',
          'Detector calibration and image quality QA',
          'Generator output testing',
          'Cooling system inspection and service',
          'Slip ring inspection and cleaning',
          'Gantry, table, and drive system mechanical service',
          'Software updates and patch management',
          'Remote diagnostics and guided troubleshooting',
        ],
      },
      {
        heading: 'Tube Lifecycle Management',
        paragraphs: [
          'The X-ray tube is the most expensive consumable in a CT scanner and the component most likely to take the system offline without warning. We track tube performance across visits, so a tube trending toward end of life can be replaced on a planned basis during a low-utilization window instead of in the middle of a clinic day.',
          'When a tube does need replacing, we source it, install it, and recalibrate the detector chain before the system returns to clinical use.',
        ],
      },
      {
        heading: 'Preventive Maintenance That Protects Image Quality',
        paragraphs: [
          'Calibration drift shows up as image artifacts long before it shows up as a fault code. A proper CT preventive maintenance visit checks the components most likely to cause unplanned failures — tube, detectors, generator, cooling — all of which have measurable early-warning signatures. The systems that stay in reliable clinical service past year fifteen are the ones with a consistent PM history.',
        ],
      },
      {
        heading: 'Service Contract Options',
        paragraphs: [
          'Coverage can be structured as a full-service contract with scheduled PMs, parts, and labor included, or as time and materials for facilities that prefer to pay per event. Multi-system and multi-site agreements are discounted. Every quote starts with a free consultation, and we reply within one business day.',
        ],
      },
    ],
    related: ['cost-of-deferred-maintenance', 'oem-vs-iso-service', 'service-contract-pricing'],
    siblings: ['siemens-mri-service', 'ge-ct-service', 'preventive-maintenance', 'emergency-repair'],
  },

  {
    slug: 'siemens-mri-service',
    label: 'Siemens MRI Service',
    h1: 'Siemens MAGNETOM MRI Service & Repair',
    title: 'Siemens MAGNETOM MRI Service & Repair | ClearMed',
    description:
      'OEM-certified service for Siemens MAGNETOM MRI systems: preventive maintenance, emergency fault resolution, and magnet and cryogen management nationwide.',
    summary:
      'Expert service across the full MAGNETOM portfolio, including helium monitoring, cold head service, and emergency fault resolution.',
    serviceType: 'Siemens MRI service and repair',
    color: SIEMENS,
    image: '/images/mri-aera-installed.jpg',
    imageAlt:
      'Siemens MAGNETOM Aera 1.5T MRI scanner installed and commissioned in a finished scan room',
    systems: {
      heading: 'Siemens MRI Systems We Service',
      models: [
        'MAGNETOM Aera',
        'MAGNETOM Espree',
        'MAGNETOM Vida',
        'MAGNETOM Sola',
        'MAGNETOM Lumina',
        'MAGNETOM Skyra',
      ],
    },
    sections: [
      {
        heading: 'What Siemens MRI Service Covers',
        paragraphs: [
          'MRI service is more than a mechanical inspection. The magnet, the gradient chain, and the RF system each degrade in ways that are invisible on a good day and expensive on a bad one, so our scope is built around the components whose early warning signs are measurable.',
        ],
        bullets: [
          'Helium level monitoring and top-off service',
          'Cryocooler and cold head performance service',
          'Magnet stability and pressure monitoring',
          'Gradient system health checks',
          'RF coil testing and repair',
          'Shim current verification',
          'Emergency fault resolution',
          'Software upgrades and patch management',
        ],
      },
      {
        heading: 'Cryogen Management and Quench Prevention',
        paragraphs: [
          'Helium boil-off rate, cryocooler performance, and magnet pressure are the leading indicators of the most expensive failure an MRI system can have. A missed inspection window can end in a quench — a rapid vaporization of liquid helium that takes the system offline for days and is costly to recover from.',
          'Monitoring these values on a schedule, and acting when they drift, is the single highest-value thing a service program does for an MRI suite.',
        ],
      },
      {
        heading: 'Planned Maintenance and Contracts',
        paragraphs: [
          'Coverage is available as a full-service contract or as time and materials, with discounts for multi-system and multi-site agreements. Components trending toward failure are flagged for proactive replacement, which can usually be scheduled during low-utilization windows with no revenue impact.',
        ],
      },
    ],
    related: ['cost-of-deferred-maintenance', 'oem-vs-iso-service', 'repair-vs-replace'],
    siblings: ['siemens-ct-service', 'ge-mri-service', 'preventive-maintenance', 'emergency-repair'],
  },

  {
    slug: 'ge-ct-service',
    label: 'GE CT Service',
    h1: 'GE CT Scanner Service & Repair',
    title: 'GE CT Scanner Service & Repair | ClearMed Imaging',
    description:
      'Certified service for GE Revolution, Discovery, Optima, and LightSpeed CT systems: preventive maintenance, tube replacement, and detector calibration.',
    summary:
      'Comprehensive coverage for the GE CT portfolio, delivered by OEM-certified engineers using OEM-quality parts.',
    serviceType: 'GE CT scanner service and repair',
    color: GE,
    image: '/images/GECT_Ankur.jpg',
    imageAlt:
      'ClearMed co-founder Ankur Patel servicing a GE CT scanner with the gantry covers removed',
    systems: {
      heading: 'GE CT Systems We Service',
      models: [
        'Revolution EVO',
        'Revolution HD',
        'Discovery CT750 HD',
        'Optima CT660',
        'LightSpeed VCT',
      ],
    },
    sections: [
      {
        heading: 'What GE CT Service Covers',
        paragraphs: [
          'Our engineers are certified on the GE CT platforms most commonly found in hospitals and imaging centers, and we service them to the same OEM specifications the factory uses — with the scheduling flexibility and pricing of an independent service organization.',
        ],
        bullets: [
          'X-ray tube replacement and performance verification',
          'Detector calibration and image quality QA',
          'Generator output testing',
          'Cooling system inspection and service',
          'Slip ring inspection and cleaning',
          'Gantry and table mechanical service',
          'Software updates and patch management',
          'Remote diagnostics and guided troubleshooting',
        ],
      },
      {
        heading: 'Parts Sourcing You Are Not Locked Into',
        paragraphs: [
          'As an independent provider we can source both OEM and tested aftermarket components, which usually means a shorter lead time and a lower cost on the parts that drive most CT repair invoices — tubes, detector modules, high-voltage cables, and boards. Every part is checked for compatibility before it goes into your system.',
        ],
      },
      {
        heading: 'Contract and Response Options',
        paragraphs: [
          'Full-service contracts, planned maintenance programs, and time-and-materials coverage are all available, with discounts for facilities running more than one system. Emergency support is available 24/7.',
        ],
      },
    ],
    related: ['oem-vs-iso-service', 'oem-vs-aftermarket-parts', 'service-contract-pricing'],
    siblings: ['ge-mri-service', 'siemens-ct-service', 'parts', 'emergency-repair'],
  },

  {
    slug: 'ge-mri-service',
    label: 'GE MRI Service',
    h1: 'GE SIGNA MRI Service & Repair',
    title: 'GE SIGNA MRI Service & Repair | ClearMed Imaging',
    description:
      'OEM-quality repair and preventive maintenance for GE SIGNA and Optima MRI systems, including magnet and cryogen management and rapid emergency response.',
    summary:
      'Dedicated service for GE SIGNA and Optima MRI systems, from routine PMs to magnet and cryogen emergencies.',
    serviceType: 'GE MRI service and repair',
    color: GE,
    image: '/images/GEMR.jpg',
    imageAlt: 'GE SIGNA MRI scanner in a finished scan room',
    systems: {
      heading: 'GE MRI Systems We Service',
      models: [
        'SIGNA Architect',
        'SIGNA Artist',
        'SIGNA Explorer',
        'SIGNA Voyager',
        'Optima MR450w',
      ],
    },
    sections: [
      {
        heading: 'What GE MRI Service Covers',
        paragraphs: [
          'The GE SIGNA platform rewards a service program built around its magnet and gradient systems. Our scope covers the whole chain, from cryogen levels through to RF coil performance, with findings documented visit over visit.',
        ],
        bullets: [
          'Magnet and cryogen (helium) management',
          'Cold head and cryocooler service',
          'Gradient amplifier service and replacement',
          'RF coil testing and repair',
          'Shim and image quality verification',
          'Emergency fault resolution',
          'Software upgrades and patch management',
          'Remote diagnostics and guided troubleshooting',
        ],
      },
      {
        heading: 'Gradient and Coil Repair',
        paragraphs: [
          'Gradient amplifiers and RF coils are the two components most likely to interrupt an MRI schedule after the magnet itself. We supply and install both, and can often repair a coil rather than replace it — a meaningful difference on a system that is otherwise healthy.',
        ],
      },
      {
        heading: 'Coverage and Contracts',
        paragraphs: [
          'Available as a full-service contract, a planned maintenance program, or time and materials, with multi-system discounts. Emergency support is available 24/7, and every engagement starts with a free consultation.',
        ],
      },
    ],
    related: ['oem-vs-iso-service', 'repair-vs-replace', 'service-contract-pricing'],
    siblings: ['ge-ct-service', 'siemens-mri-service', 'parts', 'emergency-repair'],
  },

  {
    slug: 'preventive-maintenance',
    label: 'Preventive Maintenance',
    h1: 'CT & MRI Preventive Maintenance',
    title: 'CT & MRI Preventive Maintenance | ClearMed Imaging',
    description:
      'Scheduled preventive maintenance to OEM specifications for Siemens and GE CT and MRI systems, with planned maintenance programs and documented trending.',
    summary:
      'Scheduled PMs that meet OEM standards, keep your system warranty-compliant, and catch failures while they are still inexpensive.',
    serviceType: 'Preventive maintenance for CT and MRI systems',
    color: SKY,
    image: '/images/mri-espree-front.jpg',
    imageAlt:
      'Siemens MAGNETOM Espree 1.5T open-bore MRI scanner in a finished, patient-ready scan room',
    sections: [
      {
        heading: 'What a CT Preventive Maintenance Visit Includes',
        paragraphs: [
          'A thorough CT PM is not a checklist exercise. It targets the components most likely to cause unplanned failures, all of which have measurable early-warning signatures.',
        ],
        bullets: [
          'X-ray tube performance verification',
          'Detector calibration',
          'Generator output testing',
          'Cooling system inspection',
          'Slip ring inspection',
          'Image quality QA',
        ],
      },
      {
        heading: 'What an MRI Preventive Maintenance Visit Includes',
        paragraphs: [
          'MRI PM scope expands to the magnet and its supporting systems, where failures develop more slowly and are far more expensive to resolve.',
        ],
        bullets: [
          'Cryogen system performance and helium levels',
          'Cryocooler and cold head checks',
          'RF coil testing',
          'Gradient system health checks',
          'Shim current verification',
          'Magnet stability monitoring',
        ],
      },
      {
        heading: 'Documentation and Trending',
        paragraphs: [
          'Findings are documented so values can be compared across visits. That is what turns a maintenance visit into a prediction: a component drifting over three visits gets replaced on a planned basis, during a low-utilization window, instead of failing mid-clinic.',
          'It also keeps your system warranty-compliant and gives you a service history to point at when a scanner comes up for repair-or-replace review.',
        ],
      },
      {
        heading: 'Planned Maintenance Programs',
        paragraphs: [
          'Medical imaging systems are designed for 10 to 15 year service lives, and facilities with consistent PM programs routinely extend that considerably — which matters when a replacement MRI or CT is a seven-figure capital decision. Programs are available as full-service contracts or time and materials, with multi-system discounts.',
        ],
      },
    ],
    related: ['cost-of-deferred-maintenance', 'service-contract-pricing', 'repair-vs-replace'],
    siblings: ['siemens-ct-service', 'siemens-mri-service', 'emergency-repair', 'ge-ct-service'],
  },

  {
    slug: 'installation-deinstallation',
    label: 'Installation & Deinstallation',
    h1: 'CT & MRI Installation & Deinstallation',
    title: 'CT & MRI Installation & Deinstallation | ClearMed',
    description:
      'Site planning, rigging, installation, and ACR/AAPM commissioning for Siemens and GE CT and MRI systems, plus full deinstallation and system relocation.',
    summary:
      'End-to-end project management for new installations, relocations, and deinstallations — from site planning through clinical handoff.',
    serviceType: 'Medical imaging equipment installation and deinstallation',
    color: AMBER,
    image: '/images/mri-crane-1.jpg',
    imageAlt:
      'Crane lifting a shrink-wrapped Siemens MRI magnet outside a warehouse while the rigging crew looks on',
    sections: [
      {
        heading: 'Site Planning and Preparation',
        paragraphs: [
          'Most installation problems are decided before the equipment arrives. We survey the route, the room, and the building services, and identify the constraints that drive the schedule — door and corridor widths, floor loading, power and cooling, and the RF environment.',
        ],
        bullets: [
          'Route and site surveys',
          'RF shielding inspection and site preparation',
          'Power, cooling, and structural requirements review',
          'Project scheduling and vendor coordination',
        ],
      },
      {
        heading: 'Rigging and Delivery',
        paragraphs: [
          'Getting a magnet or gantry into a finished building is the part of the job with the least margin for error. Our crews handle crane lifts, skating, and the occasional removed wall, with the rigging planned around the survey rather than improvised on the day.',
        ],
      },
      {
        heading: 'Installation and Commissioning',
        paragraphs: [
          'Once the system is in place, installation runs through to clinical readiness: assembly, calibration, image quality verification, and ACR/AAPM acceptance testing, followed by staff training and handoff documentation.',
        ],
        bullets: [
          'System assembly and calibration',
          'Image quality verification',
          'ACR/AAPM acceptance testing',
          'Staff training and handoff documentation',
        ],
      },
      {
        heading: 'Deinstallation and Relocation',
        paragraphs: [
          'We also take systems out: full deinstallation for disposal or resale, and relocation of a working system to a new room, a new building, or a new facility. A relocation is planned as one project — deinstall, transport, reinstall, recommission — so responsibility for the system never changes hands mid-move.',
        ],
      },
    ],
    related: ['ct-mri-installation-guide', 'repair-vs-replace', 'oem-vs-iso-service'],
    siblings: ['preventive-maintenance', 'siemens-mri-service', 'ge-ct-service', 'parts'],
  },

  {
    slug: 'emergency-repair',
    label: 'Emergency Repair',
    h1: '24/7 Emergency CT & MRI Repair',
    title: '24/7 Emergency CT & MRI Repair | ClearMed Imaging',
    description:
      'Same-day emergency response for CT and MRI failures on Siemens and GE systems, with remote diagnostics, expedited parts sourcing, and 24/7 support.',
    summary:
      'Same-day emergency response for critical failures, so an unplanned outage costs you hours instead of days.',
    serviceType: 'Emergency CT and MRI repair',
    color: AMBER,
    image: '/images/GECT_Ankur.jpg',
    imageAlt:
      'ClearMed co-founder Ankur Patel servicing a GE CT scanner with the gantry covers removed',
    sections: [
      {
        heading: 'How an Emergency Call Runs',
        paragraphs: [
          'Emergency support is available 24/7. We start with remote diagnostics and guided troubleshooting, because a meaningful share of faults can be identified — and sometimes resolved — before anyone gets in a vehicle. When an on-site visit is needed, knowing the fault in advance means the engineer arrives with the right part.',
        ],
        bullets: [
          'Remote diagnostics and guided troubleshooting first',
          'Same-day on-site response for critical failures',
          'Expedited OEM and aftermarket parts sourcing',
          'Recommissioning and image quality verification before return to service',
        ],
      },
      {
        heading: 'Failures We See Most Often',
        bullets: [
          'CT X-ray tube failure',
          'MRI cryogen events and cold head failures',
          'Gradient amplifier faults',
          'Detector module and board failures',
          'High-voltage cable failures',
          'Cooling system and chiller faults',
        ],
      },
      {
        heading: 'Why Downtime Costs More Than the Repair',
        paragraphs: [
          'The repair invoice is rarely the largest number in an unplanned outage. Lost scan revenue, patient rescheduling, referring physician confidence, and staff overtime usually exceed it — which is why response time matters more than the hourly rate.',
          'Facilities on a preventive maintenance program see fewer of these events, and the ones they do see tend to resolve faster because the system history is already documented.',
        ],
      },
    ],
    related: ['cost-of-deferred-maintenance', 'repair-vs-replace', 'oem-vs-aftermarket-parts'],
    siblings: ['preventive-maintenance', 'parts', 'siemens-ct-service', 'ge-mri-service'],
  },

  {
    slug: 'parts',
    label: 'Parts & Components',
    h1: 'CT & MRI Parts and Components',
    title: 'CT & MRI Parts: Tubes, Coils & Boards | ClearMed',
    description:
      'OEM and tested aftermarket CT and MRI parts: X-ray tubes, RF coils, gradient amplifiers, detector modules, boards, and high-voltage cables.',
    summary:
      'Direct access to certified OEM and tested aftermarket components, sourced and checked for compatibility before they reach your system.',
    serviceType: 'CT and MRI replacement parts supply',
    color: MINT,
    sections: [
      {
        heading: 'What We Supply',
        bullets: [
          'CT X-ray tubes',
          'RF coils',
          'Gradient amplifiers',
          'Detector modules',
          'Control and interface boards',
          'High-voltage cables',
          'Cooling and chiller components',
        ],
      },
      {
        heading: 'OEM and Aftermarket',
        paragraphs: [
          'Being independent means we are not required to quote you the OEM part when a tested aftermarket equivalent will do the same job for less. It also means we will tell you when it will not. The right answer depends on the component, the age of the system, and how long you plan to keep it — it is worth a conversation rather than a policy.',
          'Every part we supply is checked for compatibility with your exact system configuration before it ships.',
        ],
      },
      {
        heading: 'Planned and Emergency Sourcing',
        paragraphs: [
          'We source parts both ways: on a planned basis, when preventive maintenance flags a component trending toward failure, and on an expedited basis when a system is already down. Parts can be supplied with installation by our engineers, or on their own to a facility with in-house biomedical staff.',
        ],
      },
    ],
    related: ['oem-vs-aftermarket-parts', 'cost-of-deferred-maintenance', 'repair-vs-replace'],
    siblings: ['emergency-repair', 'ge-ct-service', 'siemens-ct-service', 'preventive-maintenance'],
  },
]

/** The /services hub page itself. */
export const SERVICES_HUB = {
  path: '/services',
  h1: 'CT & MRI Service, Installation, and Parts',
  title: 'CT & MRI Services | ClearMed Imaging Solutions',
  description:
    'Independent, OEM-certified service for Siemens and GE CT and MRI systems: preventive maintenance, emergency repair, installation, relocation, and parts.',
  summary:
    'Independent, OEM-certified service for Siemens and GE CT and MRI systems — nationwide, with a focus on the Southeast.',
}

/**
 * Text-safe variants of the accent colours. Sky, amber and mint fall below the
 * WCAG AA 4.5:1 contrast ratio as text on white, and the Siemens teal fails on
 * the navy hero — so accents stay decorative (borders, bullets, icons) and any
 * text that carries meaning uses one of these instead.
 */
const ON_LIGHT: Record<string, string> = {
  [SKY]: '#00697f',
  [AMBER]: '#8a5f00',
  [MINT]: '#2a6f5e',
}
const ON_DARK: Record<string, string> = {
  [SIEMENS]: '#5de0e0',
  [GE]: '#7ba7e0',
  [SKY]: '#5ad0e8',
}

/** Readable version of `accent` for text on a white background. */
export const textOnLight = (accent: string) => ON_LIGHT[accent] ?? accent
/** Readable version of `accent` for text on the navy hero. */
export const textOnDark = (accent: string) => ON_DARK[accent] ?? accent

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find(s => s.slug === slug)
}

export const servicePath = (slug: string) => `/services/${slug}`
