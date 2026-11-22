import { Link } from 'react-router-dom'
import { productCategories } from '../data/products'

export default function Products() {
  return (
    <section className="min-h-[60vh] bg-slate-100 px-5 py-12 text-slate-950 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Products &amp; Solutions</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {productCategories.map((category) => (
            <section key={category.id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-bold">
                <Link className="hover:underline" to={`/products/${category.id}`}>{category.title}</Link>
              </h2>
              <ul className="mt-4 divide-y divide-slate-100">
                {category.products.map((product) => (
                  <li key={product.slug}>
                    <Link className="block py-3 font-semibold text-blue-900 hover:underline" to={`/products/${category.id}/${product.slug}`}>{product.name}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
