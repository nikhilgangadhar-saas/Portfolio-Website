// import { Routes, Route } from 'react-router-dom'
// import Layout from './components/layout/Layout'


// import Home from './pages/Home'
// import Products from './pages/Products'
// import ProductCategory from './pages/ProductCategory'
// import ProductDetail from './pages/ProductDetail'
// import Services from './pages/Services'
// import Expertise from './pages/Expertise'
// import CaseStudies from './pages/CaseStudies'
// import Team from './pages/Team'
// import Blog from './pages/Blog'
// import Contact from './pages/Contact'
// import NotFound from './pages/NotFound'
// import CaseStudyDetail from './pages/CaseStudyDetail'
// import ComingSoon from "./pages/ComingSoon";

// export default function App() {
//   return (
//     <Routes>
//       <Route element={<Layout />}>
//         <Route path="/" element={<Home />} />

//         <Route path="/products" element={<Products />} />
//         <Route path="/products/:categoryId" element={<ProductCategory />} />
//         <Route path="/products/:categoryId/:productSlug" element={<ProductDetail />} />

//         <Route path="/services" element={<Services />} />
//         <Route path="/expertise" element={<Expertise />} />
//         <Route path="/case-studies" element={<CaseStudies />} />
//         <Route path="/case-studies/:caseStudySlug" element={<CaseStudyDetail />} />
//         <Route path="/team" element={<Team />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="*" element={<NotFound />} />
//       </Route>
//     </Routes>
//   )
// }

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

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Disabled for now */}
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

        {/* Active pages */}
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:caseStudySlug" element={<CaseStudyDetail />} />

        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}