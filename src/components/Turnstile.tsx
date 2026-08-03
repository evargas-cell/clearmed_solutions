import { useEffect, useRef } from 'react'

const SCRIPT_ID = 'cf-turnstile-script'
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
  }
}

let scriptPromise: Promise<void> | null = null

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('turnstile script failed')))
      return
    }
    const s = document.createElement('script')
    s.id = SCRIPT_ID
    s.src = SCRIPT_SRC
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('turnstile script failed'))
    document.head.appendChild(s)
  })

  return scriptPromise
}

interface TurnstileProps {
  siteKey: string
  /** Fires with the verification token, or '' when it expires / errors out. */
  onVerify: (token: string) => void
  /** Bump this number to force a fresh challenge (e.g. after a failed submit). */
  resetKey?: number
}

/**
 * Cloudflare Turnstile widget. Renders in "managed" mode — invisible for the
 * vast majority of real visitors, an interactive checkbox only when Cloudflare
 * scores the session as suspicious.
 */
export default function Turnstile({ siteKey, onVerify, resetKey = 0 }: TurnstileProps) {
  const holder = useRef<HTMLDivElement | null>(null)
  const widgetId = useRef<string | null>(null)
  // Keep the latest callback without re-rendering the widget on every parent render.
  const verify = useRef(onVerify)
  verify.current = onVerify

  useEffect(() => {
    let cancelled = false

    loadScript()
      .then(() => {
        if (cancelled || !holder.current || !window.turnstile) return
        // StrictMode mounts twice in dev — guard against a duplicate widget.
        if (widgetId.current !== null) return

        widgetId.current = window.turnstile.render(holder.current, {
          sitekey: siteKey,
          theme: 'light',
          action: 'service-request',
          callback: (token: string) => verify.current(token),
          'expired-callback': () => verify.current(''),
          'timeout-callback': () => verify.current(''),
          'error-callback': () => verify.current(''),
        })
      })
      .catch(() => {
        // Script blocked (ad blocker / offline). Leave the token empty; the
        // server decides whether to accept the submission.
        verify.current('')
      })

    return () => {
      cancelled = true
      if (widgetId.current !== null && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [siteKey])

  useEffect(() => {
    if (resetKey > 0 && widgetId.current !== null && window.turnstile) {
      window.turnstile.reset(widgetId.current)
      verify.current('')
    }
  }, [resetKey])

  return <div ref={holder} style={{ minHeight: '65px' }} />
}
