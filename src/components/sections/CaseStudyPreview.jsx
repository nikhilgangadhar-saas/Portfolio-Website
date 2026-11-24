import FeatureCarousel from '../ui/FeatureCarousel'
import { serviceCaseStudies } from '../../data/caseStudies'

export default function CaseStudyPreview() {
  return (
    <FeatureCarousel
      id="home-case-studies"
      heading="Case studies"
      items={serviceCaseStudies}
      actionLabel="Read the case study"
      allLink="/case-studies"
      light
    />
  )
}
