import { Link, useParams } from 'react-router-dom'
import { getProduct, getProductCategory } from '../data/products'
import Button from '../components/ui/Button'

export default function ProductDetail() {
  const { categoryId, productSlug } = useParams()
  const category = getProductCategory(categoryId)
  const product = getProduct(categoryId, productSlug)

  if (!category || !product) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-20">
        <h1 className="text-4xl font-extrabold text-slate-950">Product not found</h1>
        <Link to="/products" className="mt-6 inline-block text-blue-600">
          Back to products
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-premium-grid opacity-70" />
        <div className="motion-blob-one absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="motion-blob-two absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 md:py-24 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Link
              to={`/products/${category.id}`}
              className="mb-5 inline-block text-sm font-semibold text-blue-300 hover:text-blue-200"
            >
              ← Back to {category.shortTitle}
            </Link>

            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-300/25 bg-blue-400/10 px-4 py-2 text-sm font-bold text-blue-200">
                {product.type}
              </span>
              <span className="rounded-full border border-amber-300/25 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-200">
                {product.status}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              {product.name}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {product.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact">Request Access</Button>
              <Button to="/services" variant="glass">
                Need Custom Version?
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur">
            <ProductVisual product={product} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f4f7fb]">
        <div className="absolute inset-0 bg-soft-grid opacity-70" />
        <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="absolute right-0 bottom-40 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            <InfoCard title="Problem It Solves" text={product.problem} />
            <InfoCard title="Expected Outcome" text={product.outcome} />
            <InfoCard title="Best For" text={product.bestFor} />
          </div>

          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-900/5">
            <div className="max-w-3xl">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                What you get
              </div>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-5xl">
                Included in this product
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {product.included.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-[#f4f7fb] p-4"
                >
                  <div className="mt-1 h-3 w-3 rounded-full bg-emerald-400" />
                  <div className="font-semibold text-slate-800">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-900/20 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold">
                  Want early access or a custom version?
                </h2>
                <p className="mt-4 max-w-2xl text-slate-300">
                  Send an inquiry about product access or a version tailored to your team.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button to="/contact">Request Access</Button>
                <Button to="/services" variant="glass">
                  Custom Build
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
      <div className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
        {title}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  )
}

function ProductVisual({ product }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-5 text-slate-950">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-sm font-extrabold">{product.name}</div>
          <div className="text-xs text-slate-500">{product.type}</div>
        </div>
        <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
          Preview
        </div>
      </div>

      <div className="grid gap-3">
        {product.included.slice(0, 5).map((item, index) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-[#f4f7fb] p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-slate-800">{item}</div>
              <div className="text-xs font-bold text-slate-400">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-300"
                style={{ width: `${70 + index * 5}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}