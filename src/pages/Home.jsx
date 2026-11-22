import Hero from '../components/sections/Hero'
import ProductCategories from '../components/sections/ProductCategories'
import ServicePreview from '../components/sections/ServicePreview'
import CaseStudyPreview from '../components/sections/CaseStudyPreview'
import CallToAction from '../components/sections/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicePreview />
      <CaseStudyPreview />
      <ProductCategories />
      <CallToAction />
    </>
  )
}