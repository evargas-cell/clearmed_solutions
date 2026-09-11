// Crawler files generated from the route list in src/seo/pages.ts, so every
// prerendered page is always listed. Used by scripts/prerender.mjs.

const xmlEscape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function sitemapHints(path) {
  if (path === '/') return { changefreq: 'monthly', priority: '1.0' }
  if (path === '/blog') return { changefreq: 'weekly', priority: '0.8' }
  return { changefreq: 'monthly', priority: '0.7' }
}

export function buildSitemap(pages, siteUrl) {
  const urls = pages.map(p => {
    const { changefreq, priority } = sitemapHints(p.path)
    return [
      '  <url>',
      `    <loc>${xmlEscape(siteUrl + p.path)}</loc>`,
      p.lastmod ? `    <lastmod>${p.lastmod}</lastmod>` : null,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].filter(Boolean).join('\n')
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

// llms.txt (llmstxt.org): a plain-markdown summary for AI assistants. Contact
// details come from src/data/company.ts; the service facts below must match
// what the site itself says — update both together.
export function buildLlmsTxt(pages, siteUrl, company) {
  const a = company.address
  return `# ${company.name}

> Independent service organization with OEM-certified engineers for Siemens and GE CT and MRI imaging systems. Preventive maintenance, emergency repair, installation and deinstallation, system relocation, and parts for hospitals and imaging centers nationwide, with a primary focus on the Southeast US.

## Services
- Siemens CT service and repair: SOMATOM Definition Flash, Force, Definition AS+, Perspective, go.Now, go.Up
- Siemens MRI service and repair: MAGNETOM Aera, Espree, Vida, Sola, Lumina, Skyra
- GE CT service and repair: Revolution EVO, Revolution HD, Discovery CT750 HD, Optima CT660, LightSpeed VCT
- GE MRI service and repair: SIGNA Architect, Artist, Explorer, Voyager; Optima MR450w
- Preventive maintenance to OEM specifications, and planned maintenance programs
- Emergency corrective repair, with same-day emergency response available
- Installation and commissioning (ACR/AAPM acceptance), deinstallation, relocation, rigging, RF shielding inspection and site preparation
- Remote diagnostics, magnet and cryogen (helium) management, software upgrades
- OEM and aftermarket parts: CT and MRI tubes, RF coils, gradient amplifiers, detector modules, HV cables
- Full-service and time-and-materials contracts, with multi-system discounts

## Key facts
- 20+ years of experience; 500+ systems serviced; 24/7 emergency support; OEM-certified staff
- Founded by Eyad Albakri and Ankur Patel
- Service area: nationwide across the ${company.areaServed.country}, with a primary focus on the ${company.areaServed.primaryRegion}
- Free initial consultation and quote; replies within one business day

## Contact
- Phone: ${company.phone}
- Email: ${company.email}
- Address: ${a.street}, ${a.city}, ${a.region} ${a.postalCode}
- Request a service quote: ${siteUrl}/#contact
- Facebook: ${company.social.facebook}
- LinkedIn: ${company.social.linkedin}

## Pages
${pages.map(p => `- [${p.title}](${siteUrl}${p.path}): ${p.description}`).join('\n')}
`
}
