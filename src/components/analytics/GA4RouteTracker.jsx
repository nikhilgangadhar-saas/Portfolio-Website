import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { initGA, trackEvent, trackPageView } from '../../lib/analytics'

export default function GA4RouteTracker() {
  const location = useLocation()
  const lastTrackedPath = useRef('')

  useEffect(() => {
    initGA()
  }, [])

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`

    if (lastTrackedPath.current === path) return

    lastTrackedPath.current = path

    trackPageView(path)

    if (location.pathname === '/contact') {
      trackEvent('contact_open', {
        event_category: 'contact',
        event_label: 'Contact page opened',
        source: 'route_view',
      })
    }
  }, [location.pathname, location.search, location.hash])

  return null
}