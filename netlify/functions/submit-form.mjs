const TEAM_EMAIL = 'support@clearmedimaging.com'
const FROM_NOREPLY = 'ClearMed Imaging Solutions <noreply@clearmedimaging.com>'
const AIRTABLE_TABLE = 'Leads'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const params = new URLSearchParams(event.body)
  const f = {
    firstName:     params.get('firstName')    || '',
    lastName:      params.get('lastName')     || '',
    email:         params.get('email')        || '',
    phone:         params.get('phone')        || '',
    organization:  params.get('organization') || '',
    equipmentType: params.get('equipmentType')|| '',
    serviceNeeded: params.get('serviceNeeded')|| '',
    message:       params.get('message')      || '',
  }

  const errs = []

  await saveToAirtable(f).catch(e => { console.error('Airtable:', e); errs.push('airtable') })
  await sendEmail(TEAM_EMAIL, teamSubject(f), teamHtml(f)).catch(e => { console.error('Team email:', e); errs.push('team-email') })
  await sendEmail(f.email, clientSubject(), clientHtml(f)).catch(e => { console.error('Client email:', e); errs.push('client-email') })

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true, errors: errs }),
  }
}

// ── Airtable ──────────────────────────────────────────────────────────────────

async function saveToAirtable(f) {
  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        'First Name':     f.firstName,
        'Last Name':      f.lastName,
        'Email':          f.email,
        'Phone':          f.phone,
        'Organization':   f.organization,
        'Equipment Type': f.equipmentType,
        'Service Needed': f.serviceNeeded,
        'Message':        f.message,
        'Submitted At':   new Date().toISOString(),
        'Status':         'New',
      },
    }),
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
}

// ── Resend ────────────────────────────────────────────────────────────────────

async function sendEmail(to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_NOREPLY, to, subject, html }),
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
}

// ── Email subjects ────────────────────────────────────────────────────────────

const teamSubject = (f) =>
  `New Service Request — ${f.firstName} ${f.lastName}${f.organization ? ` at ${f.organization}` : ''}`

const clientSubject = () =>
  'We received your request — ClearMed Imaging Solutions'

// ── Team notification email ───────────────────────────────────────────────────

