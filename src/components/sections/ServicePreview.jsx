import { services } from '../../data/homepageOfferings'
import FeatureCarousel from '../ui/FeatureCarousel'

export default function ServicePreview() {
  return <FeatureCarousel id="home-services" heading="How we help" items={services} actionLabel="Discuss a project" />
}
