import { offerings } from './homepageOfferings'
import { productSamples } from './productSamples'

const categoryIds = {
  'documents-templates': 'sop-control',
  'excel-tools': 'excel-tools',
  'data-reporting-services': 'data-products',
  'business-applications': 'small-apps',
}

export const productCategories = offerings.map((offering) => ({
  ...offering,
  homepageId: offering.id,
  id: categoryIds[offering.id],
  products: productSamples[categoryIds[offering.id]],
}))

export function getProductCategory(categoryId) {
  return productCategories.find(({ id }) => id === categoryId)
}

export function getProduct(categoryId, productSlug) {
  return getProductCategory(categoryId)?.products.find(({ slug }) => slug === productSlug)
}
