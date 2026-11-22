import FeatureCarousel from '../ui/FeatureCarousel'
import { getCaseStudy } from '../../data/caseStudies'

const featured = [
  {
    slug: 'operational-audit-control-roadmap',
    description: 'We audited operations across plants, warehouses, and offices and secured board approval for an ERP, procurement, and inventory control roadmap.',
  },
  {
    slug: 'sap-b1-to-azure-data-warehouse',
    description: 'We built an Azure reporting platform using SAP Business One data, giving management a consistent reporting layer and reducing reliance on manual extracts.',
  },
  {
    slug: 'incident-observation-management-app',
    description: 'We built an app that gave teams one place to log incidents and observations, assign owners, and track actions through closure.',
  },
].map(({ slug, description }) => {
  const study = getCaseStudy(slug)
  return {
    title: study.title,
    description,
    details: study.solution,
    focus: study.tag,
    href: `/case-studies/${slug}`,
  }
})

export default function CaseStudyPreview() {
  return (
    <FeatureCarousel
      id="home-case-studies"
      heading="Case studies"
      items={featured}
      actionLabel="Read the case study"
      allLink="/case-studies"
      light
    />
  )
}
