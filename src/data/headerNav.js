import { offerings, services } from './homepageOfferings'

export const homepageMenus = { products: offerings, services }

export const headerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products & Solutions', menu: 'products' },
  { label: 'Services', menu: 'services' },
  { label: 'Team', path: '/team' },
  { label: 'Contact', path: '/contact' },
]
