import { services } from '../../data/homepageOfferings'
import FeatureCarousel from '../ui/FeatureCarousel'
import ServiceLogos from '../ui/ServiceLogos'

export default function ServicePreview() {
  return (
    <FeatureCarousel
      id="home-services"
      heading="How we help"
      items={services}
      renderCardLogos={({ logos }) => <ServiceLogos logos={logos} className="mt-3 justify-center" />}
      actionLabel="View service"
      allLink="/services"
      allLinkLabel="View all services"
    />
  )
}