function teamHtml(f) {
  const row = (label, value) => value ? `
    <tr>
      <td style="padding:8px 0;color:#64748b;font-size:13px;font-family:sans-serif;white-space:nowrap;vertical-align:top;padding-right:24px;">${label}</td>
      <td style="padding:8px 0;color:#0f172a;font-size:13px;font-family:sans-serif;font-weight:600;">${value}</td>
    </tr>` : ''

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#012854;border-radius:16px 16px 0 0;padding:32px 40px;">
          <p style="margin:0;font-family:sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);">ClearMed Imaging Solutions</p>
          <h1 style="margin:8px 0 0;font-family:sans-serif;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">New Service Request</h1>
          <p style="margin:6px 0 0;font-family:sans-serif;font-size:13px;color:rgba(255,255,255,0.6);">Submitted ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
        </td></tr>

        <!-- Alert bar -->
        <tr><td style="background:#009fc1;padding:12px 40px;">
          <p style="margin:0;font-family:sans-serif;font-size:13px;font-weight:700;color:#ffffff;">Action required — respond within 1 business day</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:40px;">

          <!-- Contact info -->
          <p style="margin:0 0 16px;font-family:sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#009fc1;">Contact Information</p>
          <table cellpadding="0" cellspacing="0" width="100%">
            ${row('Name', `${f.firstName} ${f.lastName}`)}
            ${row('Email', `<a href="mailto:${f.email}" style="color:#009fc1;">${f.email}</a>`)}
            ${row('Phone', `<a href="tel:${f.phone}" style="color:#009fc1;">${f.phone}</a>`)}
            ${row('Organization', f.organization)}
          </table>

          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">

          <!-- Request details -->
          <p style="margin:0 0 16px;font-family:sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#009fc1;">Service Request Details</p>
          <table cellpadding="0" cellspacing="0" width="100%">
            ${row('Equipment Type', f.equipmentType)}
            ${row('Service Needed', f.serviceNeeded)}
          </table>

          ${f.message ? `
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
          <p style="margin:0 0 10px;font-family:sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#009fc1;">Message</p>
          <p style="margin:0;font-family:sans-serif;font-size:14px;color:#334155;line-height:1.7;background:#f8fafc;border-left:3px solid #009fc1;padding:16px;border-radius:0 8px 8px 0;">${f.message}</p>
          ` : ''}

          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding-right:8px;">
                <a href="mailto:${f.email}?subject=Re: Your ClearMed Service Request" style="display:block;background:#012854;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:10px;font-family:sans-serif;font-size:13px;font-weight:700;text-align:center;">Reply to ${f.firstName}</a>
              </td>
              <td style="padding-left:8px;">
                <a href="tel:${f.phone}" style="display:block;background:#f8fafc;border:1px solid #e2e8f0;color:#012854;text-decoration:none;padding:14px 24px;border-radius:10px;font-family:sans-serif;font-size:13px;font-weight:700;text-align:center;">Call ${f.phone}</a>
              </td>
            </tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8fafc;border-radius:0 0 16px 16px;padding:20px 40px;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-family:sans-serif;font-size:12px;color:#94a3b8;text-align:center;">This notification was sent automatically by ClearMed Imaging Solutions · Ball Ground, GA 30107</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ── Client confirmation email ─────────────────────────────────────────────────

function clientHtml(f) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#012854;border-radius:16px 16px 0 0;padding:40px 40px 32px;">
          <p style="margin:0 0 4px;font-family:sans-serif;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#009fc1;">ClearMed Imaging Solutions</p>
          <h1 style="margin:0;font-family:sans-serif;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;">We've received<br>your request, ${f.firstName}.</h1>
        </td></tr>

        <!-- Teal accent -->
        <tr><td style="background:linear-gradient(90deg,#009fc1,#007fa0);padding:14px 40px;">
          <p style="margin:0;font-family:sans-serif;font-size:13px;font-weight:600;color:#ffffff;">A ClearMed specialist will be in touch within <strong>1 business day</strong>.</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:40px;">

          <p style="margin:0 0 24px;font-family:sans-serif;font-size:15px;color:#334155;line-height:1.7;">
            Thank you for reaching out to ClearMed Imaging Solutions. Our certified engineering team has been notified and will review your request promptly.
          </p>

          <!-- Request summary card -->
          <table cellpadding="0" cellspacing="0" width="100%" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:28px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 14px;font-family:sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#009fc1;">Your Request Summary</p>
              ${f.organization ? `<p style="margin:0 0 6px;font-family:sans-serif;font-size:13px;color:#64748b;">Organization: <strong style="color:#0f172a;">${f.organization}</strong></p>` : ''}
              ${f.equipmentType ? `<p style="margin:0 0 6px;font-family:sans-serif;font-size:13px;color:#64748b;">Equipment: <strong style="color:#0f172a;">${f.equipmentType}</strong></p>` : ''}
              ${f.serviceNeeded ? `<p style="margin:0;font-family:sans-serif;font-size:13px;color:#64748b;">Service: <strong style="color:#0f172a;">${f.serviceNeeded}</strong></p>` : ''}
            </td></tr>
          </table>

          <!-- What's next -->
          <p style="margin:0 0 16px;font-family:sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#009fc1;">What happens next</p>

          <table cellpadding="0" cellspacing="0" width="100%">
            ${['Our team reviews your equipment and service details.', 'A certified specialist prepares a customized service proposal.', 'We contact you within 1 business day to discuss next steps.'].map((step, i) => `
            <tr>
              <td style="vertical-align:top;padding-right:16px;padding-bottom:16px;width:32px;">
                <div style="width:28px;height:28px;border-radius:50%;background:#012854;text-align:center;line-height:28px;font-family:sans-serif;font-size:13px;font-weight:800;color:#ffffff;">${i + 1}</div>
              </td>
              <td style="vertical-align:middle;padding-bottom:16px;">
                <p style="margin:0;font-family:sans-serif;font-size:14px;color:#334155;line-height:1.6;">${step}</p>
              </td>
            </tr>`).join('')}
          </table>

          <hr style="border:none;border-top:1px solid #e2e8f0;margin:8px 0 28px;">

          <!-- Contact info -->
          <p style="margin:0 0 12px;font-family:sans-serif;font-size:13px;color:#64748b;line-height:1.6;">Need to reach us sooner? Contact us directly:</p>
          <p style="margin:0;font-family:sans-serif;font-size:14px;color:#334155;">
            <a href="mailto:support@clearmedimaging.com" style="color:#009fc1;font-weight:600;text-decoration:none;">support@clearmedimaging.com</a>
          </p>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#012854;border-radius:0 0 16px 16px;padding:28px 40px;">
          <p style="margin:0 0 4px;font-family:sans-serif;font-size:13px;font-weight:700;color:#ffffff;">ClearMed Imaging Solutions</p>
          <p style="margin:0 0 12px;font-family:sans-serif;font-size:12px;color:rgba(255,255,255,0.5);">1005 Evenflow Dr. · Ball Ground, GA 30107</p>
          <p style="margin:0;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,0.3);">You're receiving this because you submitted a service request at clearmedimaging.com</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
