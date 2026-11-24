import { services } from '../../data/homepageOfferings'
import FeatureCarousel from '../ui/FeatureCarousel'
import ServiceLogos from '../ui/ServiceLogos'

export default function ServicePreview() {
  return (
    <FeatureCarousel
      id="home-services"
      heading="How we help"
      items={services}
      renderLogos={({ logos }) => <ServiceLogos logos={logos} className="justify-center" />}
      actionLabel="View service"
      allLink="/services"
      allLinkLabel="View all services"
    />
  )
}
