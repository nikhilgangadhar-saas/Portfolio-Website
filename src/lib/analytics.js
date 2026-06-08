export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-DXCXME71XQ'

let isGAInitialized = false

export function initGA() {
  if (!GA_MEASUREMENT_ID) return
  if (isGAInitialized) return

  if (!window.gtag) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []

    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }

    window.gtag('js', new Date())
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  })

  isGAInitialized = true
}

export function trackPageView(path, title = document.title) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return

  window.gtag('event', 'page_view', {
    page_title: title,
    page_location: window.location.href,
    page_path: path,
  })
}

export function trackEvent(eventName, params = {}) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return

  window.gtag('event', eventName, {
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...params,
  })
}