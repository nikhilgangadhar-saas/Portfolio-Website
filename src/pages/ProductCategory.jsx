import { Navigate, Link, useParams } from 'react-router-dom'
import { getProductCategory } from '../data/products'
import NotFound from './NotFound'

export default function ProductCategory() {
  const { categoryId } = useParams()
  const category = getProductCategory(categoryId)
  if (!category) return <NotFound />
  if (category.href.startsWith('/products#')) return <Navigate to={category.href} replace />

  return (
    <section className="min-h-[60vh] bg-slate-100 px-5 py-12 text-slate-950 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/products" className="font-semibold text-blue-900 hover:underline">All products &amp; solutions</Link>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{category.title}</h1>
        <p className="mt-3 max-w-2xl text-slate-700">{category.description}</p>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {category.products.map((product) => (
            <li key={product.slug}>
              <Link to={`/products/${category.id}/${product.slug}`} className="block h-full rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-400">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="mt-2 text-slate-700">{product.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
