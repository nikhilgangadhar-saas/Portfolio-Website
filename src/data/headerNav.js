import { services } from './homepageOfferings'
import { productCategories } from './products'

export const homepageMenus = { products: productCategories.map((category) => ({ ...category, href: `/products/${category.id}` })), services }

export const headerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products & Solutions', menu: 'products' },
  { label: 'Services', menu: 'services' },
  { label: 'Team', path: '/team' },
  { label: 'Contact', path: '/contact' },
]
