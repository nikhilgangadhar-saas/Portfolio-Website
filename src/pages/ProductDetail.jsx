import { Link, useParams } from 'react-router-dom'
import { getProduct, getProductCategory } from '../data/products'
import Button from '../components/ui/Button'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { categoryId, productSlug } = useParams()
  const category = getProductCategory(categoryId)
  const product = getProduct(categoryId, productSlug)
  if (!product) return <NotFound />

  return (
    <section className="min-h-[60vh] bg-slate-100 px-5 py-12 text-slate-950 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to={`/products/${categoryId}`} className="font-semibold text-blue-900 hover:underline">{category.title}</Link>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{product.name}</h1>
        <p className="mt-4 text-lg leading-7 text-slate-700">{product.description}</p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold">Sample download</h2>
          <p className="mt-2 text-slate-700">An example file with illustrative content.</p>
          <a href={product.file} download className="mt-4 inline-flex rounded-xl bg-blue-950 px-4 py-3 font-semibold text-white hover:bg-blue-900">
            Download sample ({product.format})
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-6 text-white">
          <h2 className="text-xl font-bold">Need something else or a custom version?</h2>
          <Button to="/contact" variant="light">Contact us</Button>
        </div>
      </div>
    </section>
  )
}
