import { useLayoutEffect } from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import Layout from './components/layout/Layout'

import Home from './pages/Home'
import CaseStudies from './pages/CaseStudies'
import CaseStudyDetail from './pages/CaseStudyDetail'
import Team from './pages/Team'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ComingSoon from './pages/ComingSoon'

import GA4RouteTracker from './components/analytics/GA4RouteTracker'

export default function App() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (hash && pathname === '/') {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        const section = target.closest('section') ?? target
        const headerHeight = document.querySelector('header')?.offsetHeight ?? 0
        window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - headerHeight, behavior: 'instant' })
      }
      return
    }
    if (!hash && navigationType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash, key, navigationType])

  return (
    <>
      <GA4RouteTracker />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<ComingSoon title="Products Coming Soon" />}
          />
          <Route
            path="/products/:categoryId"
            element={<ComingSoon title="Products Coming Soon" />}
          />
          <Route
            path="/products/:categoryId/:productSlug"
            element={<ComingSoon title="Products Coming Soon" />}
          />

          <Route
            path="/services"
            element={<ComingSoon title="Services Coming Soon" />}
          />

          <Route
            path="/expertise"
            element={<ComingSoon title="Expertise Coming Soon" />}
          />

          <Route path="/case-studies" element={<CaseStudies />} />
          <Route
            path="/case-studies/:caseStudySlug"
            element={<CaseStudyDetail />}
          />

          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
