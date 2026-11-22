import { Navigate, useParams } from 'react-router-dom'
import { getProductCategory } from '../data/products'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { categoryId } = useParams()
  const category = getProductCategory(categoryId)
  return category ? <Navigate to={category.href} replace /> : <NotFound />
}
