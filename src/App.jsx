import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

import Home from './pages/Home'
import CaseStudies from './pages/CaseStudies'
import CaseStudyDetail from './pages/CaseStudyDetail'
import Team from './pages/Team'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ComingSoon from './pages/ComingSoon'
import Demos from './pages/Demos'

import GA4RouteTracker from './components/analytics/GA4RouteTracker'

export default function App() {
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/demos" element={<Demos />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}