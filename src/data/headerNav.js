import { services } from './homepageOfferings'
import { productCategories } from './products'

export const homepageMenus = {
  products: {
    overview: { title: 'View all products & solutions', href: '/products' },
    items: productCategories,
  },
  services: {
    overview: { title: 'View all services', href: '/services' },
    items: services,
  },
}

export const headerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products & Solutions', menu: 'products' },
  { label: 'Services', menu: 'services' },
  { label: 'Team', path: '/team' },
  { label: 'Contact', path: '/contact' },
]
