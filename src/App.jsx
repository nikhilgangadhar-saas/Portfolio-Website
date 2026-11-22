import { useLayoutEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigationType } from 'react-router-dom'
import Layout from './components/layout/Layout'

import Home from './pages/Home'
import CaseStudies from './pages/CaseStudies'
import CaseStudyDetail from './pages/CaseStudyDetail'
import Team from './pages/Team'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import ProductCategory from './pages/ProductCategory'
import ProductDetail from './pages/ProductDetail'

import GA4RouteTracker from './components/analytics/GA4RouteTracker'

export default function App() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (hash && pathname === '/products') {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'instant' })
      return
    }
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
            element={<Products />}
          />
          <Route
            path="/products/:categoryId"
            element={<ProductCategory />}
          />
          <Route
            path="/products/:categoryId/:productSlug"
            element={<ProductDetail />}
          />

          <Route
            path="/services"
            element={<Navigate to="/#home-services-title" replace />}
          />

          <Route
            path="/expertise"
            element={<Navigate to="/#home-services-title" replace />}
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
